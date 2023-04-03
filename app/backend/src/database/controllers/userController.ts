import { Request, Response } from 'express';
import token from '../auth/token';
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
        .json({ message: 'Email or password invalid' });
    }

    const tok = token.tokenGenerator({
      email,
      password,
    });

    return response
      .status(200)
      .json({ tok });
  };
}

export default UserController;
