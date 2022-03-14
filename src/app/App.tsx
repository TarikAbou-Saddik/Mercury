import { useState } from 'react';
import Header from '../components/Header';
import UserCredit from '../components/UserCredit';
import useUnsplashPhoto from '../hooks/useUnsplashPhoto';
import { Wrapper, Image } from './styles';

const App = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { photo } = useUnsplashPhoto();

  return (
    <Wrapper className={`${isImageLoaded ? '' : 'hidden'}`}>
      <Image
        alt={photo?.description}
        src={photo?.fullImageUrl}
        onLoad={() => setIsImageLoaded(true)}
      />
      {isImageLoaded && <Header />}
      {photo?.user && <UserCredit {...photo.user} />}
    </Wrapper>
  );
};

export default App;
