import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { get } from 'lodash';

import axios, { AxiosResponseProps } from '../../services/axios';

import MainContainer from '../../components/MainContainer';
import Loading from '../../components/Loading';
import { Container } from './styled';

export type FileContact = {
  id: number;
  contact_id: number;
  original_name: string;
  file_name: string;
  url: string;
  created_at: string;
  updated_at: string;
};

export default function Files() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [files, setFiles] = useState<FileContact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/contacts/${id}`);
        setFiles(get(data, 'Files', []));
      } catch {
        toast.error('Erro ao obter imagem');
        navigate('/');
      }
      setIsLoading(false);
    };

    getData();
    // eslint-disable-next-line
  }, [id]);

  const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = e.currentTarget.files?.[0];
    id && formData.append('contact_id', id);
    file && formData.append('file', file);

    setIsLoading(true);
    try {
      const response: AxiosResponseProps = await axios.post(
        '/files/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const newData = [...files];
      newData.unshift(response.data);
      setFiles(newData);

      toast.success('Foto enviada com sucesso!');
    } catch (err) {
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error: string) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
    setIsLoading(false);
  };

  const handleRemove = async (idFile: number, index: number) => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(`/files/${idFile}`);
      if (get(data, 'deleted', false)) {
        const newData = [...files];
        newData.splice(index, 1);
        setFiles(newData);

        toast.success(`Imagem removida com sucesso!`);
      }
    } catch (err) {
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error: string) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Uploads | Agenda</title>
      </Helmet>
      <MainContainer>
        <Loading isLoading={isLoading} />
        <Container>
          <div className="box">
            <form data-testid="inputFileForm">
              <h4>Adicionar Imagem</h4>
              <label htmlFor="fileOne">
                Selecionar
                <input
                  type="file"
                  id="fileOne"
                  onChange={handleAdd}
                  data-testid="inputFile"
                />
              </label>
            </form>

            <div className="removeFile">
              {files?.map((e, index) => (
                <div key={e.id} data-testid="fileDiv">
                  <img src={e.url} alt={e.file_name} />
                  <button
                    type="button"
                    onClick={() => handleRemove(e.id, index)}
                  >
                    <FaTrash /> Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </MainContainer>
    </>
  );
}
