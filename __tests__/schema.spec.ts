import mongoose, {Mongoose} from 'mongoose';
import UserSchema, {User} from '../src/user';

describe('Schema', () => {
  let connection: Mongoose;
  const {
    __MONGO_URI__ = '',
  } = process.env;

  beforeAll(async () => {
    connection = await mongoose.connect(`${__MONGO_URI__}/users`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    connection.disconnect();
  });

  afterEach(async ()=> {
    await mongoose.connection.db.dropCollection('users');
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
    expect(insertedUser?.displayName).toEqual(mockUser.displayName);
    expect(insertedUser?.password).toEqual(mockUser.password);
    expect(insertedUser?.createdAt).toEqual(mockUser.createdAt);
  });
});
