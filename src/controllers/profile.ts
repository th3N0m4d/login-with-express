import {Request, Response, NextFunction} from 'express';

import {User} from '../user.model';
import {save} from '../user.service';

const edit = (req: Request, res: Response) => {
  res.render('partials/edit');
};

const index = (req: Request, res: Response) => {
  res.render('partials/register');
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
    } = req.body;

    const user = <User>{
      email,
      password,
      firstName,
      lastName,
    };
    const newUser = await save(user);

    req.login(newUser, ()=>{
      return res.redirect('/profile');
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  edit,
  create,
  index,
};
