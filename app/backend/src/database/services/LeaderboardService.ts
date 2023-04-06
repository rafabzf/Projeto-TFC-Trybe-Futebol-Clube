import { ModelStatic } from 'sequelize';
import Match from '../models/MatchesModel';
import Team from '../models/TeamModel';
import LeaderBoard from '../models/LearderboardModel';
import InStatsTeam from '../interfaces/interafaceStatsTeam';
import Order from '../middlewares/leaderboardO';

class LeaderBoardService {
  constructor(private team: ModelStatic<Team>, private match: ModelStatic<Match>) {
    this.team = team;
    this.match = match;
  }

  async homeMatchs(): Promise<InStatsTeam[]> {
    const t = await this.team.findAll();

    const m = await this.match.findAll();

    const res = t.map((te) => new LeaderBoard(te, m, 'homeTeamId'));

    const one = Order(res, 'goalsFavor');

    const two = Order(one, 'goalsBalance');

    const three = Order(two, 'totalVictories');

    const four = Order(three, 'totalPoints');

    return four;
  }
}

export default LeaderBoardService;
