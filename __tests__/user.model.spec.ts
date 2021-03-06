import mongoose from 'mongoose';
import UserModel, {User} from '../src/user.model';
import config from '../src/utils/config';

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(`${config.mongoUri}/modelDb`, {
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
    const mockUser: User = new UserModel({
      email: 'john.doe@email.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'FooBar',
    });

    await UserModel.create(mockUser);

    const insertedUser = await UserModel.findOne({email: 'john.doe@email.com'});

    expect(insertedUser?.email).toEqual(mockUser.email);
    expect(insertedUser?.password).toEqual(mockUser.password);
    expect(insertedUser?.firstName).toEqual(mockUser.firstName);
    expect(insertedUser?.lastName).toEqual(mockUser.lastName);
  });
});
