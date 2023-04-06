import InStatsTeam from '../interfaces/interafaceStatsTeam';

function Order(res: InStatsTeam[], name: 'goalsFavor' | 'goalsBalance'
| 'totalVictories' | 'totalPoints'): InStatsTeam[] {
  return res.sort((res1, res2) => {
    if (res1[name] > res2[name]) {
      return -1;
    }

    if (res1[name] < res2[name]) {
      return 1;
    }

    return 0;
  });
}

export default Order;
