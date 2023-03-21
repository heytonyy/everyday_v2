interface StoreState {
  mode: string;
  user: User | null;
  token: string | null;
  days: Day[];
}

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  bio: string;
  friends: User[];
  picturePath: string;
  impressions: number;
  createdAt: string;
  updatedAt: string;
}

interface Day {
  _id: string;
  userId: number;
  username: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: number;
  likes: Map<string, boolean>;
  comments: string[];
}

export type { StoreState, User, Day };
