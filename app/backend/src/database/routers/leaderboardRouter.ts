import { Router } from 'express';
import LeaderBoardService from '../services/LeaderboardService';
import LeaderBoardController from '../controllers/LeaderboardController';
import Team from '../models/TeamModel';
import Match from '../models/MatchesModel';

const route = Router();
const serviceLeaderboard = new LeaderBoardService(Team, Match);
const controllerLeaderboard = new LeaderBoardController(serviceLeaderboard);

route.get('/home', controllerLeaderboard.home);

export default route;
