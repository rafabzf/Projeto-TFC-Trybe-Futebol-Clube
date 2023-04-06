import { ModelStatic } from 'sequelize';
import Match from '../models/MatchesModel';
import Team from '../models/TeamModel';
import LeaderBoard from '../models/LearderboardModel';
import InStatsTeam from '../interfaces/interafaceStatsTeam';

class LeaderBoardService {
  constructor(private team: ModelStatic<Team>, private match: ModelStatic<Match>) {
    this.team = team;
    this.match = match;
  }

  async homeMatchs(): Promise<InStatsTeam[]> {
    const t = await this.team.findAll();

    const m = await this.match.findAll();

    return t.map((i) => new LeaderBoard(
      i,
      m,
      'homeTeamId',
    ));
  }
}

export default LeaderBoardService;
