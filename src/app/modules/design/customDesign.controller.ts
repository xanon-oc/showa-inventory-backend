import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CustomShoeDesignService } from './customDesign.service';

// add custom shoe design

const addCustomShoeDesign = catchAsync(async (req, res) => {
  const result = await CustomShoeDesignService.addCustomShoeDesignToDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Custom shope design added successfully',
    data: result,
  });
});
// add custom shoe design

const updateCustomShoeDesign = catchAsync(async (req, res) => {
  const payload = {
    id: req.params.id,
    data: req.body,
  };
  const result =
    await CustomShoeDesignService.updateCustomShoeDesignToDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Custom shope design updated successfully',
    data: result,
  });
});

// get custom shoe design from db

const getCustomShoeDesign = catchAsync(async (req, res) => {
  const result = await CustomShoeDesignService.getAllCustomShoeDesignFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Custom shoe design fetched successfully',
    data: result,
  });
});

export const CustomShoeDesignController = {
  addCustomShoeDesign,
  updateCustomShoeDesign,
  getCustomShoeDesign,
};
