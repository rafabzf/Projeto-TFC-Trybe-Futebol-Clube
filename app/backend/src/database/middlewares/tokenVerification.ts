import { Request, Response, NextFunction } from 'express';
import tokenAuth from '../auth/tokenAuth';

const tokenVerify = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const auth = request.header('Authorization');

    if (!auth) {
      return response
        .status(401)
        .json({ message: 'Token not found' });
    }

    const tok = tokenAuth.tokenVerification(auth);

    request.body.data = tok;

    next();
  } catch (error) {
    response
      .status(401)
      .json({ message: 'Token must be a valid token' });
  }
};

export default {
  tokenVerify,
};
