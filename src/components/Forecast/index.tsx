import Header from '../Header';
import { useUserName } from '../../global/context';

type ForecastProps = {
  isLoaded: boolean;
};

const Forecast = ({ isLoaded }: ForecastProps) => {
  const user = useUserName();
  return isLoaded ? <Header userName={user ? user[0] : ''} /> : null;
};

export default Forecast;
