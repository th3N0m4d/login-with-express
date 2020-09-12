import httpMocks from 'node-mocks-http';
import {Request, Response} from 'express';

import ctrl from '../../src/controllers/home';

import mockUser from '../../mocks/user';

describe('Controllers', () => {
  describe('Home', () => {
    it('should render home page', () => {
      const req: Request = httpMocks.createRequest();
      const res: Response = httpMocks.createResponse();

      req.user = mockUser;
      res.render = jest.fn();

      ctrl.index(req, res);

      expect(res.render).toHaveBeenCalledWith('home', req.user);
    });
  });
});
