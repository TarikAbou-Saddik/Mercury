import { FormEvent, useState } from 'react';
import useSessionStorage from '../../hooks/useSessionStorage';
import useGeoCodeByLocation, {
  locationToString,
} from '../../hooks/useGeoCodeByLocation';
import {
  Wrapper,
  FormWrapper,
  Button,
  CitiesWrapper,
  City,
  CityInputWrapper,
} from './styles';
import TextInput, { InputError } from '../TextInput';
import { defaultConfig } from '../../global/defaults';
import { Location } from '../../global/types';

type ConfigureProps = {
  onSubmit: () => void;
};

type ConfigState = {
  isConfigValid: boolean;
  errors: InputError[];
};

const defaultConfigState: ConfigState = {
  isConfigValid: true,
  errors: [],
};

const Configure = ({ onSubmit }: ConfigureProps) => {
  const [config, setConfig] = useSessionStorage('mercuryConfig', defaultConfig);
  const [configState, setConfigState] = useState(defaultConfigState);
  const [locationName, setLocationName] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [hasSelectedLocation, setHasSelectedLocation] = useState(false);
  const locations = useGeoCodeByLocation(locationQuery);

  const validateForm = (): ConfigState => {
    const hydrateConfigState = (
      state: ConfigState,
      name: string,
      errorMessage: string,
    ): void => {
      state.isConfigValid = false;
      state.errors.push({ name, errorMessage });
    };

    let configState: ConfigState = { isConfigValid: true, errors: [] };
    if (!config.userName.length) {
      hydrateConfigState(configState, 'userName', 'Please enter a user name');
    }
    if (!locationName.length) {
      hydrateConfigState(configState, 'location', 'No city was entered');
    } else if (!hasSelectedLocation && locations.length > 0) {
      hydrateConfigState(
        configState,
        'location',
        'Pick a city from the provided options',
      );
    } else if (!hasSelectedLocation && !locations.length) {
      hydrateConfigState(
        configState,
        'location',
        'Please enter a valid city name',
      );
    }
    return configState;
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const configState = validateForm();
    if (configState.isConfigValid) {
      onSubmit();
    }
    setConfigState(configState);
  };

  const handleOnChange = (field: string) => {
    const hasExistingError = getErrorByField(field);
    if (hasExistingError) {
      setConfigState(prev => ({
        ...prev,
        errors: prev.errors.filter(x => x.name !== field),
      }));
    }
  };

  const getErrorByField = (field: string): InputError | undefined =>
    configState.errors.find(e => e.name === field);

  const onUserNameChange = (value: string) => {
    setConfig(c => ({ ...c, userName: value }));
    handleOnChange('userName');
  };

  const onLocationChange = (value: string) => {
    setLocationQuery(value);
    setLocationName(value);
    setHasSelectedLocation(false);
    handleOnChange('location');
  };

  const onSelectLocation = (location: Location) => {
    setConfig(c => ({ ...c, location }));
    setLocationQuery('');
    setLocationName(locationToString(location));
    setHasSelectedLocation(true);
    handleOnChange('location');
  };

  return (
    <Wrapper>
      <h1>mercury</h1>
      <FormWrapper onSubmit={handleFormSubmit}>
        <TextInput
          labelName='Name'
          name='userName'
          value={config.userName}
          placeholder='Enter your name...'
          onValueChange={val => onUserNameChange(val)}
          error={getErrorByField('userName')}
        />
        <CityInputWrapper>
          <TextInput
            labelName='City'
            value={locationName}
            placeholder='Enter your city...'
            onValueChange={val => onLocationChange(val)}
            error={getErrorByField('location')}
          />
          <CitiesWrapper>
            {locations.length > 0 &&
              locations.map((location, idx: number) => (
                <City key={idx} onClick={() => onSelectLocation(location)}>
                  <h4>{locationToString(location)}</h4>
                </City>
              ))}
          </CitiesWrapper>
        </CityInputWrapper>
        <Button>Submit</Button>
      </FormWrapper>
    </Wrapper>
  );
};

export default Configure;
