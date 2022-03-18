export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening';

export interface Location {
  name: string;
  state: string;
  country: string;
  lat: number | null;
  lon: number | null;
  formattedName: string;
}

export type Config = {
  location: Location;
  userName: string;
};
