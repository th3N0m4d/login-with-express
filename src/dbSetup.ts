import mongoose from 'mongoose';
import chalk from 'chalk';

const log = console.log;

export default () => {
  const {
    __MONGO_URI__ = '',
    __MONGO_DB_NAME__ = '',
  } = process.env;

  mongoose.connect(`${__MONGO_URI__}/${__MONGO_DB_NAME__}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    log(chalk.magenta(`Mongoose connected to ${__MONGO_URI__}`));
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
