import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import Match from '../models/MatchesModel';
import tokenVerification from '../middlewares/tokenVerification';
import validationMatches from '../middlewares/matchValidation';

const route = Router();
const matchesService = new MatchesService(Match);
const matchesController = new MatchesController(matchesService);

route.get('/', matchesController.allMatches);
route.patch('/:id/finish', tokenVerification.tokenVerify, matchesController.finish);
route.patch('/:id', tokenVerification.tokenVerify, matchesController.up);
route.post('/', tokenVerification.tokenVerify, validationMatches, matchesController.createMatch);

export default route;
