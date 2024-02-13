import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './auth.interface';
import { User } from './auth.model';
import config from '../../config';
import { createToken, verifyToken } from './auth.utils';

// create a user into DB
const createAUserIntoDB = async (payload: TUser) => {
  const isUserExists = await User.isUserExists(payload.email);
  if (isUserExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User already exists');
  }
  const result = await User.create(payload);
  return result;
};

// login user
const loginAUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  // checking if the password matched or not

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  // create a access token

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // create refresh token

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  // Exclude password field from the user object

  const userWithoutPassword = {
    email: user.email,
    role: user.role,
  };

  const result = {
    userWithoutPassword,
    accessToken,
    refreshToken,
  };

  return result;
};

// create refresh token

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  createAUserIntoDB,
  loginAUser,
  refreshToken,
};
