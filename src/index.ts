import express, { Express } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
// DB
import postgresService from './db/config'
// Logger
import { loggingUUID, setUUID } from './utils/middleware/logger/uuid';
import { loggingResponse } from './utils/middleware/logger/logger.middleware';
import morgan from 'morgan';
import { logger } from './utils/services/winston';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// App Configuration
app.use(helmet());

// Inyect and log UUID v4 
app.use(setUUID);
app.use(loggingUUID);
app.use(loggingResponse);
app.use(morgan(process.env.MORGAN_STRING as any, { stream: logger.stream as any }));

// DB
postgresService.connectDB();

app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at https://localhost:${port}`);
});