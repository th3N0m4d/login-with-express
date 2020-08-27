import {Router, Request, Response, NextFunction} from 'express';
import UserModel, {User} from './user.model';
import passport from 'passport';

const router: Router = Router();

router.use((req: Request, res: Response, next: NextFunction)=> {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

router.post('/', (req: Request, res: Response, next: NextFunction)=> {
  const {
    email,
    password,
    firstName,
    lastName,
  } = req.body;

  UserModel.findOne({email}, async (err: any, user: User)=> {
    if (err) {
      return next(err);
    }

    if (user) {
      req.flash('error', 'User not found!');
      return res.redirect('/signup');
    }

    const newUser: User = new UserModel({
      email,
      password,
      firstName,
      lastName,
    });

    try {
      await newUser.save();
      return res.status(201).end('User created!');
    } catch (error) {
      return next(error);
    }
  });
  // }, passport.authenticate('login', {
  //   successRedirect: '/',
  //   failureRedirect: '/signup',
  //   failureFlash: true,
  // }));
});

export = router
