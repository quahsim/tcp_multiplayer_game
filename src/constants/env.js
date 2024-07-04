import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT||5555;
export const HOST = process.env.HOST||"0.0.0.0";
export const CLIENT_VERSION = process.env.CLIENT_VERSION;