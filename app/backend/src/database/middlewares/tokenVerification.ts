import { Request, Response, NextFunction } from 'express';
import tokenAuth from '../auth/tokenAuth';

const tokenVerify = async (request: Request, response: Response, next: NextFunction) => {
  const auth = request.header('Authorization');

  if (!auth) {
    return response
      .status(401)
      .json({ message: 'Token not found' });
  }

  const tok = tokenAuth.tokenVerification(auth);

  request.body.data = tok;

  next();
};

export default {
  tokenVerify,
};
