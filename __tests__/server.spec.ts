import supertest, {SuperTest, Test} from 'supertest';
import mongoose from 'mongoose';

import server from '../src/server';

describe('Server', () => {
  let app: SuperTest<Test>;

  beforeAll(()=>{
    app = supertest(server);
  });

  afterAll(async ()=>{
    await mongoose.connection.close();
    await mongoose.connection.dropDatabase();
  });

  afterEach(async ()=>{
    await mongoose.connection.collection('users').drop();
  });

  it('should create new user', (done) => {
    app.post('/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          password: '1234',
        })
        .redirects(1)
        .end(done);
  });
});
