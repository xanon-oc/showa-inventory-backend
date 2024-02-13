// post sales on DB

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SaleServices } from './sales.service';

const postSale = catchAsync(async (req, res) => {
  const result = await SaleServices.postSalesInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Sales created successfully',
    data: result,
  });
});

export const SaleController = { postSale };
