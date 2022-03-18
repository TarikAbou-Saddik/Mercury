import { useEffect, useState } from 'react';
import { Location } from '../global/types';

type LocationByQueryString = {
  [key: string]: Location[];
};

const useGeoCodeByLocation = (location: string) => {
  const [locations, setLocations] = useState<LocationByQueryString>({});

  const mapToLocation = (location: any): Location => ({
    name: location.name,
    state: location.state || '',
    country: location.country,
    lat: location.lat,
    lon: location.lon,
    formattedName: locationToString(location),
  });

  useEffect(() => {
    if (location.length) {
      fetch(`/api/geocode?location=${location}`)
        .then(resp => resp.json())
        .then(json =>
          setLocations(prev => ({
            ...prev,
            [location]: json.locations.map(mapToLocation),
          })),
        );
    }
  }, [location]);

  return location in locations ? locations[location] : [];
};

export const locationToString = ({ name, state, country }: Location) => {
  if (state && state.length) {
    return `${name}, ${state}, ${country}`;
  }
  return `${name}, ${country}`;
};

export default useGeoCodeByLocation;
