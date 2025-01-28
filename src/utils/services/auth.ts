import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../db/model/user';
import { Customer } from '../../db/model/customer';

export const generatePassword = (password: string) => {
  return bcrypt.hash(password, 10);
}

export const comparePassword = (password: string, encryptedPassword: string) => {
  return bcrypt.compare(password, encryptedPassword);
}

export const signJWTSession = (user: Partial<User> | Partial<Customer>) => {
  const { id, email, name, lastName } = user;
  const expirationTime = +(process.env.LOGIN_EXP_TIME_HOURS || 8)
  const expirationHours = `${expirationTime}h`;
  const token = jwt.sign({ id, email, name, lastName }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: expirationHours,
  } as jwt.SignOptions);
  return {
    user,
    token,
    expireIn: 3600000 * expirationTime // expireIn MS
  }
}
