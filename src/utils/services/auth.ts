import bcrypt from 'bcrypt';

export const generatePassword = (password: string) => {
  return bcrypt.hash(password, 10);
}

export const comparePassword = (password: string, encryptedPassword: string) => {
  return bcrypt.compare(password, encryptedPassword);
}
