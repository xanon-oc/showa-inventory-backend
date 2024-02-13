import { Response } from 'express';

type TResponse<T, U> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: U;
};

const sendResponse = <T, U>(res: Response, data: TResponse<T, U>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
