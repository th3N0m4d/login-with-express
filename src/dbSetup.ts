import mongoose from 'mongoose';
import chalk from 'chalk';

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
    chalk.bgGreen(`Mongoose connected to ${__MONGO_URI__}`);
  });

  mongoose.connection.on('error', (err: any) => {
    chalk.bgRed(err);
  });

  mongoose.connection.on('disconnected', () => {
    chalk.bgYellow('Mongoose disconnected');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    chalk.whiteBright('Mongoose disconnected');
    process.exit(0);
  });
};
