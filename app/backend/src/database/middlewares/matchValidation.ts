import { Request, Response, NextFunction } from 'express';

const validationMatches = async (request: Request, response: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = request.body;

  if (homeTeamId === awayTeamId) {
    return response
      .status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

export default validationMatches;
