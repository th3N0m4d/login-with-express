import {Request, Response} from 'express';

const index = (req: Request, res: Response) => res.render('home', req.user);

export default {
  index,
};
