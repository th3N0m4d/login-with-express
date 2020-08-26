import * as service from '../src/services';

jest.mock('bcrypt', ()=> ({
  __esModule: true,
  default: {
    genSalt: (rounds: number) => Promise.resolve(),
    hash: (pwd: string, salt: string) => Promise.resolve('FOOBAR'),
    compare: (pwd: string, hash: string) => Promise.resolve(true),
  },
}));

describe('Service', () => {
  it('should hash password', async () => {
    const hashedPassword = await service.hashPassword('Foo');

    expect(hashedPassword).toBe('FOOBAR');
  });

  it('should match hash against unhashed password', async () => {
    const isMatch = await service.checkPassword('Foo', 'FOOBAR');

    expect(isMatch).toBeTruthy();
  });
});
