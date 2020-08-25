import express, {Express, Request, Response} from 'express';
import morgan from 'morgan';

const app: Express = express();

app.use(morgan('dev'));

app.set('port', process.env.PORT || 3000);

app.use((req: Request, res: Response ) => res.json('Hello world!'));

app.listen(app.get('port'), ()=> console.log('Server is running'))
;
