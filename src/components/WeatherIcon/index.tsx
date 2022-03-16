import styled from 'styled-components';
import { Icon } from '../../hooks/useOpenWeatherForecast';
import './assets/css/weather-icons.min.css';
import './assets/css/weather-icons-wind.min.css';
import { getInfoByTimeOfDay } from '../../utils';
import { TimeOfDay } from '../../global/types';

type IconSize = 'sm' | 'md' | 'lg';

type WeatherIconProps = {
  icon: Icon | undefined;
  size?: IconSize;
};

const WeatherIcon = ({ icon, size }: WeatherIconProps) => {
  const getTimeOfDay = (): string => {
    const timeOfDay = getInfoByTimeOfDay(type => type) as TimeOfDay;
    if (timeOfDay === 'Morning' || timeOfDay === 'Afternoon') {
      return 'day';
    }
    return 'night';
  };

  return (
    <StyledIcon
      size={size || 'sm'}
      className={`wi wi-owm-${getTimeOfDay()}-${icon?.id}`}
    ></StyledIcon>
  );
};

const mapIconSizeToFontSize = (iconSize: IconSize): string => {
  switch (iconSize) {
    case 'sm':
      return '1.5rem';
    case 'md':
      return '3.5rem';
    case 'lg':
      return '5rem';
    default:
      return '2.5rem';
  }
};

type StyledIconProps = {
  size: IconSize;
};

const StyledIcon = styled.i<StyledIconProps>`
  font-size: ${({ size }) => mapIconSizeToFontSize(size)};
`;

export default WeatherIcon;
