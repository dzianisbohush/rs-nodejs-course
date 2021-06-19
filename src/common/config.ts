import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE
} = process.env;

export const CONFIG = {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE: AUTH_MODE === 'true'
};
