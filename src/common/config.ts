import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_PORT_INSIDE_CONTAINER,
  POSTGRES_HOST
} = process.env;

export const CONFIG = {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE: AUTH_MODE === 'true',
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_PORT_INSIDE_CONTAINER,
  POSTGRES_HOST
};
