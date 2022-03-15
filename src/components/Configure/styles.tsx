import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: calc(40% - 30vh / 2);
  left: calc(50% - 30vw / 2);
  width: 30vw;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 3vh;

  & h1 {
    font-weight: 300;
    font-size: 5rem;
  }
`;

export const FormWrapper = styled.form`
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Button = styled.button`
  width: 50%;
  height: 5vh;
  cursor: pointer;
  font-size: 1.2rem;
  border: none;
  background: #f6695c;
  color: white;
  border-radius: 5px;
  transition: all 0.3s ease-in;
  transition-property: background color;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px inset;

  &:hover {
    background: #f34040;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  color: grey;
  font-size: 1.2rem;
  transition: color 0.2s ease-in;
  opacity: 1;

  &:hover {
    color: black;
  }

  &.hidden {
    opacity: 0;
  }
`;

export const InputWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  background: white;
  padding: 2px 10px;
  border-radius: 10px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px inset;
  &:focus {
    background: aqua;
  }
`;

export const Input = styled.input`
  width: 15vw;
  height: 5vh;
  border: none;
  font-size: 1.1rem;
  &:focus {
    outline: none;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 1.2rem;
`;
