import InMatch from '../interfaces/interfaceMatches';
import Match from '../models/MatchesModel';
import Team from '../models/TeamModel';
import InTeam from '../interfaces/interfaceTeam';

class MatchesService {
  constructor(
    private modelMatches = Match,
    private modelTeam = Team,
  ) {}

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

  // async finish(id: number): Promise<number> {
  //   const [affected] = await this.modelMatches.update(
  //     {
  //       inProgress: false,
  //     },
  //     {
  //       where: { id },
  //     },
  //   );

  //   return affected;
  // }

  async finish(id: number): Promise<void> {
    await this.modelMatches.update(
      {
        inProgress: false,
      },
      {
        where: { id },
      },
    );
  }

  // async up(id: number, homeTeam: number, awayTeam: number): Promise<number> {
  //   const [affected] = await this.modelMatches.update(
  //     {
  //       homeTeamGoals: homeTeam, awayTeamGoals: awayTeam,
  //     },
  //     {
  //       where: { id },
  //     },
  //   );

  //   return affected;
  // }

  async up(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void> {
    await this.modelMatches.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: { id },
      },
    );
  }

  async createMatch(match: InMatch): Promise<InMatch> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = match;

    const res = await this.modelMatches.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    });

    return res;
  }

  async getId(id: number): Promise<InTeam | null> {
    const res = await this.modelTeam.findByPk(id);

    return res;
  }
}

export default MatchesService;
