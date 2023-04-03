import { sign, verify } from 'jsonwebtoken';
import InLogin from '../interfaces/interfaceLogin';

const secret = process.env.JWT_SECRET || 'secret';

const tokenGenerator = (login: InLogin) => {
  const token = sign(login, secret, { expiresIn: '15min', algorithm: 'HS256' });
  return token;
};

const tokenVerification = (token: string) => verify(
  token,
  secret,
);

export default {
  tokenGenerator,
  tokenVerification,
};
