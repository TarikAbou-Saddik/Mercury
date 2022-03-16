import { FormEvent, useState, useRef } from 'react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import CitySelector from '../CitySelector';
import useSessionStorage from '../../hooks/useSessionStorage';
import { Location, locationToString } from '../../hooks/useGeoCodeByLocation';
import {
  Wrapper,
  FormWrapper,
  Label,
  InputWrapper,
  Input,
  Icon,
  Button,
} from './styles';

type ConfigureProps = {
  onSubmit: () => void;
};

const defaultLocation: Location = {
  name: '',
  lon: null,
  lat: null,
  state: '',
  country: '',
};

const Configure = ({ onSubmit }: ConfigureProps) => {
  const cityInput = useRef(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [userName, setUserName] = useSessionStorage('userName', '');
  const setLocation = useSessionStorage('location', defaultLocation)[1];

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const onSelectLocation = (location: Location) => {
    setLocation(location);
    setLocationQuery(locationToString(location));
  };

  const onChangeLocation = (value: string) => {
    setLocationQuery(value);
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
          <InputWrapper>
            <Input
              type='text'
              placeholder='Enter your city...'
              value={locationQuery}
              onChange={e => onChangeLocation(e.target.value)}
              ref={cityInput}
            />
            <Icon
              className={locationQuery.length > 0 ? '' : 'hidden'}
              icon={faCircleXmark}
              onClick={() => setLocationQuery('')}
            />
          </InputWrapper>
        </Label>
        <Button>Submit</Button>
      </FormWrapper>
      {document.activeElement === cityInput.current && (
        <CitySelector
          locationString={locationQuery}
          onSelect={onSelectLocation}
        />
      )}
    </Wrapper>
  );
};

export default Configure;
