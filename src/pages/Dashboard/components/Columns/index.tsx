import * as S from './styles';
import RegistrationCard from '../RegistrationCard';

const allColumns = [
  { status: 'REVIEW', title: 'Pronto para revisar' },
  { status: 'APPROVED', title: 'Aprovado' },
  { status: 'REPROVED', title: 'Reprovado' },
];

type Props = {
  registrations?: any[];
  handleReproved: any;
  handleApproved: any;
  handleReview: any;
  handleDelete: any;
};
const Collumns = (props: Props) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {props?.registrations?.map((registration) => {
                  return (
                    collum.status === registration.status && (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                        handleReproved={props.handleReproved}
                        handleApproved={props.handleApproved}
                        handleReview={props.handleReview}
                        handleDelete={props.handleDelete}
                      />
                    )
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
