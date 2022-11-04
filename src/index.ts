import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import app from './Server';
import logger from './shared/Logger';
import Stripe from 'stripe';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  ssl: false,
  entities: [__dirname + '/api/models/**/*.{js,ts}'],
});

AppDataSource.initialize()
    .then(() => {
      logger.info("Data Source has been initialized!")
    })
    .catch((err) => {
      logger.info("Error during Data Source initialization", err)
    })

const port = Number(process.env.PORT || 3000);

const stripe = new Stripe(process.env.STRIPE_API_KEY, {apiVersion: '2022-08-01'});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export { AppDataSource, stripe };
