import InMatch from '../interfaces/interfaceMatches';
import Match from '../models/MatchesModel';
import Team from '../models/TeamModel';

class MatchesService {
  constructor(private modelMatches = Match) {}

  async allMatches(): Promise<InMatch[]> {
    return this.modelMatches.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        { model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
  }

  async filterMatches(matchProgress: boolean): Promise<InMatch[]> {
    return this.allMatches().then((matches) => matches.filter(
      (match) => match.inProgress === matchProgress,
    ));
  }

  async finish(id: number): Promise<number> {
    const [affected] = await this.modelMatches.update(
      {
        inProgress: false,
      },
      {
        where: { id },
      },
    );

    return affected;
  }

  async up(id: number, homeTeam: number, awayTeam: number): Promise<number> {
    const [affected] = await this.modelMatches.update(
      {
        homeTeamGoals: homeTeam, awayTeamGoals: awayTeam,
      },
      {
        where: { id },
      },
    );

    return affected;
  }
}

export default MatchesService;
