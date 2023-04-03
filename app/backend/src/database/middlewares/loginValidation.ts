import { Request, Response, NextFunction } from 'express';

const prop = async (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response
      .status(400)
      .json({ message: 'All fields must be filled' });
  }

  next();
};

export default prop;
