import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res
    .status(500)
    .send({ errors: [{ message: 'Something went wrong, please try again' }] });
  // console.error('something went wrong', err);
  next();
};