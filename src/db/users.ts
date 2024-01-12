import mongoose from 'mongoose';

export interface User {
  username: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken?: string;
  };
  image?: string;
  address?: string;
  dateOfBirth?: string;
}

const UserSchema = new mongoose.Schema<User>({
  username: { type: 'string', required: true },
  email: { type: 'string', required: true },
  authentication: {
    password: { type: 'string', required: true, selected: false },
    salt: { type: 'string', selected: false },
    sessionToken: { type: 'string', selected: false },
  },
  image: { type: 'string' },
  address: { type: 'string' },
  dateOfBirth: { type: 'string' },
});

export const UserModel = mongoose.model<User & Document>('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: User) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Partial<User>) =>
  UserModel.findByIdAndUpdate(id, values);
