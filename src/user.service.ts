import bcryptjs from 'bcryptjs';
import userModel from './user.model';

const SALT_FACTOR = 10;

/**
 * Compares a password against its hash and returns if it's a match
 * @param {string} password - Password to check
 * @param {string} hash - Hash to test against provided password
 * @return {Promise<boolean>} The result of the match
 */
const checkPassword = async (password: string, hash: string)
: Promise<boolean> => bcryptjs.compare(password, hash);


/**
 * Hashes password using bcryptjs
 * @async
 * @param {string} password - The password to be hashed
 * @return {Promise<string>} The hashed password
 */
const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcryptjs.genSalt(SALT_FACTOR);
    return bcryptjs.hash(password, salt);
  } catch (error) {
    return error;
  }
};

const findUser = async (conditions: any) => {
  try {
    const user = await userModel.findOne(conditions).exec();

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  hashPassword,
  checkPassword,
  findUser,
};
