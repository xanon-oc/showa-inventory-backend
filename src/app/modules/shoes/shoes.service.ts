import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TShoe } from './shoes.interface';
import { Shoe } from './shoes.model';
import { v4 as uuidv4 } from 'uuid';

// Add a new pair of shoes to the inventory.
const addAShoesIntoDB = async (payload: TShoe) => {
  // generating a unique ID for the shoe
  const shoeId = uuidv4();
  // assigning the generated ID to the payload
  const payloadWithId = { ...payload, shoeId };

  // Insert the shoe into the database
  const result = await Shoe.create(payloadWithId);
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
  const queryObject = { ...query };
  const searchableField = ['name', 'color', 'size', 'material'];
  let sort = 'price';
  let limit = 10;
  let page = 1;
  let skip = 0;
  let fields = '-__v';
  let minPrice = 0;
  let maxPrice = Number.MAX_SAFE_INTEGER; // Assuming maxPrice is very large if not provided

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  if (query?.minPrice !== undefined) {
    minPrice = parseInt(query.minPrice as string, 10);
    delete queryObject['minPrice']; // Remove minPrice from query object to avoid duplicate filtering
  }

  if (query?.maxPrice !== undefined) {
    maxPrice = parseInt(query.maxPrice as string, 10);
    delete queryObject['maxPrice']; // Remove maxPrice from query object to avoid duplicate filtering
  }

  const searchQuery = Shoe.find({
    $and: [
      {
        $or: searchableField.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      },
      { price: { $gte: minPrice, $lte: maxPrice } }, // Using $lte for maxPrice
    ],
  });

  const excludeField = [
    'searchTerm',
    'sort',
    'limit',
    'page',
    'fields',
    'minPrice',
    'maxPrice',
  ];
  excludeField.forEach((el) => delete queryObject[el]);

  const filterQuery = searchQuery.find(queryObject);

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  if (query?.limit) {
    limit = Number(query.limit);
  }

  if (query?.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);

  if (query.fields) {
    fields = (query.fields as string)?.split(',').join(' ');
  }

  const result = await limitQuery.select(fields);

  return {
    result,
  };
};

// Product Verification/ID Verification

const productVerificationIntoDB = async (shoeId: string) => {
  const isShoeVerificationSuccessFul = await Shoe.findOne({ shoeId });
  if (!isShoeVerificationSuccessFul) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product verification failed');
  }
  return isShoeVerificationSuccessFul;
};

export const ShoeServices = {
  addAShoesIntoDB,
  deleteShoesFromDB,
  bulkDeleteShoesFromDB,
  updateShoeDetailsOnDB,
  getAllShoesFromDB,
  productVerificationIntoDB,
};
