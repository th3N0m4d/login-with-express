import {Router, Request, Response, NextFunction} from 'express';
import passport from 'passport';
import UserModel from './user.model';

const router: Router = Router();

// UTILS ===================================================

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};

// LOGIN ====================================================

router.get('/login', (req: Request, res: Response) => {
  return res.json('Hello world');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false,
}));

router.get('/logout', (req: Request, res: Response) => {
  req.logOut();
  res.redirect('/login');
});

// REGISTER ================================================

router.post('/register',
    async (req: Request, res: Response, next: NextFunction) => {
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

      try {
        const user = await newUser.save();

        req.login(user, ()=>{
          return res.redirect('/profile');
        });
      } catch (error) {
        return next(error);
      }
    });

// PROFILE ==================================================

router.get('/profile',
    isAuthenticated,
    (req: Request, res: Response) => res.json('All good'));

export = router
