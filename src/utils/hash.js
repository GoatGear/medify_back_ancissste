import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 11;

const hash = async (text) => {
  try {
    return await bcrypt.hash(text, SALT_ROUNDS);
  } catch (error) {
    console.error("Error hashing text: ", error);
  }
};

const compare = async (text, hash) => {
  try {
    return await bcrypt.compare(text, hash);
  } catch (error) {
    console.error("Error comparing text: ", error);
  }
};

export const hashUtils = {
  hash,
  compare
};