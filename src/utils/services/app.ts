import express, { Express } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
// Logger
import { loggingResponse } from '../../utils/middleware/logger/logger.middleware';
import { loggingUUID, setUUID } from '../../utils/middleware/logger/uuid';
import { logger } from '../../utils/services/winston';
import morgan from 'morgan';
// Graphql
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { resolvers } from '../../graphql/config/resolvers';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from '../../graphql/config/typedef';
import { ApolloServer } from '@apollo/server';
// DB
import postgresService from '../../db/config';

dotenv.config();

export const runApp = async () => {
  const app: Express = express();
  const port = +(process.env.PORT || '3000');
  postgresService.connectDB();

  const httpServer = http.createServer(app);

  addMiddleware(app);
  configGraphql(app, httpServer);

  httpServer.listen({ port }, () => {
    logger.info(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
}

const addMiddleware = (app: express.Express) => {
  app.use(helmet());
  app.use(setUUID);
  app.use(loggingUUID);
  app.use(loggingResponse);
  app.use(morgan(process.env.MORGAN_STRING as any, { stream: logger.stream as any }));
}

const configGraphql = async (app: express.Express, httpServer: http.Server) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });
  await server.start();
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
}