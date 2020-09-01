import * as service from '../src/user.service';

jest.mock('bcryptjs', ()=> ({
  __esModule: true,
  default: {
    genSalt: (rounds: number) => Promise.resolve(),
    hash: (pwd: string, salt: string) => Promise.resolve('FOOBAR'),
    compare: (pwd: string, hash: string) => Promise.resolve(true),
  },
}));

describe('Service', () => {
  it('should hash password', async () => {
    await expect(service.hashPassword('Foo')).resolves.toBe('FOOBAR');
  });

  it('should match hash against unhashed password', async () => {
    await expect(service.checkPassword('Foo', 'FOOBAR')).resolves.toBeTruthy();
  });
});
