import { useEffect, useState } from 'react';
import { CollectionType, Photo } from './types';

const useUnsplashPhoto = () => {
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const getPhoto = async (): Promise<void> => {
      const response = await fetch(
        `/api/unsplashCollections?collectionId=${getCollectionIdByTime()}`,
      );
      const { photos } = await response.json();
      const photo = photos[Math.floor(Math.random() * photos.length)];
      setPhoto({
        id: photo.id,
        description: photo.description,
        width: photo.width,
        height: photo.height,
        fullImageUrl: photo.urls.full,
        regImageUrl: photo.urls.regular,
        user: {
          id: photo.user.id,
          name: photo.user.name,
          portfolioUrl: photo.user.portfolio_url || photo.user.links.html,
          profileImage: photo.user.profile_image.small || '',
        },
      });
    };
    getPhoto();
  }, []);

  return {
    photo,
  };
};

// TODO: Eventually, just grab the collections from my user through the API.
const getCollectionIdByType = (type: CollectionType) => {
  const ids = {
    Morning: 48980708,
    Afternoon: 85266674,
    Evening: 73694709,
  };
  return ids[type];
};

const getCollectionIdByTime = (): number => {
  const hour = new Date().getHours();
  const isMorning = hour >= 5 && hour < 12;
  const isAfternoon = hour >= 12 && hour < 17;
  if (isMorning) {
    return getCollectionIdByType('Morning');
  }
  if (isAfternoon) {
    return getCollectionIdByType('Afternoon');
  }
  return getCollectionIdByType('Evening');
};

export default useUnsplashPhoto;
