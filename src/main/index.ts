
import "module-alias/register";
import dotenv from 'dotenv';
dotenv.config();
import app from '@voosh/main/app';
import { PORT } from '@voosh/main/config';
import http from "http";
import logger from "@voosh/lib/winston";
import prisma from "@voosh/lib/prisma"

const server = http.createServer(app);



const start = async (): Promise<void> => {
  try {

    await prisma.$connect();
    server.listen(PORT, () => logger.info(`Server is running on port http://localhost:${PORT}...`));

  } catch (error: any) {
    throw new Error("Unable to connect to db")
  }
};

start()
  .catch(async (err) => {
    await prisma.$disconnect();
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });