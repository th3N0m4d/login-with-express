import supertest, {SuperTest, Test} from 'supertest';
import {Server} from 'http';

import app from '../src/app';

describe('App', () => {
  let server: Server;
  let agent: SuperTest<Test>;

  beforeEach((done) => {
    server = app.listen();
    agent = supertest(server);
    done();
  });

  afterEach((done)=> {
    server.close();
    done();
  });

  it('should return 200', (done) => {
    agent
        .get('/')
        .expect(200)
        .end(done);
  });
});

