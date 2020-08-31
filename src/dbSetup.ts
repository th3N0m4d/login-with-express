import mongoose from 'mongoose';

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
    console.info(`Mongoose connected to ${__MONGO_URI__}`);
  });

  mongoose.connection.on('error', (err: any) => {
    console.error(err);
  });

  mongoose.connection.on('disconnected', () => {
    console.info('Mongoose disconnected');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose disconnected');
    process.exit(0);
  });
};
