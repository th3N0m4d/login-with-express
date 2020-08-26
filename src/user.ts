import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';

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
: Promise<boolean> => bcrypt.compare(password, hash);


/**
 * Hashes password using BCrypt
 * @async
 * @param {string} password - The password to be hashed
 * @return {Promise<string>} The hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    return bcrypt.hash(password, salt);
  } catch (error) {
    return error;
  }
};


UserSchema.pre<User>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
});

export default mongoose.model<User>('User', UserSchema);
