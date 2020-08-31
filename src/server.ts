import express, {Express, Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';

import routes from './routes';
import passport from 'passport';
import setupPassport from './setupPassport';
import setupDb from './dbSetup';

const server: Express = express();

// Set Express variables
server.set('port', process.env.PORT || 3000);

// User middlewares
const sessionSecret: string = process.env.COOKIE_SECRET || '';

server.use(morgan('dev'));
server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(cookieParser());
server.set('trust proxy', 1);
server.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: {secure: true},
}));
server.use(flash());

// PassportJs
server.use(passport.initialize());
server.use(passport.session());

setupPassport();

setupDb();

server.use(routes);

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  chalk.bgRed(err);
  next(err);
});

export default server;
