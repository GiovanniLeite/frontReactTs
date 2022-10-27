import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaEdit } from 'react-icons/fa';
import InputMask from 'react-input-mask';

import axios from '../../services/axios';
import apiUrl from '../../config/api';

import MainContainer from '../../components/MainContainer';
import Loading from '../../components/Loading';
import { Container, Picture } from './styled';

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const { newC } = useParams();
  const [contactData, setContactData] = useState({
    id: id || '',
    name: '',
    cell_number: '',
    phone_number: '',
  });
  const [file, setFile] = useState('');

  useEffect(() => {
    async function getData() {
      if (newC) {
        // Clear the fields when you are already on the edit contact page and go to the new contact page
        setContactData({
          id: '',
          name: '',
          cell_number: '',
          phone_number: '',
        });
        setFile('');
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await axios.get(`/contacts/${id}`);
        if (!data) {
          toast.error('Contato não encontrado');
          navigate('/');
          return;
        }

        setContactData({
          ...contactData,
          name: data.name,
          cell_number: data.cell_number,
          phone_number: data.phone_number,
        });
        const picture = get(data, 'Files[0].url', '');
        setFile(picture);
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
    }

    getData();
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formErrors = false;

    if (contactData.name.length < 3 || contactData.name.length > 50) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 50 caracteres');
      const name = document.getElementById('name') as HTMLInputElement;
      name.style.border = '1px solid #ff0000';
    }

    if (contactData.cell_number.trim() === '') {
      formErrors = true;
      toast.error('Campo Celular não deve estar vazio');
      const cell = document.getElementById('cell') as HTMLInputElement;
      cell.style.border = '1px solid #ff0000';
    }

    if (formErrors) return;

    setIsLoading(true);
    try {
      if (id) {
        await axios.put(`/contacts/${contactData.id}`, contactData);
        toast.success('Editado com sucesso!');
      } else {
        const { data } = await axios.post(`/contacts/`, contactData);
        setContactData({ ...contactData, id: data.id });
        navigate(`/edit-contact/${data.id}`);
        toast.success('Criado com sucesso!');
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
        <title>Contato | Agenda</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <MainContainer>
        <Loading isLoading={isLoading} />
        <Container>
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2>Contato</h2>
            {!newC && (
              <Picture>
                {file ? (
                  <img src={file} alt="Foto do contato" />
                ) : (
                  <img
                    src={`${apiUrl}/images/no-image.jpg`}
                    alt="Foto do contato"
                  />
                )}

                <Link
                  className="icon"
                  to={`/edit-file/${id}`}
                  title="Alterar foto"
                >
                  <FaEdit size={20} />
                </Link>
              </Picture>
            )}
            {id && (
              <input
                type="text"
                value={contactData.id}
                placeholder="0"
                title="Código do contato"
                disabled
              />
            )}
            <input
              type="text"
              id="name"
              name="name"
              value={contactData.name}
              onChange={(e) => handleChange(e)}
              placeholder="Ex. Giovanni Leite"
              title="Nome do contato"
            />
            <InputMask
              mask="(99)99999-9999"
              type="text"
              id="cell"
              name="cell_number"
              value={contactData.cell_number}
              onChange={(e) => handleChange(e)}
              placeholder="Ex. (15)98128-2325"
              title="Número do Celular"
            />
            <InputMask
              mask="(99)9999-9999"
              type="text"
              name="phone_number"
              value={contactData.phone_number}
              onChange={(e) => handleChange(e)}
              placeholder="Ex. (15)3227-5064"
              title="Número do Telefone"
            />
            <button type="submit">Salvar</button>
          </form>
        </Container>
      </MainContainer>
    </>
  );
}
