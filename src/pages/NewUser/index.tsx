import TextField from '~/components/TextField';
import * as S from './styles';
import Button from '~/components/Buttons';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { IconButton } from '~/components/Buttons/IconButton';
import { useHistory } from 'react-router-dom';
import routes from '~/router/routes';
import { useState } from 'react';
import validators from '~/components/Validators';
import axios from 'axios';
import Modal from '~/components/Modal';

const NewUserPage = () => {
  const BASE_URL_API: string = 'http://localhost:3000';

  const [employeeName, setEmployeeName] = useState('');
  const [employeeNameError, setEmployeeNameError] = useState('');
  const [employeeNameOk, setEmployeeNameOk] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailOk, setEmailOk] = useState(false);
  const [cpf, setCPF] = useState('');
  const [cpfError, setCPFError] = useState('');
  const [cpfOk, setCPFOk] = useState(false);
  const [admissionDate, setAdmissionDate] = useState('');
  const [admissionDateOk, setAdmissionDateOk] = useState(false);

  const history = useHistory();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const handleEmployeeName = (e: any) => {
    const employeeName = e.target.value;

    setEmployeeName(employeeName);

    if (validators().nameValidator(employeeName)) {
      setEmployeeNameOk(true);
      setEmployeeNameError('');
    } else {
      setEmployeeNameOk(false);
      setEmployeeNameError('Digite um nome válido');
    }
  };

  const handleEmail = (e: any) => {
    const email = e.target.value;

    setEmail(email);

    if (validators().emailValidator(email)) {
      setEmailOk(true);
      setEmailError('');
    } else {
      setEmailOk(false);
      setEmailError('Digite um e-mail válido');
    }
  };

  const handleCPF = (e: any) => {
    const cpf = e.target.value;
    const eTarget = e.target as HTMLInputElement;
    const isCPF = validators().cpfValidator(cpf);
    eTarget.value = validators().applyCpfMask(cpf);

    setCPF(cpf);

    if (isCPF) {
      setCPFOk(true);
      setCPFError('');
    } else {
      setCPFOk(false);
      setCPFError('Digite um CPF válido');
    }
  };

  const handleAdmissionDate = (e: any) => {
    const admissionDate = e.target.value;
    setAdmissionDate(admissionDate);

    if (admissionDate) {
      setAdmissionDateOk(true);
    } else {
      setAdmissionDateOk(false);
    }
  };

  const handleSignUp = async () => {
    const data = {
      employeeName: employeeName,
      email: email,
      cpf: cpf,
      admissionDate: validators().dateFormater(admissionDate),
      status: 'REVIEW',
    };

    await axios
      .post(`${BASE_URL_API}/registrations`, data)
      .then((e: any) => {
        Modal(
          'Sucesso',
          `O funcionário ${employeeName} foi cadastrado com sucesso.`
        )
          .success()
          .then((res: any) => {
            if (res.isConfirmed) {
              goToHome();
            }
          });
      })
      .catch((err: any) => {
        Modal(
          'Erro',
          `Não possível cadastrar o funcionário ${employeeName}. Verifique os logs para mais detalhes.`
        ).error();
      });
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome"
          label="Nome"
          onChange={handleEmployeeName}
          error={employeeNameError}
          confirmation={employeeNameOk.toString()}
        />
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          onChange={handleEmail}
          error={emailError}
          confirmation={emailOk.toString()}
        />
        <TextField
          placeholder="CPF"
          label="CPF"
          onChange={handleCPF}
          error={cpfError}
          confirmation={cpfOk.toString()}
          maxLength={14}
        />
        <TextField
          label="Data de admissão"
          type="date"
          onChange={handleAdmissionDate}
          // error={admissionDateError}
          // confirmation={admissionDateOk.toString()}
        />
        <Button
          onClick={handleSignUp}
          disabled={!employeeNameOk || !emailOk || !cpfOk || !admissionDateOk}
        >
          Cadastrar
        </Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
