import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const SALT_FACTOR = 10;

const UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  displayName: String,
  bio: String,
});


export interface User extends Document {
    username: string,
    password: string,
    createdAt: Date,
    displayName: string,
    bio: string
}

export const saveUser = (user: User) => {

};

export const getUser = (user: User, users: User[]) => {

};

export const updateUser = (user: User) => {

};

/**
 * Compares a password against its hash and returns if it's a match
 * @param {string} password - Password to check
 * @param {string} hash - Hash to test against provided password
 * @return {Promise<boolean>} The result of the match
 */
export const checkPassword = async (password: string, hash: string)
: Promise<boolean> =>
  new Promise<boolean>((resolve, reject)=> {
    bcrypt.compare(password, hash, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });


const noop = () => undefined;

/**
 * Hashes password using BCrypt
 * @async
 * @param {string} password - The password to be hashed
 * @return {Promise<string>} The hashed password
 */
export const hashPassword = (password: string): Promise<string> =>
  new Promise<string>((resolve, reject)=> {
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      if (err) {
        reject(err);
        return;
      }

      bcrypt.hash(password, salt, noop, (err, hashPassword)=> {
        if (err) {
          reject(err);
        } else {
          resolve(hashPassword);
        }
      });
    });
  });


UserSchema.pre<User>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
});

export default mongoose.model<User>('User', UserSchema);
