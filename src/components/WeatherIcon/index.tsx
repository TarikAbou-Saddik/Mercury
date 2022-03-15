import styled from 'styled-components';
import { Icon } from '../../hooks/useOpenWeatherForecast';
import './assets/css/weather-icons.min.css';
import './assets/css/weather-icons-wind.min.css';

type WeatherIconProps = {
  icon: Icon | undefined;
};

const WeatherIcon = ({ icon }: WeatherIconProps) => {
  return <StyledIcon className={`wi wi-owm-${icon?.id}`}></StyledIcon>;
};

const StyledIcon = styled.i`
  margin-left: 2vw;
  font-size: 3rem;
`;

export default WeatherIcon;
