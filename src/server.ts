import express, {Express, Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import routes from './routes';
import passport from 'passport';
import setupPassport from './setupPassport';

const server: Express = express();

const {
  __MONGO_URI__ = '',
  __MONGO_DB_NAME__ = '',
} = process.env;

mongoose.connect(`${__MONGO_URI__}/${__MONGO_DB_NAME__}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set Express variables
server.set('port', process.env.PORT || 3000);

// User middlewares
const sessionSecret: string = process.env.COOKIE_SECRET || '';

server.use(morgan('dev'));
server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(cookieParser());
server.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
}));
server.use(flash());

// PassportJs
server.use(passport.initialize());
server.use(passport.session());

setupPassport();

server.use('/signup', routes);

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  next(err);
});

export default server;
