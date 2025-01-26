import { Request, Response } from "express";

export interface IRequest extends Request {
  uuid?: string;
  logger?: ILogger;
  winston?: ILogger;
}

export interface IResponse extends Response {
}

interface ILogger {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  debug: (message: string) => void;
}