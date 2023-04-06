import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderboardService';

class LeaderBoardController {
  constructor(private leaderboard: LeaderBoardService) {
    this.leaderboard = leaderboard;
  }

  home = async (request: Request, response: Response) => {
    const res = await this.leaderboard.homeMatchs();

    return response
      .status(200)
      .json(res);
  };
}

export default LeaderBoardController;
