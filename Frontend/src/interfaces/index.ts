export interface User {
  userId: string;
  username: string;
  email: string;
  avatar_url: string;
  token: string;
}

export interface UserCredentialsSignIn {
  email: string;
  password: string;
}

export interface UserCredentialsSignUp {
  name: string;
  email: string;
  password: string;
}

export interface ChannnelsData {
  id: string;
  name: string;
  ownerId: string;
  imageUrl: string;
  countMembers: number;
  users: UserResponse[];
}

export interface UserResponse {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface ResponseMessage {
  channelName: string;
  userAvatar: string;
  userName: string;
  userId: string;
  message: string;
  sendDate: string;
}

export interface MessageData {
  sendMessage: string;
}