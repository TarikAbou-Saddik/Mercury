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

const CitySelector = () => {
  const [location, setLocation] = useSessionStorage(
    'location',
    defaultLocation,
  );
  const [cityQuery, setCityQuery] = useState('');
  const locations = useGeoCodeByLocation(location.formattedName);

  const onSelectLocation = (location: Location) => {
    setLocation(location);
    setCityQuery(locationToString(location));
  };

  return (
    <>
      <TextInput
        labelName='City'
        value={cityQuery}
        placeholder='Enter your city...'
        onValueChange={val => setCityQuery(val)}
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
