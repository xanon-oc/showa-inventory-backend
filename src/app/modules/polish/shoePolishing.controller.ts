import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ShoePolishRequestService } from './shoePolishing.service';
import { TShoePolishUpdate } from './shoePolish.constant';

// add shoe polish to db
const addShoePolishRequest = catchAsync(async (req, res) => {
  const result = await ShoePolishRequestService.addShoePolishRequestIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shoe polish request add successfully',
    data: result,
  });
});

// update shoe polish
const updateShoePolishRequest = catchAsync(async (req, res) => {
  const payload: TShoePolishUpdate = {
    id: req.params.id,
    status: req.body.status,
  };
  const result =
    await ShoePolishRequestService.updateShoePolishRequestIntoDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shoe polish request add successfully',
    data: result,
  });
});
// get shoe polish
const getPolishStatusWithData = catchAsync(async (req, res) => {
  const result = await ShoePolishRequestService.getPolishStatusWithDataFromDB(
    req.params.email,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All shoe polish request fetched successfully',
    data: result,
  });
});
const getPolishData = catchAsync(async (req, res) => {
  const result =
    await ShoePolishRequestService.getAllPolishStatusWithDataFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All shoe polish request fetched successfully',
    data: result,
  });
});

export const ShoePolishRequestController = {
  addShoePolishRequest,
  updateShoePolishRequest,
  getPolishStatusWithData,
  getPolishData,
};
