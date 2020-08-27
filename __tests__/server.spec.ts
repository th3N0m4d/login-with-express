import supertest, {SuperTest, Test} from 'supertest';
import mongoose from 'mongoose';

import server from '../src/server';

describe('Server', () => {
  let app: SuperTest<Test>;

  beforeAll(async () => {
    app = supertest(server);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.connection.dropDatabase();
  });

  // afterEach(async ()=> {
  //   await mongoose.connection.collection('users').drop();
  // });

  it('should return 200', (done) => {
    app.get('/')
        .expect(200)
        .end(done);
  });
});

