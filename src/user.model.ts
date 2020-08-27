import mongoose, {Schema, Document} from 'mongoose';

import * as service from './services';

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: String,
  lastName: String,
});

export interface User extends Document {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
}

UserSchema.pre<User>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await service.hashPassword(this.password);
  }
  next();
});

export default mongoose.model<User>('User', UserSchema);
