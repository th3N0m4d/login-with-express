import {hashPassword, checkPassword} from '../src/user';

jest.mock('bcrypt-nodejs', ()=> ({
  __esModule: true,
  default: {
    genSalt: (rounds: number, cb: Function) => cb(),
    hash: (pwd: string, salt: string, progressCb: Function, cb: Function) => {
      cb(null, 'FOOBAR');
    },
    compare: (pwd: string, hash: string, cb: Function) => {
      cb(null, true);
    },
  },
}));

describe('Schema', () => {
  it('should hash password', async () => {
    const hashedPassword = await hashPassword('Foo');

    expect(hashedPassword).toBe('FOOBAR');
  });

  it('should match hash against unhashed password', async () => {
    const isMatch = await checkPassword('Foo', 'FOOBAR');

    expect(isMatch).toBeTruthy();
  });
});
