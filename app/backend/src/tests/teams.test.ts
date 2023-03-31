import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import Team from '../database/models/TeamModel';
import { all } from './mocks/mockTeams';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testando model de Teams', () => {
  it('Testa se retorna todos os times', async () => {
    sinon.stub(Team, 'findAll')
    .resolves(all);

    const res: Response = await chai
    .request(app)
    .get('/teams');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(all);
  });
});
