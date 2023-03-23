type StoreState = {
  mode: string;
  user: User | null;
  token: string | null;
  days: Day[];
};

type User = {
  _id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  location: string;
  bio: string;
  friends: User[];
  picturePath: string;
  createdAt?: string;
  updatedAt?: string;
};

type UserIdProp = {
  userId: string;
};

type AvatarProps = {
  image: string;
  size?: string;
};

type FriendProps = {
  friendId: string;
  name: string;
  location: string;
  picturePath: string;
};

type Day = {
  _id: string;
  userId: string;
  username: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: Map<string, boolean>;
  comments: string[];
};

type DayProps = {
  _id: string;
  userId: string;
  username: string;
  description: string;
  location: string;
  picturePath: string;
  userPicturePath: string;
  likes: Map<string, boolean>;
  comments: string[];
};

type AllDaysProps = {
  userId: string;
  isProfile?: boolean;
};

type Chat = {
  friendId: string;
  username: string;
  bio: string;
  picturePath: string;
};

export type {
  StoreState,
  User,
  Day,
  UserIdProp,
  FriendProps,
  AllDaysProps,
  DayProps,
  AvatarProps,
  Chat,
};
