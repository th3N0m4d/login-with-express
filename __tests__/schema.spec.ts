import mongoose from 'mongoose';
import UserSchema, {User} from '../src/user';

describe('Schema', () => {
  const {
    __MONGO_URI__ = '',
  } = process.env;

  beforeAll(async () => {
    await mongoose.connect(`${__MONGO_URI__}/schemaDb`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.connection.dropDatabase();
  });

  afterEach(async ()=> {
    await mongoose.connection.collection('users').drop();
  });

  it('should insert a doc into collection', async () => {
    const mockUser: User = new UserSchema({
      username: 'john.doe',
      displayName: 'John Doe',
      password: 'FooBar',
      createdAt: new Date(),
    });

    await UserSchema.create(mockUser);

    const insertedUser = await UserSchema.findOne({username: 'john.doe'});

    expect(insertedUser?.username).toEqual(mockUser.username);
    expect(insertedUser?.password).toEqual(mockUser.password);
    expect(insertedUser?.createdAt).toEqual(mockUser.createdAt);
  });
});
