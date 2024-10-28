import { HiRefresh } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import TextField from '~/components/TextField';
import routes from '~/router/routes';
import * as S from './styles';

type Props = {
  registrations?: any[];
  handleCPFSearch?: any;
  handleLoadingData?: any;
};

export const SearchBar = (props: Props) => {
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        onKeyUp={props.handleCPFSearch}
        maxLength={14}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={props.handleLoadingData}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
