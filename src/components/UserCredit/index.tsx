import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

type UserCreditProps = {
  name: string;
  profileImage: string;
  portfolioUrl: string;
};

const UserCredit = ({ name, profileImage, portfolioUrl }: UserCreditProps) => (
  <Credit>
    <FontAwesomeIcon icon={faLink} />
    <CreditLink href={portfolioUrl || ''} target='_blank' rel='noreferrer'>
      Photo by {name}
    </CreditLink>
    <CreditProfilePhoto src={profileImage || ''} alt='' />
  </Credit>
);

const Credit = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 5vh;
  left: 2vw;
  color: white;
`;

const CreditLink = styled.a`
  color: inherit;
  text-decoration: underline;
  margin: 0 10px;
  cursor: pointer;
`;

const CreditProfilePhoto = styled.img`
  border-radius: 50%;
  height: 25px;
  width: 25px;
`;

export default UserCredit;
