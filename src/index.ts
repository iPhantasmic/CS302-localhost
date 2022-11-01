import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
// import { Logger } from './lib/logger';
import { DataSource } from 'typeorm';

// logger = new Logger();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  ssl: true,
  entities: [__dirname + '/entities/**/*.{js,ts}'],
});

// AppDataSource.initialize()
//     .then(() => {
//       Logger.info("Data Source has been initialized!")
//     })
//     .catch((err) => {
//       logger.info("Error during Data Source initialization", err)
//     })

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export default AppDataSource;
