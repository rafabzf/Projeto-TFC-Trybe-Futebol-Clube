import Match from "../../database/models/MatchesModel";

const all = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: true,
  }
] as Match[];

// const matchesProgress = [
//   {
//     "id": 41,
//     "homeTeamId": 16,
//     "homeTeamGoals": 2,
//     "awayTeamId": 9,
//     "awayTeamGoals": 0,
//     "inProgress": true,
//     "homeTeam": {
//       "teamName": "São Paulo"
//     },
//     "awayTeam": {
//       "teamName": "Internacional"
//     }
//   },
//   {
//     "id": 42,
//     "homeTeamId": 6,
//     "homeTeamGoals": 1,
//     "awayTeamId": 1,
//     "awayTeamGoals": 0,
//     "inProgress": true,
//     "homeTeam": {
//       "teamName": "Ferroviária"
//     },
//     "awayTeam": {
//       "teamName": "Avaí/Kindermann"
//     }
//   },
//   {
//     "id": 43,
//     "homeTeamId": 11,
//     "homeTeamGoals": 0,
//     "awayTeamId": 10,
//     "awayTeamGoals": 0,
//     "inProgress": true,
//     "homeTeam": {
//       "teamName": "Napoli-SC"
//     },
//     "awayTeam": {
//       "teamName": "Minas Brasília"
//     }
//   },
// ];

const matchesFinish = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 9,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Internacional"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  },
  {
    "id": 3,
    "homeTeamId": 4,
    "homeTeamGoals": 3,
    "awayTeamId": 11,
    "awayTeamGoals": 0,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "teamName": "Napoli-SC"
    }
  },
];

// const notFoundTeams = {
//   "homeTeamId": 999999,
//   "awayTeamId": 99999,
//   "homeTeamGoals": 3,
//   "awayTeamGoals": 1,
// }

// const equalTeams = {
//   "homeTeamId": 1,
//   "awayTeamId": 1,
//   "homeTeamGoals": 3,
//   "awayTeamGoals": 1,
// }

// const matchesCreate = {
//   "homeTeamId": 1,
//   "awayTeamId": 2,
//   "homeTeamGoals": 2,
//   "awayTeamGoals": 2,
// }

// const matchesNew = {
//   "id": 49,
//   "homeTeamId": 16,
//   "homeTeamGoals": 2,
//   "awayTeamId": 8,
//   "awayTeamGoals": 2,
//   "inProgress": true,
// }

// const patchMatch = {
//   "homeTeamGoals": 3,
//   "awayTeamGoals": 1
// }

export { 
  all,
  // matchesProgress,
  matchesFinish,
  // notFoundTeams,
  // equalTeams,
  // matchesCreate,
  // matchesNew,
  // patchMatch,
};