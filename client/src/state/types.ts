/*
  This file contains the types for the state of the application.
*/

type StateType = {
  mode: string;
  user: User | null;
  token: string | null;
  days: Day[];
};

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  bio: string;
  picturePath?: string;
  friends?: string[];
  impressions?: number;
}

interface Day {
  _id: string;
  userId: string;
  username: string;
  description: string;
  location?: string;
  picturePath?: string;
  userPicturePath?: string;
  likes: Map<string, boolean>;
  comments: Array<{ text: string; user: string }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { StateType, User, Day };
