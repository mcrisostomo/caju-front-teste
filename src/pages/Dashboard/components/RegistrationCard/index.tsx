import { ButtonSmall } from '~/components/Buttons';
import * as S from './styles';
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from 'react-icons/hi';

type Props = {
  data: any;
  handleReproved: any;
  handleApproved: any;
  handleReview: any;
  handleDelete: any;
};

const RegistrationCard = (props: Props) => {
  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {props.data.status === 'REVIEW' && (
          <ButtonSmall
            bgcolor="rgb(255, 145, 154)"
            onClick={() => props.handleReproved(props.data)}
          >
            Reprovar
          </ButtonSmall>
        )}
        {props.data.status === 'REVIEW' && (
          <ButtonSmall
            bgcolor="rgb(155, 229, 155)"
            onClick={() => props.handleApproved(props.data)}
          >
            Aprovar
          </ButtonSmall>
        )}
        {props.data.status === 'APPROVED' ||
          (props.data.status === 'REPROVED' && (
            <ButtonSmall
              bgcolor="#ff8858"
              onClick={() => props.handleReview(props.data)}
            >
              Revisar novamente
            </ButtonSmall>
          ))}

        <HiOutlineTrash onClick={() => props.handleDelete(props.data)} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
