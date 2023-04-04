import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import InLogin from '../interfaces/interfaceLogin';
import User from '../models/userModel';
import InUser from '../interfaces/interfaceUser';

class UserService {
  constructor(private user: ModelStatic<User>) {
    this.user = user;
  }

  async loginVerification(user: InLogin): Promise<InUser | null> {
    const { email, password } = user;

    const res = await this.user.findOne({
      where: { email },
    });

    if (!res || (password.length < 6)) {
      return null;
    }

    const comp = await bcrypt.compare(password, res.password);

    if (!comp) {
      return null;
    }

    return res;
  }
}

export default UserService;
