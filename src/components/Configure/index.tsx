import styled from 'styled-components';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormEvent } from 'react';
import { useUserName, useCity } from '../../global/context';

type ConfigureProps = {
  onSubmit: () => void;
};

const Configure = ({ onSubmit }: ConfigureProps) => {
  const user = useUserName();
  const userName = (user && user[0]) || '';
  const setUserName = (value: string) =>
    user && user[1]({ type: 'SET_NAME', payload: value });

  const cityInfo = useCity();
  const city = (cityInfo && cityInfo[0]) || '';
  const setCity = (value: string) =>
    cityInfo && cityInfo[1]({ type: 'SET_CITY', payload: value });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Wrapper>
      <h1>mercury</h1>
      <FormWrapper onSubmit={handleFormSubmit}>
        <Label>
          Name
          <InputWrapper tabIndex={0}>
            <Input
              type='text'
              placeholder='Enter your name...'
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
            <Icon
              className={userName.length > 0 ? '' : 'hidden'}
              icon={faCircleXmark}
              onClick={() => setUserName('')}
            />
          </InputWrapper>
        </Label>
        <Label>
          City
          <InputWrapper tabIndex={0}>
            <Input
              type='text'
              placeholder='Enter your city...'
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <Icon
              className={city.length > 0 ? '' : 'hidden'}
              icon={faCircleXmark}
              onClick={() => setCity('')}
            />
          </InputWrapper>
        </Label>
        <Button>Submit</Button>
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

const FormWrapper = styled.form`
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  width: 50%;
  height: 5vh;
  cursor: pointer;
  font-size: 1rem;
  border: none;
  background-color: white;
  border-radius: 5px;
  transition: all 0.3s ease-in;
  transition-property: background color;

  &:hover {
    background: black;
    color: white;
  }
`;

const Icon = styled(FontAwesomeIcon)`
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

const InputWrapper = styled.div`
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

const Input = styled.input`
  width: 15vw;
  height: 5vh;
  border: none;
  font-size: 1.1rem;
  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export default Configure;
