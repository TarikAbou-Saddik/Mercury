import { useEffect, useState } from 'react';
import { Location } from './useGeoCodeByLocation';

export interface Temperature {
  current: number;
  feelsLike: number;
  min: number;
  max: number;
  pressure: number;
  humidity: number;
}

export interface Icon {
  id: number;
  shortDescription: string;
  longDescription: string;
  icon: string;
}

export interface WeatherForecast {
  weather: Icon;
  temperature: Temperature;
  windSpeed: number;
  locationName: string;
}

const useOpenWeatherForecast = (location: Location) => {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);

  const mapToForecast = ({
    main,
    weather,
    wind,
    name,
  }: any): WeatherForecast => ({
    weather: weather[0],
    temperature: {
      current: main.temp,
      feelsLike: main.feels_like,
      min: main.temp_min,
      max: main.temp_max,
      pressure: main.pressure,
      humidity: main.humidity,
    },
    windSpeed: wind.speed * 3.6,
    locationName: name,
  });

  useEffect(() => {
    if (location.lon && location.lat) {
      fetch(`/api/getForecast?lon=${location.lon}&lat=${location.lat}`)
        .then(resp => resp.json())
        .then(({ forecast }) => setForecast(mapToForecast(forecast)))
        .catch(err => console.log(err));
    }
  }, [location.lon, location.lat]);

  return forecast;
};

export default useOpenWeatherForecast;
