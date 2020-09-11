import mongoose from 'mongoose';
import chalk from 'chalk';

import config from './utils/config';

const log = console.log;

export default () => {
  mongoose.connect(`${config.mongoUri}/${config.mongoDb}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    log(chalk.magenta(`Mongoose connected to ${config.mongoUri}`));
  });

  mongoose.connection.on('error', (err: any) => {
    log(chalk.red(err));
  });

  mongoose.connection.on('disconnected', () => {
    log(chalk.yellow('Mongoose disconnected'));
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    log(chalk.yellow('Mongoose disconnected'));
    process.exit(0);
  });
};
