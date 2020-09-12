import httpMocks from 'node-mocks-http';
import {Request, Response} from 'express';

import ctrl from '../../src/controllers/profile';

import mockUser from '../../mocks/user';

jest.mock('../../src/user.service', () => ({
  save: (user: object) =>
    user ?
    Promise.resolve(user) :
    Promise.reject(new Error()),
}));

describe('Profile', () => {
  let req: Request;
  let res: Response;

  beforeAll(()=> {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  it('should render edit page', () => {
    res.render = jest.fn();

    ctrl.edit(req, res);

    expect(res.render).toHaveBeenLastCalledWith('partials/edit');
  });

  it('should render index page', () => {
    res.render = jest.fn();

    ctrl.index(req, res);

    expect(res.render).toHaveBeenLastCalledWith('partials/register');
  });

  it('should create new profile', async () => {
    req.body = mockUser;

    const next = jest.fn();

    req.login = jest.fn();
    res.redirect = jest.fn();

    await ctrl.create(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(req.login).toHaveBeenCalled();
  });

  it('should not create new profile', async () => {
    const next = jest.fn();

    req.body = null;
    req.login = jest.fn();
    res.redirect = jest.fn();

    await ctrl.create(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.login).not.toHaveBeenCalled();
  });
});
