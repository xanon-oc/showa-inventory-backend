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

export const CustomShoeDesignController = { addCustomShoeDesign };
