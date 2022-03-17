import styled from 'styled-components';
import { HTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  labelName: string;
  value: string;
  onValueChange: (value: any) => void;
}

const TextInput = ({
  labelName,
  onValueChange,
  value,
  ...inputProps
}: TextInputProps) => {
  return (
    <Label>
      {labelName}
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
