import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/MatchesModel';
import User from '../database/models/userModel';
import { all } from './mocks/mockMatch.mock';
import { user } from './mocks/mockUsers.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testando model de Match', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Testa se retorna todas as partidas', async () => {
    sinon.stub(Match, 'findAll')
    .resolves(all);

    const res: Response = (await chai
      .request(app)
      .get('/matches'));

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.deep.equal(all);
  })

  it('Testa se retorna as partidas finalizadas', async () => {
    sinon.stub(Match, 'findAll')
    .resolves(all);

    const res: Response = (await chai
      .request(app)
      .get('/matches?inProgress=false'));

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.deep.equal([all[0]]);
  })

  it('Testa se uma partida é finalizada', async () => {
    sinon.stub(User, 'findOne')
    .resolves(user[0]);

    sinon.stub(Match, 'update')
    .resolves();

    const token: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'admin1' }));

    const res: Response = (await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', token.body.token)); 

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.deep.equal({ "message": "Finished" });
  })

  it('Testa se uma partida é atualizada', async () => {
    sinon.stub(User, 'findOne')
    .resolves(user[0]);

    sinon.stub(Match, 'update')
    .resolves();

    const token: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'admin1' }));

    const res: Response = (await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', token.body.token)
      .send({ "homeTeamGoals": 3, "awayTeamGoals": 1 }));

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.deep.equal({ "message": "updated" });
  })
})