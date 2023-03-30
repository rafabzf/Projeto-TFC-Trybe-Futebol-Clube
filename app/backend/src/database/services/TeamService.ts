import { ModelStatic } from 'sequelize';
import Team from '../models/TeamModel';

class TeamService {
  constructor(private team: ModelStatic<Team>) {
    this.team = team;
  }

  async all(): Promise<Team[]> {
    const res = await this.team.findAll();
    return res;
  }
}

export default TeamService;
