import InMatch from './interfaceMatches';
import InTeam from './interfaceTeam';

interface InStatsTeam {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
  matches?: InMatch[];
  team?: InTeam;
}

export default InStatsTeam;
