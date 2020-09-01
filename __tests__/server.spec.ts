import supertest, {SuperTest, Test} from 'supertest';
import mongoose from 'mongoose';
import UserModel, {User} from '../src/user.model';
import {mocked} from 'ts-jest/utils';

import server from '../src/server';
import {findUser} from '../src/user.service';

jest.mock('../src/user.service');

describe('Server', () => {
  let app: SuperTest<Test>;
  const mockUser: User = new UserModel({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    password: '1234',
  });

  beforeAll(()=>{
    app = supertest(server);
  });

  afterAll(async ()=>{
    await mongoose.connection.close();
    await mongoose.connection.dropDatabase();
  });


  it('should create new user', (done) => {
    jest.spyOn(UserModel.prototype, 'save')
        .mockImplementationOnce(()=> Promise.resolve(mockUser));

    app.post('/register')
        .send(mockUser)
        .redirects(1)
        .end(done);
  });

  it('should login user', (done) => {
    mocked(findUser)
        .mockImplementationOnce(
            ()=> Promise.resolve(mockUser),
        );

    app.post('/login')
        .send({
          email: 'john.doe@email.com',
          password: '1234',
        })
        .redirects(1)
        .end(done);
  });
});
