import styled from 'styled-components';
import useGeoCodeByLocation, {
  Location,
  locationToString,
} from '../../hooks/useGeoCodeByLocation';

type CitySelectorProps = {
  locationString: string;
  onSelect: (location: Location) => void;
};

const CitySelector = ({ locationString, onSelect }: CitySelectorProps) => {
  const locations = useGeoCodeByLocation(locationString);

  return (
    <CitiesWrapper>
      {locations.length > 0 &&
        locations.map((location, idx: number) => (
          <City key={idx} onClick={() => onSelect({ ...location })}>
            <h4>{locationToString(location)}</h4>
          </City>
        ))}
    </CitiesWrapper>
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
