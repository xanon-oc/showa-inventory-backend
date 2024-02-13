import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Shoe } from '../shoes/shoes.model';
import { TSale } from './sales.interface';
import { Types } from 'mongoose';
import { Sales } from './sales.model';

// post sales on DB
const postSalesInDB = async (payload: TSale) => {
  // checking if the Shoe exists
  const id = new Types.ObjectId(payload.productId).toString();
  const isShoeExists = await Shoe.isShoeExists(id);
  if (!isShoeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Shoe not found');
  }

  // Check if the requested quantity is valid
  if (payload.quantity > isShoeExists.quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid quantity. Exceeds available stock.',
    );
  }

  // Calculating the updated stock after the sale
  const updatedStock = isShoeExists.quantity - payload.quantity;

  // Check if the quantity reaches zero, and remove the product from inventory
  if (updatedStock === 0) {
    await Shoe.findByIdAndDelete(id);
  } else {
    // Update the stock of the shoe
    await Shoe.findByIdAndUpdate(id, { quantity: updatedStock });
  }

  // Create the sales record
  const saleRecord = await Sales.create(payload);

  return saleRecord;
};

export const SaleServices = {
  postSalesInDB,
};
