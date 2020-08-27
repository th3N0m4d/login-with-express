import express, {Express, Request, Response} from 'express';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const app: Express = express();

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
app.set('port', process.env.PORT || 3000);

// User middlewares
const sessionSecret: string = process.env.COOKIE_SECRET || '';

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());

app.use((req: Request, res: Response ) => res.json('Hello world!'));

export default app;
