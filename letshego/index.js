import express from 'express';
import chalk from "chalk";
import path from 'path';
import morgan from 'morgan';
import { config } from 'dotenv';
config();

const app = express();
const { debug } = console;

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  return res.status(500).send('<h3> Internal Server Error </h3>');
});

app.use('*', (req, res) => {
  res.send('<h3> Route not found! </h3>');
});

/**
 * @name normalizePort Function to normalize port
 * @param {string | number} val
 * @return {* | number} The normalized port
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }
  return port >= 0 ? port : false;
};

const PORT = normalizePort(process.env.PORT || 5000);

app.listen(PORT, () => {
  debug(`Listening on port ${chalk.blue(PORT)}`);
});

export default app;
