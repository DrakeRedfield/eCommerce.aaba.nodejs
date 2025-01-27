import { logger } from "./winston";

export const errorLoggerHandler = (e: any) => {
  if (typeof e === 'string') {
    logger.error(e);
  }
  if (e instanceof Error) {
    logger.error(e.message);
    logger.error(e.stack);
  }
};
