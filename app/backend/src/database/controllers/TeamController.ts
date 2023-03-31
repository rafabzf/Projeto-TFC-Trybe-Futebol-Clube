import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  constructor(private team: TeamService) { }

  // all = async (request: Request, response: Response) => {
  //   try {
  //     const res = await this.team.all();
  //     return response
  //       .status(200)
  //       .json(res);
  //   } catch (error) {
  //     return response
  //       .status(500)
  //       .json(error);
  //   }
  // };

  all = async (_request: Request, response: Response) => {
    const res = await this.team.all();

    return response
      .status(200)
      .json(res);
  };

  getId = async (request: Request, response: Response) => {
    const { id } = request.params;

    const res = await this.team.getId(Number(id));

    return response
      .status(200)
      .json(res);
  };
}

export default TeamController;
