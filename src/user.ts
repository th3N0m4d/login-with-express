import mongoose, {Schema, Document} from 'mongoose';

import * as service from './services';

const UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  firstName: String,
  lastName: String,
});

export interface User extends Document {
    username: string,
    password: string,
    createdAt: Date,
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
