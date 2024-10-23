import Collumns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { LoadingIcon } from '~/components/Header';
import { HiRefresh } from 'react-icons/hi';

const DashboardPage = () => {
  const BASE_URL_API: string = 'http://localhost:3000';

  const [data, setData] = useState([]);

  const refLoading = useRef(null);

  const handleCPFSearch = (e: any) => {
    console.log(e.target.value);
  };

  const handleReproved = (value: any) => {
    refLoading.current.setAttribute('style', 'display: flex');

    axios
      .put(`${BASE_URL_API}/registrations/${value.id}`, {
        id: value.id,
        admissionDate: value.admissionDate,
        email: value.email,
        employeeName: value.employeeName,
        status: 'REPROVED',
        cpf: value.cpf,
      })
      .then((e: any) => {
        refLoading.current.setAttribute('style', 'display: none');

        console.log(e.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleApproved = (value: any) => {
    refLoading.current.setAttribute('style', 'display: flex');

    axios
      .put(`${BASE_URL_API}/registrations/${value.id}`, {
        id: value.id,
        admissionDate: value.admissionDate,
        email: value.email,
        employeeName: value.employeeName,
        status: 'APPROVED',
        cpf: value.cpf,
      })
      .then((e: any) => {
        refLoading.current.setAttribute('style', 'display: none');

        console.log(e.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleReview = (value: any) => {
    refLoading.current.setAttribute('style', 'display: flex');

    axios
      .put(`${BASE_URL_API}/registrations/${value.id}`, {
        id: value.id,
        admissionDate: value.admissionDate,
        email: value.email,
        employeeName: value.employeeName,
        status: 'REVIEW',
        cpf: value.cpf,
      })
      .then((e: any) => {
        refLoading.current.setAttribute('style', 'display: none');

        console.log(e.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleDelete = (value: any) => {
    refLoading.current.setAttribute('style', 'display: flex');

    axios
      .delete(`${BASE_URL_API}/registrations/${value.id}`)
      .then((e: any) => {
        refLoading.current.setAttribute('style', 'display: none');

        console.log(e.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    data === [] && refLoading.current.setAttribute('style', 'display: flex');

    axios
      .get(`${BASE_URL_API}/registrations`)
      .then((e: any, i: any) => {
        refLoading.current.setAttribute('style', 'display: none');

        return setData(e.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [data]);

  return (
    <S.Container>
      <S.LoadingIcon ref={refLoading} id="loading-icon">
        <HiRefresh />
      </S.LoadingIcon>
      <SearchBar registrations={data} handleCPFSearch={handleCPFSearch} />
      <Collumns
        registrations={data}
        handleReproved={handleReproved}
        handleApproved={handleApproved}
        handleReview={handleReview}
        handleDelete={handleDelete}
      />
    </S.Container>
  );
};
export default DashboardPage;
