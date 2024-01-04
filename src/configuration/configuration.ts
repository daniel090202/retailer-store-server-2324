import { ConfigProps } from './configuration.interface';

const configuration = (): ConfigProps => ({
  port: parseInt(process.env.SERVER_PORT as string, 10) || 8080,
  api: {
    apiUrl: process.env.API_URL as string,
    httpTimeout: 1000,
  },
  mongodb: {
    database: {
      connectionString:
        process.env.MONGODB_CONNECTION_STRING ?? 'mongodb://localhost:27017',
      databaseName: process.env.NODE_ENV ?? 'local',
    },
  },
  baseUrl: process.env.BASE_URL as string,
});

export { configuration };
