import express, {Express, Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import exphbs from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import connectMongo from 'connect-mongo';

import routes from './routes';
import passport from 'passport';
import setupPassport from './setupPassport';
import setupDb from './dbSetup';
import config from './utils/config';

const server: Express = express();
const viewsPath: string = path.resolve(__dirname, '../views');
const MongoStore = connectMongo(session);
const store = new MongoStore({
  url: config.mongoUri,
  collection: 'users',
});

server.use(express.static(path.resolve(__dirname, '../dist')));

// Set Express variables
server.set('port', config.port || 3000);

// User middlewares
server.use(morgan('dev'));
server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(cookieParser());
server.use(flash());

server.use(session({
  secret: 'secrettexthere',
  saveUninitialized: true,
  resave: true,
  store,
}));

// View Engine
server.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: `${viewsPath}/layouts`,
  partialsDir: `${viewsPath}/partials`,
}));
server.set('view engine', '.hbs');
server.set('views', viewsPath);

// PassportJs
server.use(passport.initialize());
server.use(passport.session());

setupPassport();

setupDb();

server.use(routes);

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(chalk.bgRed(err));
  next(err);
});

export default server;
