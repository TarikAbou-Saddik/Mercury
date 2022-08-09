import { useEffect, useState } from 'react';
import { getInfoByTimeOfDay, getRandomNumber } from '../utils';
import { TimeOfDay } from '../global/types';

export type UnsplashUser = {
  id: string;
  name: string;
  isForHire?: boolean;
  portfolioUrl: string;
  profileImage: string;
};

export interface Photo {
  id: string;
  width: number;
  height: number;
  description: string;
  fullImageUrl: string;
  regImageUrl: string;
  user?: UnsplashUser;
}

const useUnsplashPhoto = () => {
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const getPhoto = async (): Promise<void> => {
      const collection = getInfoByTimeOfDay(getCollectionIdByType);
      const response = await fetch(
        `/api/unsplashCollections?collectionId=${collection}`,
      );
      const { photos } = await response.json();
      if (photos) {
        const photo = photos[getRandomNumber(photos.length)];
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
      }
    };
    getPhoto();
  }, []);

  return { photo, isLoading: photo === null };
};

// TODO: Eventually, just grab the collections from my user through the API.
const getCollectionIdByType = (type: TimeOfDay) => {
  const ids = {
    Morning: 48980708,
    Afternoon: 85266674,
    Evening: 73694709,
  };
  return ids[type];
};

export default useUnsplashPhoto;
