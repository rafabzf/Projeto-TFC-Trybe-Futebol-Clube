import { ModelStatic } from 'sequelize';
import Team from '../models/TeamModel';
import InTeam from '../interfaces/interfaceTeam';

class TeamService {
  constructor(private team: ModelStatic<Team>) {
    this.team = team;
  }

  async all(): Promise<Team[]> {
    const res = await this.team.findAll();
    return res;
  }

  async getId(id: number): Promise<InTeam | null> {
    const res = await this.team.findByPk(id);

    return res;
  }
}

export default TeamService;
