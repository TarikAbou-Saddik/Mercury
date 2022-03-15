import { useState } from 'react';
import Configure from '../components/Configure';
import Forecast from '../components/Forecast';
import UserCredit from '../components/UserCredit';
import useUnsplashPhoto from '../hooks/useUnsplashPhoto';
import { Wrapper, Image } from './styles';

const App = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const photo = useUnsplashPhoto();

  return (
    <Wrapper className={`${isImageLoaded ? '' : 'hidden'}`}>
      <Image
        alt={photo?.description}
        src={photo?.fullImageUrl}
        onLoad={() => setIsImageLoaded(true)}
      />
      {isImageLoaded &&
        (isConfigured ? (
          <Forecast />
        ) : (
          <Configure onSubmit={() => setIsConfigured(true)} />
        ))}
      {photo?.user && <UserCredit {...photo.user} />}
    </Wrapper>
  );
};

export default App;
