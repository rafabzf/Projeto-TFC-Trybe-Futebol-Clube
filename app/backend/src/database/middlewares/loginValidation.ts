import { Request, Response, NextFunction } from 'express';

const prop = async (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response
      .status(400)
      .json({ message: 'All fields must be filled' });
  }

  if (!(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi))) {
    return response
      .status(401)
      .json({ message: 'Invalid email or password' });
  }

  next();
};

export default prop;
