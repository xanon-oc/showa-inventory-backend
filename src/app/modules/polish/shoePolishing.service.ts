import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.model';
import { ShoePolishRequest } from './shoePolishing.interface';
import { ShoePolish } from './shoePolishing.model';
import { TShoePolishUpdate } from './shoePolish.constant';

// add shoe polish into db
const addShoePolishRequestIntoDB = async (payload: ShoePolishRequest) => {
  const isUserExists = await User.isUserExists(payload.userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await ShoePolish.create(payload);
  return result;
};
// update shoe polish status into db
const updateShoePolishRequestIntoDB = async ({
  id,
  status,
}: TShoePolishUpdate) => {
  // checking if the shoe polish request exists
  const isShoePolishExists = await ShoePolish.findById(id);
  if (!isShoePolishExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Shoe polish not found');
  }

  // getting the current status of the shoe polish request
  const currentStatus = isShoePolishExists.status;

  // validate if the requested status transition is valid based on the current status
  if (
    (currentStatus === 'pending' && status === 'processing') ||
    (currentStatus === 'processing' && status === 'completed')
  ) {
    // if the transition is valid
    isShoePolishExists.status = status;
    const result = await isShoePolishExists.save();
    return result;
  } else if (currentStatus === 'pending' && status === 'completed') {
    // if the user is trying to update from pending to completed
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Cannot change status from pending to completed directly',
    );
  } else if (currentStatus === 'completed') {
    // if the shoe polish request is already completed
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Shoe polish request is already completed',
    );
  } else {
    // for all other invalid status transitions, throwing a general error
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid status transition');
  }
};

// get all shoe polish from db
export const ShoePolishRequestService = {
  addShoePolishRequestIntoDB,
  updateShoePolishRequestIntoDB,
};
