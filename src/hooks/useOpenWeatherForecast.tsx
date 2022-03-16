import { useEffect, useState } from 'react';
import { Location } from './useGeoCodeByLocation';

export interface Icon {
  id: number;
  shortDescription: string;
  longDescription: string;
  icon: string;
}

interface BaseWeather {
  datetime: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  weatherIcon: Icon;
}

export interface CurrentWeather extends BaseWeather {
  sunrise: number;
  sunset: number;
  temperature: number;
  feelsLike: number;
}

export interface DailyWeather extends BaseWeather {
  tempDay: number;
  tempNight: number;
  tempMin: number;
  tempMax: number;
  feelsLikeDay: number;
  feelsLikeNight: number;
}

export interface WeatherForecast {
  timezoneOffset: number;
  current: CurrentWeather;
  daily: DailyWeather[];
}

const useOpenWeatherForecast = (location: Location) => {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);

  const mapToForecast = ({
    timezone_offset,
    current,
    daily,
  }: any): WeatherForecast => ({
    current: {
      datetime: current.dt,
      pressure: current.pressure,
      humidity: current.humidity,
      windSpeed: current.wind_speed * 3.6,
      weatherIcon: {
        id: current.weather[0].id,
        shortDescription: current.weather[0].main,
        longDescription: current.weather[0].description,
        icon: current.weather[0].icon,
      },
      sunrise: current.sunrise,
      sunset: current.sunset,
      temperature: current.temp,
      feelsLike: current.feels_like,
    },
    timezoneOffset: timezone_offset,
    daily: daily.slice(0, 5).map(
      (day: any): DailyWeather => ({
        datetime: day.dt,
        pressure: day.pressure,
        humidity: day.humidity,
        windSpeed: day.wind_speed,
        weatherIcon: {
          id: day.weather[0].id,
          shortDescription: day.weather[0].main,
          longDescription: day.weather[0].description,
          icon: day.weather[0].icon,
        },
        tempDay: day.temp.day,
        tempNight: day.temp.night,
        tempMin: day.temp.min,
        tempMax: day.temp.max,
        feelsLikeDay: day.feels_like.day,
        feelsLikeNight: day.feels_like.night,
      }),
    ),
  });

  useEffect(() => {
    if (location.lon && location.lat) {
      fetch(`/api/getForecast?lon=${location.lon}&lat=${location.lat}`)
        .then(resp => resp.json())
        .then(({ forecast }) => setForecast(mapToForecast(forecast)))
        .catch(err => console.log(err));
    }
  }, [location.lon, location.lat]);

  return { forecast, isLoading: forecast === null };
};

export default useOpenWeatherForecast;
