import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';

// create a user into DB
const createAUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createAUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
// login user
const loginAUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginAUser(req.body);
  const { accessToken, refreshToken } = result;

  // send access token to cookies
  res.cookie('refreshToken', refreshToken, {
    secure: config.node === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: { token: accessToken },
  });
});

// generate a refresh token

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

export const AuthControllers = {
  createAUser,
  loginAUser,
  refreshToken,
};
