import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { IRequest, IResponse } from '../../interfaces/express';

export const excludeLogParams: {[key: string]: boolean} = {
  '/auth/sign-in': true,
}

/**
 * Logging path
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {function} next Express next fucntion
 */
export const loggingPath = (req: IRequest, res: IResponse, next: NextFunction) => {
  req.logger?.info(
    `${req.ip} ${req.protocol} ${req.method} ${req.originalUrl} ${req.headers['user-agent']}`);
  if (Object.keys(req.query).length && !excludeLogParams[req.originalUrl]) req.logger?.info(`Query: ${JSON.stringify(req.query)}`);
  if (Object.keys(req.body).length && !excludeLogParams[req.originalUrl]) req.logger?.info(`Body: ${JSON.stringify(req.body)}`);
  if (Object.keys(req.params).length && !excludeLogParams[req.originalUrl]) req.logger?.info(`Params: ${JSON.stringify(req.params)}`);
  next();
};

/**
 * Logging morgan response
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {function} next Express next fucntion
 */
export const loggingResponse = (req: IRequest, res: IResponse, next: NextFunction) => {
  morgan.token('uuid', function (req: IRequest, res) {
    return req.uuid;
  });
  next();
};


export const errorHandlerMiddleware = (err: Error, req: IRequest, res: IResponse, next: NextFunction) => {
  req.logger?.error(err.stack || 'Issue not detected by ErrorHandler');
  res.status(500).json({
    message: 'Something went wrong! Please, contact an admin.'
  })
}