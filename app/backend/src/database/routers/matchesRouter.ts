import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import Match from '../models/MatchesModel';

const route = Router();
const matchesService = new MatchesService(Match);
const matchesController = new MatchesController(matchesService);

route.get('/', matchesController.allMatches);

export default route;
