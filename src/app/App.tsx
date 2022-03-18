import { useState } from 'react';
import Configure from '../components/Configure';
import Forecast from '../components/Forecast';
import UserCredit from '../components/UserCredit';
import { Config } from '../global/types';
import useSessionStorage from '../hooks/useSessionStorage';
import useUnsplashPhoto from '../hooks/useUnsplashPhoto';
import { Wrapper, Image, Content } from './styles';

const App = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [config] = useSessionStorage<Config>('mercuryConfig');
  const [isConfigured, setIsConfigured] = useState(
    config.location.lon !== null,
  );
  const { photo } = useUnsplashPhoto();

  return (
    <Wrapper className={`${isImageLoaded ? '' : 'hidden'}`}>
      <Image
        alt={photo?.description}
        src={photo?.fullImageUrl}
        onLoad={() => setIsImageLoaded(true)}
      />
      <Content>
        {isImageLoaded &&
          (isConfigured ? (
            <Forecast onReset={() => setIsConfigured(false)} />
          ) : (
            <Configure onSubmit={() => setIsConfigured(true)} />
          ))}
      </Content>
      {isImageLoaded && photo?.user && <UserCredit {...photo.user} />}
    </Wrapper>
  );
};

export default App;
