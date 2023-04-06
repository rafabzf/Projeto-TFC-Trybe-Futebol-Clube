import InMatch from '../interfaces/interfaceMatches';
import InTeam from '../interfaces/interfaceTeam';
import InStatsTeam from '../interfaces/interafaceStatsTeam';

class LeaderBoard implements InStatsTeam {
  name: string;
  totalGames: number;
  totalPoints: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  team: InTeam;
  matches: InMatch[];
  typeTeam: 'homeTeamId';

  constructor(Team: InTeam, Matches: InMatch[], typeTeam: 'homeTeamId') {
    this.team = Team;
    this.typeTeam = typeTeam;
    this.name = Team.teamName;
    this.matches = Matches;
    this.totalVictories = this.victories();
    this.totalLosses = this.losses();
    this.totalDraws = this.draws();
    this.totalPoints = this.points();
    this.goalsFavor = this.favor();
    this.goalsOwn = this.own();
    this.totalGames = this.games();
  }

  victories(): number {
    const victoriesTotal = this.matches.reduce((acc, cur) => {
      if (cur[this.typeTeam] === this.team.id && !cur.inProgress
        && cur.homeTeamGoals > cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return victoriesTotal;
  }

  losses(): number {
    const lossesTotal = this.matches.reduce((acc, cur) => {
      if (cur[this.typeTeam] === this.team.id && !cur.inProgress
        && cur.homeTeamGoals < cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return lossesTotal;
  }

  draws(): number {
    const drawsTotal = this.matches.reduce((acc, cur) => {
      if (cur[this.typeTeam] === this.team.id && !cur.inProgress
        && cur.homeTeamGoals === cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return drawsTotal;
  }

  points(): number {
    const total = this.totalDraws + (this.totalVictories * 3);

    return total;
  }

  favor(): number {
    const favorGoalsTotal = this.matches.reduce((acc, cur) => {
      if (cur[this.typeTeam] === this.team.id && !cur.inProgress) {
        return acc + cur.homeTeamGoals;
      }
      return acc;
    }, 0);

    return favorGoalsTotal;
  }

  own(): number {
    const ownGoalsTotal = this.matches.reduce((acc, cur) => {
      if (cur[this.typeTeam] === this.team.id && !cur.inProgress) {
        return acc + cur.awayTeamGoals;
      }
      return acc;
    }, 0);

    return ownGoalsTotal;
  }

  games(): number {
    const gamesTotal = this.totalDraws + this.totalLosses + this.totalVictories;

    return gamesTotal;
  }
}

export default LeaderBoard;
