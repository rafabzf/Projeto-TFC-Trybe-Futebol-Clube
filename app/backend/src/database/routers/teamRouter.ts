import { Router } from 'express';
import Team from '../models/TeamModel';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const route = Router();
const serviceTeam = new TeamService(Team);
const controllerTeam = new TeamController(serviceTeam);

route.get('/', controllerTeam.all);
route.get('/:id', controllerTeam.getId);

export default route;
