type StoreState = {
  mode: string;
  user: User | null;
  token: string | null;
  days: Day[];
  chats: Chat[];
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
  _id: string;
  friendId: string;
  createdAt: string;
};

type ChatProps = {
  chatId: string;
};

type ChatResponse = {
  _id: string;
  members: string[];
  createdAt: string;
};

export type {
  StoreState,
  User,
  UserIdProp,
  FriendProps,
  AvatarProps,
  Day,
  DayProps,
  AllDaysProps,
  Chat,
  ChatProps,
  ChatResponse,
};
