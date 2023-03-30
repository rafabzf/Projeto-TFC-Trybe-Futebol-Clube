import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  constructor(private team: TeamService) { }

  all = async (request: Request, response: Response) => {
    try {
      const res = await this.team.all();
      return response
        .status(200)
        .json(res);
    } catch (error) {
      return response
        .status(500)
        .json(error);
    }
  };
}

export default TeamController;
