import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShoeServices } from './shoes.service';

// Add a new pair of shoes to the inventory.
const addAShoes = catchAsync(async (req, res) => {
  const result = await ShoeServices.addAShoesIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Shoe create successfully',
    data: result,
  });
});

// Delete existing shoes from the inventory.

const deleteShoes = catchAsync(async (req, res) => {
  const result = await ShoeServices.deleteShoesFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shoe deleted successfully',
    data: result,
  });
});
// bulk Delete existing shoes from the inventory.

const bulkDeleteShoes = catchAsync(async (req, res) => {
  const result = await ShoeServices.bulkDeleteShoesFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shoes deleted successfully',
    data: result,
  });
});

// Update shoe details.

const updateShoeDetails = catchAsync(async (req, res) => {
  const result = await ShoeServices.updateShoeDetailsOnDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shoe updated successfully',
    data: result,
  });
});

// Read and view the list of shoes in the inventory.

const getAllShoes = catchAsync(async (req, res) => {
  const result = await ShoeServices.getAllShoesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shoe updated successfully',
    data: result,
  });
});

// product Verification Into DB

const productVerification = catchAsync(async (req, res) => {
  const result = await ShoeServices.productVerificationIntoDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shoe verification successful',
    data: result,
  });
});

export const ShoeControllers = {
  addAShoes,
  deleteShoes,
  bulkDeleteShoes,
  updateShoeDetails,
  getAllShoes,
  productVerification,
};
