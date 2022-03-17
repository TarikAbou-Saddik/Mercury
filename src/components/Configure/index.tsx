import { FormEvent } from 'react';
import CitySelector from '../CitySelector';
import useSessionStorage from '../../hooks/useSessionStorage';
import { Wrapper, FormWrapper, Button } from './styles';
import TextInput from '../TextInput';

type ConfigureProps = {
  onSubmit: () => void;
};

const Configure = ({ onSubmit }: ConfigureProps) => {
  const [userName, setUserName] = useSessionStorage('userName', '');

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Wrapper>
      <h1>mercury</h1>
      <FormWrapper onSubmit={handleFormSubmit}>
        <TextInput
          labelName='Name'
          value={userName}
          placeholder='Enter your name...'
          onValueChange={val => setUserName(val)}
        />
        <CitySelector labelName='City' />
        <Button>Submit</Button>
      </FormWrapper>
    </Wrapper>
  );
};

export default Configure;
