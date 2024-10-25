import Collumns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { HiRefresh } from 'react-icons/hi';
import Modal from '~/components/Modal';
import cpfValidator from '~/components/CPFValidator';

const DashboardPage = () => {
  const BASE_URL_API: string = 'http://localhost:3000';

  const [data, setData] = useState([]);

  const refLoading = useRef(null);

  const handleCPFSearch = (e: any) => {
    const cpf = e.target.value;
    const isCPF = cpfValidator(cpf);

    if (e.target.value.length === 11) {
      if (isCPF) {
        refLoading.current.setAttribute('style', 'display: flex');

        axios
          .get(`${BASE_URL_API}/registrations?cpf=${e.target.value}`)
          .then((e: any) => {
            setData([]);

            if (e.data.length === 0) {
              Modal(
                'Erro',
                `Não foram encontrados registros para o CPF ${cpf}`
              ).error();
            } else {
              Modal(
                'Sucesso',
                `Fo${e.data.length > 1 ? 'ram' : 'i'} encontrado${
                  e.data.length > 1 ? 's' : ''
                } ${e.data.length} funcionário${
                  e.data.length > 1 ? 's' : ''
                } para o CPF ${cpf}`
              ).success();
            }

            refLoading.current.setAttribute('style', 'display: none');

            return setData(e.data);
          });
      } else {
        Modal('Erro', 'CPF inválido').error();
      }
    }
  };

  const handleLoadingData = () => {
    axios
      .get(`${BASE_URL_API}/registrations`)
      .then((e: any) => {
        refLoading.current.setAttribute('style', 'display: none');

        data.length === 0 && Modal('Sucesso', 'Cards carregados').success();

        return setData(e.data);
      })
      .catch((err: any) => {
        Modal(
          'Erro',
          'Ocorreu um erro. Consulte os logs para mais detalhes'
        ).error();

        console.log(err);
      });
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

        Modal(
          'Sucesso',
          `O card do funcionário ${e.data.employeeName} foi reprovado com sucesso.`
        ).success();

        handleLoadingData();

        console.log(e.data);
      })
      .catch((err: any) => {
        Modal(
          'Erro',
          'Ocorreu um erro. Consulte os logs para mais detalhes'
        ).error();

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

        Modal(
          'Sucesso',
          `O card do funcionário ${e.data.employeeName} foi aprovado com sucesso.`
        ).success();

        handleLoadingData();

        console.log(e.data);
      })
      .catch((err: any) => {
        Modal(
          'Erro',
          'Ocorreu um erro. Consulte os logs para mais detalhes'
        ).error();

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

        Modal(
          'Sucesso',
          `O card do funcionário ${e.data.employeeName} está pronto para revisão.`
        ).success();

        handleLoadingData();

        console.log(e.data);
      })
      .catch((err: any) => {
        Modal(
          'Erro',
          'Ocorreu um erro. Consulte os logs para mais detalhes'
        ).error();

        console.log(err);
      });
  };

  const handleDelete = (value: any) => {
    refLoading.current.setAttribute('style', 'display: flex');

    axios
      .delete(`${BASE_URL_API}/registrations/${value.id}`)
      .then((e: any) => {
        refLoading.current.setAttribute('style', 'display: none');

        Modal(
          'Sucesso',
          `O card do funcionário ${e.data.employeeName} foi removido com sucesso.`
        ).success();

        handleLoadingData();

        console.log(e.data);
      })
      .catch((err: any) => {
        Modal(
          'Erro',
          'Ocorreu um erro. Consulte os logs para mais detalhes'
        ).error();

        console.log(err);
      });
  };

  useEffect(() => {
    if (data.length === 0) {
      refLoading.current.setAttribute('style', 'display: flex');

      handleLoadingData();
    }
  }, []);

  return (
    <S.Container>
      <S.LoadingIcon ref={refLoading} id="loading-icon">
        <HiRefresh />
      </S.LoadingIcon>
      <SearchBar
        registrations={data}
        handleCPFSearch={handleCPFSearch}
        handleLoadingData={handleLoadingData}
      />
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
