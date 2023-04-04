import User from "../../database/models/userModel";

const user = [
  {
    "id": 1,
    "username": 'Admin',
    "role": 'admin',
    "email": 'admin@admin.com',
    "password": '$2a$12$cgWkWKpTMGefUa5s2XP0g.g.wgrjh2BnNcDd8sR/sgk7AiaNpsLPy',
  },
] as User[];

export {
  user,
};