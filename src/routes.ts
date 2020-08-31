import {Router, Request, Response, NextFunction} from 'express';
import passport from 'passport';
import UserModel, {User} from './user.model';

const router: Router = Router();

router.get('/login', (req: Request, res: Response) => {
  return res.json('Hello world');
});

router.get('/', (req: Request, res: Response) => res.json('All good'));

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
    password,
    firstName,
    lastName,
  } = req.body;
  const newUser = new UserModel({
    email,
    password,
    firstName,
    lastName,
  });

  newUser.save((err: any, user: User)=> {
    if (err) {
      return next(err);
    }

    req.login(user, (err: any)=>{
      return res.redirect('/');
    });
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false,
}));

export = router
