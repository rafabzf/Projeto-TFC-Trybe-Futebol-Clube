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

  finish = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { id } = request.params;

      await this.matchesService.finish(Number(id));

      return response
        .status(200)
        .json({ message: 'Finished' });
    } catch (error) {
      return response
        .status(500)
        .json(error);
    }
  };

  up = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { id } = request.params;
      const { homeTeamGoals, awayTeamGoals } = request.body;

      await this.matchesService.up(Number(id), homeTeamGoals, awayTeamGoals);

      return response
        .status(200)
        .json({ message: 'Updated' });
    } catch (error) {
      return response
        .status(500)
        .json(error);
    }
  };
}

export default MatchesController;
