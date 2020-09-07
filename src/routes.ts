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

// PROFILE ==================================================

router.get('/profile',
    isAuthenticated,
    (req: Request, res: Response) => {
      const user = req.user;

      res.render('partials/profile', user);
    });

// LOGIN ====================================================

router.get('/login', (req: Request, res: Response) => {
  res.render('partials/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: false,
}));

router.get('/logout', (req: Request, res: Response) => {
  req.logOut();
  res.redirect('/login');
});

// REGISTER ================================================

router.get('/register', (req: Request, res: Response) => {
  res.render('partials/register');
});

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


// Home =====================================================

router.get('/', (req: Request, res: Response) => res.render('index'));

export = router
