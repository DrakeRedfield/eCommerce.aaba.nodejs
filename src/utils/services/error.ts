import { NextFunction } from "express";
import { logger } from "./winston";
import { IRequest, IResponse } from "../interfaces/express";
import { excludeLogParams } from "../middleware/logger/logger.middleware";

export const errorLoggerHandler = (e: any) => {
  if (typeof e === 'string') {
    logger.error(e);
  }
  if (e instanceof Error) {
    logger.error(e.message);
    logger.error(e.stack);
  }
};

export const errorHandler = (controller: (req: IRequest, res: IResponse) => IResponse) => async (req: IRequest, res: IResponse, next: NextFunction) => {
  try {
    await controller(req, res);
  } catch (error) {
    if (Object.keys(req.query).length && !excludeLogParams[req.originalUrl]) req.logger?.error(`Query: ${JSON.stringify(req.query)}`);
    if (Object.keys(req.body).length && !excludeLogParams[req.originalUrl]) req.logger?.error(`Body: ${JSON.stringify(req.body)}`);
    if (Object.keys(req.params).length && !excludeLogParams[req.originalUrl]) req.logger?.error(`Params: ${JSON.stringify(req.params)}`);
    return next(error);
  }
}
