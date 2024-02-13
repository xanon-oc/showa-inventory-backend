import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { HistoryServices } from './history.service';

const salesHistory = catchAsync(async (req, res) => {
  const result = await HistoryServices.salesHistoryFromDB(req.params.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales history fetched successfully',
    data: result,
  });
});

export const HistoryController = { salesHistory };
