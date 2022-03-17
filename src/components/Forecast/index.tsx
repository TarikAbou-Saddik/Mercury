import styled from 'styled-components';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { Location } from '../../hooks/useGeoCodeByLocation';
import useOpenWeatherForecast from '../../hooks/useOpenWeatherForecast';
import useSessionStorage from '../../hooks/useSessionStorage';
import Header from '../Header';
import WeatherIcon from '../WeatherIcon';

const Forecast = () => {
  const [userName] = useSessionStorage<string>('userName');
  const [location] = useSessionStorage<Location>('location');
  const { forecast, isLoading } = useOpenWeatherForecast(location as Location);

  const getDateString = (dateTime: number | undefined): string => {
    if (!dateTime) {
      return '';
    }
    const date = new Date(dateTime * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDay = (dateTime: number | undefined) => {
    const day = new Date((dateTime as number) * 1000).toLocaleDateString(
      'en-US',
      { weekday: 'long' },
    );
    return day === new Date().toLocaleDateString('en-US', { weekday: 'long' })
      ? 'Today'
      : day;
  };

  const formatTemp = (temp: number | undefined): string =>
    temp ? `${Math.ceil(temp)}${'\u00b0'}` : '';

  return (
    <ForecastWrapper className={isLoading ? 'hidden' : ''}>
      <Header userName={userName}></Header>
      <CurrentWeatherContainer>
        <LocationAndDateWrapper>
          <p>{getDateString(forecast?.current.datetime)}</p>
          <div>
            <h3>{(location as Location).name}</h3>
            {getUnicodeFlagIcon(location.country)}
          </div>
        </LocationAndDateWrapper>
        <TemperatureWrapper>
          <h1>{formatTemp(forecast?.current.temperature)}</h1>
          <TemperatureDetails>
            <WeatherIcon size='lg' icon={forecast?.current.weatherIcon} />
            <h2>{forecast?.current.weatherIcon.longDescription}</h2>
            <p>
              Today, the high will be {formatTemp(forecast?.daily[0].tempMax)}{' '}
              with winds at {forecast?.current.windSpeed.toFixed(1)} km/h
            </p>
          </TemperatureDetails>
        </TemperatureWrapper>
      </CurrentWeatherContainer>
      <ForecastList>
        {forecast?.daily.map((dailyForecast, idx) => (
          <DailyForecastWrapper key={idx}>
            <h1>{getDay(dailyForecast.datetime)}</h1>
            <WeatherIcon size='md' icon={dailyForecast.weatherIcon} />
            <h2>{formatTemp(dailyForecast.tempDay)}</h2>
            <p>{dailyForecast.weatherIcon.longDescription}</p>
          </DailyForecastWrapper>
        ))}
      </ForecastList>
    </ForecastWrapper>
  );
};

const ForecastWrapper = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 8vh;
  opacity: 1;
  transition: opacity 0.4s ease-in-out;

  & p {
    font-weight: 100;
  }

  &.hidden {
    opacity: 0;
  }
`;

const CurrentWeatherContainer = styled.div`
  margin-top: 10vh;
  background: rgba(255, 255, 255, 0.75);
  width: 30vw;
  height: 60vh;
  border-radius: 15px;
  padding: 3vh 2.5vw;
`;

const LocationAndDateWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & div {
    display: flex;
    align-items: center;
    font-size: 2rem;
  }

  & p {
    font-size: 0.9rem;
  }

  & h3 {
    font-weight: 400;
    font-size: 2rem;
    margin-right: 20px;
  }
`;

const TemperatureWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  & h1 {
    font-size: 8rem;
  }
`;

const TemperatureDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 20vh;

  & h2 {
    font-weight: 400;
  }

  & p {
    font-style: italic;
    text-align: center;
  }
`;

const ForecastList = styled.div`
  position: absolute;
  bottom: -12vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 60vw;
`;

const DailyForecastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: rgba(255, 255, 255, 0.95);
  width: 10vw;
  height: 30vh;
  border-radius: 15px;
  padding: 2vh;

  & h1 {
    font-weight: 200;
    font-size: 1.5rem;
  }

  & h2 {
    font-size: 2rem;
  }
`;

export default Forecast;
