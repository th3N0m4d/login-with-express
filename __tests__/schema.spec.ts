import {hashPassword} from '../src/user';

jest.mock('bcrypt-nodejs', ()=> ({
  __esModule: true,
  default: {
    genSalt: (rounds: number, cb: Function) => cb(),
    hash: (pwd: string, salt: string, progressCb: Function, cb: Function) => {
      cb(null, 'FOOBAR');
    },
  },
}));

describe('Schema', () => {
  it('should hash password', async () => {
    const hashedPassword = await hashPassword('Foo');

    expect(hashedPassword).toBe('FOOBAR');
  });
});
