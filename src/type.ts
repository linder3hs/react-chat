export interface IUser {
  createdAt: string;
  email: string;
  id: string;
  lastname: string;
  name: string;
  password: string;
  updatedAt: string;
}

export interface IMessage {
  id: string;
  text: string;
  transmitterUserId: string;
  receiverUserId: string;
}
