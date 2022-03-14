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
