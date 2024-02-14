/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.model';
import { CustomShoeDesign } from './customDesign.model';
import { TCustomShoeDesign } from './customDesign.interface';

// add custom shoe design into db
const addCustomShoeDesignToDB = async (payload: TCustomShoeDesign) => {
  const isUserExists = await User.isUserExists(payload.userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await CustomShoeDesign.create(payload);
  return result;
};

// update custom shoe design into db

const updateCustomShoeDesignToDB = async ({
  id,
  data,
}: {
  id: string;
  data: TCustomShoeDesign;
}) => {
  // checking if the custom shoe design exists
  const existingCustomShoeDesign = await CustomShoeDesign.findById(id);
  if (!existingCustomShoeDesign) {
    throw new AppError(httpStatus.NOT_FOUND, 'Custom shoe design not found');
  }

  // updating the custom shoe design with the new data dynamically
  Object.keys(data).forEach((key) => {
    if (key === 'customization' && typeof data[key] === 'object') {
      // if the property is 'customization', update its sub-properties
      Object.keys(data[key] as Record<string, unknown>).forEach((subKey) => {
        // Refining the type to allow any property access
        (existingCustomShoeDesign as any).customization[subKey] = (
          data[key] as any
        )[subKey];
      });
    } else {
      // otherwise, updating the property directly
      (existingCustomShoeDesign as any)[key] = (data as any)[key];
    }
  });

  const updatedCustomShoeDesign = await existingCustomShoeDesign.save();

  return updatedCustomShoeDesign;
};

// get all custom design

const getAllCustomShoeDesignFromDB = async () => {
  const result = await CustomShoeDesign.find();
  return result;
};

export const CustomShoeDesignService = {
  addCustomShoeDesignToDB,
  updateCustomShoeDesignToDB,
  getAllCustomShoeDesignFromDB,
};
