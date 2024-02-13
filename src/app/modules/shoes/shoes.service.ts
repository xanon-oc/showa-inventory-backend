// Add a new pair of shoes to the inventory.

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TShoe } from './shoes.interface';
import { Shoe } from './shoes.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { InventorySearchableFields } from './shoes.constant';

const addAShoesIntoDB = async (payload: TShoe) => {
  const result = await Shoe.create(payload);
  return result;
};

// Delete existing shoes from the inventory.

const deleteShoesFromDB = async (payload: string) => {
  // checking if the Shoe exists
  const isShoeExists = await Shoe.isShoeExists(payload);
  if (!isShoeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Shoe not found');
  }

  await Shoe.findByIdAndDelete(payload);
  return null;
};
// Delete existing shoes from the inventory.

const bulkDeleteShoesFromDB = async (payload: string[]) => {
  // Check if all shoes in the payload exist
  for (const shoeId of payload) {
    const isShoeExists = await Shoe.isShoeExists(shoeId);
    if (!isShoeExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Shoe with ID ${shoeId} not found`,
      );
    }
  }

  // Delete the shoes with the specified IDs
  await Shoe.deleteMany({ _id: { $in: payload } });

  return null;
};

// Update shoe details.

const updateShoeDetailsOnDB = async (id: string, payload: Partial<TShoe>) => {
  // checking if the Shoe exists
  const isShoeExists = await Shoe.isShoeExists(id);
  if (!isShoeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Shoe not found');
  }
  const updatedData = await Shoe.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedData;
};

// Read and view the list of shoes in the inventory.

const getAllShoesFromDB = async (query: Record<string, unknown>) => {
  const shoeQuery = new QueryBuilder(Shoe.find(), query)
    .search(InventorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await shoeQuery.modelQuery;
  const meta = await shoeQuery.countTotal();

  return {
    meta,
    result,
  };
};

// Implement a robust filtering system to effectively narrow down shoe selections based on various criteria.

export const ShoeServices = {
  addAShoesIntoDB,
  deleteShoesFromDB,
  bulkDeleteShoesFromDB,
  updateShoeDetailsOnDB,
  getAllShoesFromDB,
};
