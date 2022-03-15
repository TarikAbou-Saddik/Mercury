import styled from 'styled-components';
import { ReactNode } from 'react';
import { getInfoByTimeOfDay } from '../../utils';

type HeaderProps = {
  userName?: string;
  children?: ReactNode;
};

const Header = ({ userName, children }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <h1>
        Good {getInfoByTimeOfDay(timeOfDay => timeOfDay)}, {userName}
      </h1>
      {children}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10vh;
  left: calc(50% - 40vw / 2);
  width: 40vw;
  height: 10vh;
  background-color: rgba(255, 255, 255, 0.8);
  color: #2c2b2b;
  font-size: 1.5rem;
  border-radius: 15px;

  & h1 {
    font-weight: 300;
  }
`;

export default Header;
