import {Request, Response, NextFunction} from 'express';
import passport from 'passport';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};

const index = (req: Request, res: Response) => {
  res.render('partials/login');
};

const login = passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: false,
});

const logout = (req: Request, res: Response) => {
  req.logOut();
  res.redirect('/login');
};

export default {
  index,
  login,
  logout,
  isAuthenticated,
};
