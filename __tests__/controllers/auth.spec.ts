import httpMocks from 'node-mocks-http';

import ctrl from '../../src/controllers/auth';

describe('Auth', () => {
  describe('isAuthenticated', () => {
    it('should forward request when user is authenticated', () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        isAuthenticated: jest.fn().mockReturnValue(true),
      });

      const res = httpMocks.createResponse();

      res.redirect = jest.fn();

      const next = jest.fn();

      ctrl.isAuthenticated(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.redirect).not.toHaveBeenCalled();
    });

    it('should redirect request when user is not authenticated', () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        isAuthenticated: jest.fn().mockReturnValue(false),
      });

      const res = httpMocks.createResponse();

      res.redirect = jest.fn();

      const next = jest.fn();

      ctrl.isAuthenticated(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/login');
    });
  });

  it('should return login page', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    res.render = jest.fn();
    ctrl.index(req, res);

    expect(res.render).toHaveBeenLastCalledWith('partials/login');
  });


  it('should logout user', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    req.logOut = jest.fn();
    res.redirect = jest.fn();

    ctrl.logout(req, res);

    expect(req.logOut).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenLastCalledWith('/login');
  });
});
