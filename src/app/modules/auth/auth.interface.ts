import { Model } from 'mongoose';

export type TLoginUser = {
  email: string;
  password: string;
};

export type TUser = {
  name: string;
  gender: 'male' | 'female';
  email: string;
  password: string;
  role: 'superAdmin' | 'seller' | 'user';
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
