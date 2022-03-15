import styled from 'styled-components';
import useOpenWeatherForecast from '../../hooks/useOpenWeatherForecast';
import useSessionStorage from '../../hooks/useSessionStorage';
import Header from '../Header';
import WeatherIcon from '../WeatherIcon';

const Forecast = () => {
  const [userName] = useSessionStorage('userName', '');
  const [location] = useSessionStorage('location', {});
  const forecast = useOpenWeatherForecast(location);

  console.log(forecast);

  return (
    <ForecastWrapper>
      <Header userName={userName}>
        <WeatherIcon icon={forecast?.weather} />
      </Header>
    </ForecastWrapper>
  );
};

const ForecastWrapper = styled.div``;

export default Forecast;
