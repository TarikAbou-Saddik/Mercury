import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export type InputError = {
  name: string;
  errorMessage: string;
};

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: any) => void;
  labelName?: string;
  error?: InputError;
}

const TextInput = ({
  labelName,
  onValueChange,
  value,
  error,
  ...inputProps
}: TextInputProps) => {
  console.log('Rendering TextInput');
  return (
    <Label>
      <span className={error ? 'error' : ''}>{labelName}</span>
      <InputWrapper>
        <Input
          type='text'
          value={value}
          onChange={e => onValueChange(e.target.value)}
          {...inputProps}
        />
        <Icon
          className={value && value.length > 0 ? '' : 'hidden'}
          icon={faCircleXmark}
          onClick={() => onValueChange('')}
        />
      </InputWrapper>
      {error && <span className='error-message'>{error.errorMessage}</span>}
    </Label>
  );
};

export const InputWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  background: white;
  padding: 2px 10px;
  border-radius: 10px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px inset;
`;

export const Input = styled.input`
  width: 15vw;
  height: 5vh;
  border: none;
  font-size: 1.1rem;
  &:focus {
    outline: none;
  }
  background: inherit;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 1.2rem;

  & span.error {
    color: red;
  }

  & span.error-message {
    color: red;
    font-size: 0.8rem;
    margin-bottom: 10px;
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

export default TextInput;
