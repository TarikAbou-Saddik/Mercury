import styled from 'styled-components';
import { useState } from 'react';
import useGeoCodeByLocation, {
  Location,
  locationToString,
} from '../../hooks/useGeoCodeByLocation';
import TextInput from '../TextInput';
import useSessionStorage from '../../hooks/useSessionStorage';

const defaultLocation: Location = {
  name: '',
  lon: null,
  lat: null,
  state: '',
  country: '',
  formattedName: '',
};

type CitySelectorProps = {
  labelName?: string;
};

const CitySelector = ({ labelName }: CitySelectorProps) => {
  const setLocation = useSessionStorage('location', defaultLocation)[1];
  const [cityName, setCityName] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const locations = useGeoCodeByLocation(locationQuery);

  const onSelectLocation = (location: Location) => {
    setLocation(location);
    setCityName(locationToString(location));
    setLocationQuery('');
  };

  const onCityNameChange = (value: string) => {
    setCityName(value);
    setLocationQuery(value);
  };

  return (
    <>
      <TextInput
        labelName={labelName || ''}
        value={cityName}
        placeholder='Enter your city...'
        onValueChange={val => onCityNameChange(val)}
      />
      <CitiesWrapper>
        {locations.length > 0 &&
          locations.map((location, idx: number) => (
            <City key={idx} onClick={() => onSelectLocation(location)}>
              <h4>{locationToString(location)}</h4>
            </City>
          ))}
      </CitiesWrapper>
    </>
  );
};

const CitiesWrapper = styled.div`
  width: 17vw;
  position: absolute;
  bottom: -10vh;
  background: white;
  border-radius: 10px;
`;

const City = styled.div`
  cursor: pointer;
  height: 4vh;
  padding: 5px 10px;
  transition: all 0.2s ease-in;
  & h4 {
    font-weight: 300;
  }
  &:hover {
    background: lightgray;
    & h4 {
      font-weight: 400;
    }
  }
`;

export default CitySelector;
