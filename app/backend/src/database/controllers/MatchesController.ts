import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(private matchesService: MatchesService) {}

  allMatches = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { inProgress } = request.query;

      if (inProgress) {
        const b = (inProgress === 'true');
        const f = await this.matchesService.filterMatches(b);

        return response
          .status(200)
          .json(f);
      }

      const matches = await this.matchesService.allMatches();

      return response
        .status(200)
        .json(matches);
    } catch (error) {
      return response
        .status(500)
        .json(error);
    }
  };

  finish = async (request: Request, response: Response) => {
    const { id } = request.params;

    await this.matchesService.finish(Number(id));

    return response
      .status(200)
      .json({ message: 'Finished' });
  };

  up = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { homeTeamGoals, awayTeamGoals } = request.body;
    await this.matchesService.up(
      homeTeamGoals,
      awayTeamGoals,
      Number(id),
    );

    return response
      .status(200)
      .json({ message: 'updated' });
  };

  exist = async (homeTeamId: string, awayTeamId: string): Promise<boolean> => {
    const home = await this.matchesService.getId(Number(homeTeamId));

    const away = await this.matchesService.getId(Number(awayTeamId));

    if (!home || !away) {
      return true;
    }
    return false;
  };

  createMatch = async (request: Request, response: Response) => {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = request.body;

    const res = await this.matchesService.createMatch({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });

    const existTeam = await this.exist(homeTeamId, awayTeamId);

    if (existTeam) {
      return response
        .status(404)
        .json({ message: 'There is no team with such id!' });
    }

    return response
      .status(201)
      .json(res);
  };
}

export default MatchesController;
