import { Request, Response } from 'express';
import tokenAuth from '../auth/tokenAuth';
import UserService from '../services/userService';

class UserController {
  constructor(private user: UserService) { }

  loginVerification = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const res = await this.user.loginVerification({
      email,
      password,
    });

    if (!res) {
      return response
        .status(401)
        .json({ message: 'Invalid email or password' });
    }

    const token = tokenAuth.tokenGenerator({
      email,
      password,
      role: res.role,
    });

    return response
      .status(200)
      .json({ token });
  };

  tokenRole = async (request: Request, response: Response) => {
    const u = request.body.data;

    response
      .status(200)
      .json(u);
  };
}

export default UserController;
