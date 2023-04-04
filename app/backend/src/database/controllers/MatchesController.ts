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
}

export default MatchesController;
