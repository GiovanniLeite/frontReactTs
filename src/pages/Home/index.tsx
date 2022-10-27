import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AiFillFileAdd } from 'react-icons/ai';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { RiUser3Line } from 'react-icons/ri';
import { get } from 'lodash';
import { DialogActions } from '@mui/material';
import { toast } from 'react-toastify';

import axios, { AxiosResponseProps } from '../../services/axios';

import Loading from '../../components/Loading';
import MainContainer from '../../components/MainContainer';
import { Container, DialogZ } from './styled';

export type File = {
  id: number;
  file_name: string;
  url: string;
};

export type Contact = {
  id: number;
  contact_id: string;
  name: string;
  cell_number: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  Files: File[];
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [currentRegister, setCurrentRegister] = useState({
    index: 0,
    id: 0,
    name: 'No Name',
    cell_number: '(00)00000-0000',
  });

  // Pagination
  const defaultContact: Contact = {
    id: 0,
    contact_id: '',
    name: '',
    cell_number: '',
    phone_number: '',
    created_at: '',
    updated_at: '',
    Files: [
      {
        id: 0,
        file_name: '',
        url: '',
      },
    ],
  };
  const [items, setItems] = useState([defaultContact]); // current list of items
  const [fullListItems, setFullListItems] = useState([defaultContact]); // full list of items
  const [numberOfPages, setNumberOfPages] = useState(1); // number of pages
  const maxItemsAllowed = 4; // maximum items allowed
  const [currentPage, setCurrentPage] = useState(1); // current page

  const pagination = (data: Contact[]) => {
    if (data.length > maxItemsAllowed) {
      const a = data.length / maxItemsAllowed;
      setNumberOfPages(Math.ceil(a));
      setFullListItems(data);
      setItems(data.slice(0, maxItemsAllowed));
    } else {
      setNumberOfPages(1);
      setFullListItems(data);
      setItems(data);
    }
    setCurrentPage(1); // att buttons
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      // index
      if (!search) {
        const response: AxiosResponseProps = await axios.get(`/contacts/`);
        pagination(response.data);
        setIsLoading(false);
        return;
      }
      // id or name
      if (!search.match(/[a-zA-Z]+/gi)) {
        // search by id
        const response = await axios.get(`/contacts/${search}`); // return object
        const data = response.data ? [response.data] : [];
        setItems(data);
        setNumberOfPages(1);
        setFullListItems(data);
      } else {
        // search by name
        const { data } = await axios.get(`/contacts/name/${String(search)}`); // return array
        pagination(data);
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

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData();
  };

  const handlePreviousNext = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isNext: boolean,
  ) => {
    e.preventDefault();

    if (isNext) {
      const nextPage = currentPage + 1;
      const end = nextPage * maxItemsAllowed;
      const start = end - maxItemsAllowed;
      setItems(fullListItems.slice(start, end));
      setCurrentPage(currentPage + 1);
    } else {
      const previousPage = currentPage - 1;
      const end = previousPage * maxItemsAllowed;
      const start = end - maxItemsAllowed;
      setItems(fullListItems.slice(start, end));
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = async (index: number, id: number) => {
    setOpen(false);
    setIsLoading(true);

    try {
      const { data } = await axios.delete(`/contacts/${id}`);

      if (get(data, 'deleted', false)) {
        const newData = [...fullListItems];
        const a = currentPage - 1; // previous page
        const b = a * maxItemsAllowed; // last position of previous page
        const realIndex = b + index;
        newData.splice(realIndex, 1);
        pagination(newData);

        toast.success(`${currentRegister.name} foi apagado!`);
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
        <title>Home | Agenda</title>
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
          <div className="searchBar">
            <div className="inputContent">
              <div>
                <form onSubmit={(e) => handleSearch(e)}>
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar ..."
                    title="Buscar por nome"
                  />
                </form>
              </div>
            </div>
          </div>
          <Link
            className="button newPage"
            to="/new-contact/true"
            title="Novo Registro"
          >
            <AiFillFileAdd /> Novo
          </Link>
          <div className="result">
            <ul>
              <li>
                <span className="center">Foto</span>
                <span>Nome</span>
                <span className="center">Editar</span>
                <span className="center">Excluir</span>
              </li>
              {get(items[0], 'id', false) &&
                items.map((e, index) => (
                  <li key={e.id}>
                    <span className="center">
                      {get(e, 'Files[0].url', false) ? (
                        <img src={e.Files[0].url} alt={e.name} />
                      ) : (
                        <RiUser3Line size={34} />
                      )}
                    </span>
                    <span title={e.name}>
                      <Link to={`/edit-contact/${e.id}`} title={e.cell_number}>
                        {e.name.slice(0, 80)}
                      </Link>
                    </span>
                    <span className="center">
                      <Link
                        to={`/edit-contact/${e.id}`}
                        title="Editar Registro"
                      >
                        <FiEdit className="icon" />
                      </Link>
                    </span>
                    <span className="center">
                      <a
                        onClick={(elem) => {
                          elem.preventDefault();
                          setCurrentRegister({
                            index,
                            id: e.id,
                            name: e.name,
                            cell_number: e.cell_number,
                          });
                          setOpen(true);
                        }}
                        href="/"
                        title="Excluir Registro"
                      >
                        <FaTrash className="icon" />
                      </a>
                    </span>
                  </li>
                ))}
            </ul>
            {numberOfPages > 1 && (
              <div className="pagination">
                <div>
                  {(currentPage > 1 && (
                    <button
                      type="button"
                      className="button"
                      onClick={(e) => handlePreviousNext(e, false)}
                      title="Anterior"
                    >
                      <MdNavigateBefore /> Anterior
                    </button>
                  )) || (
                    <button
                      type="button"
                      className="button"
                      title="Não existe página anterior"
                      disabled
                    >
                      <MdNavigateBefore /> Anterior
                    </button>
                  )}
                  {(currentPage < numberOfPages && (
                    <button
                      type="button"
                      className="button"
                      onClick={(e) => handlePreviousNext(e, true)}
                      title="Próximo"
                    >
                      Próximo <MdNavigateNext />
                    </button>
                  )) || (
                    <button
                      type="button"
                      className="button"
                      title="Não existe próxima página"
                      disabled
                    >
                      Próximo <MdNavigateNext />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          <DialogZ
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <h2>Apagar o registro abaixo?</h2>
            <div className="divH2" />
            <h3>
              <strong>Cod.:</strong> {currentRegister.id}
              <br />
              <strong>Nome:</strong> {currentRegister.name.slice(0, 80)}
              <br />
              <strong>Número:</strong> {currentRegister.cell_number}
            </h3>
            <DialogActions>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(currentRegister.index, currentRegister.id);
                }}
                title="Confirmar"
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
                title="Cancelar"
              >
                Cancelar
              </button>
            </DialogActions>
          </DialogZ>
        </Container>
      </MainContainer>
    </>
  );
}
