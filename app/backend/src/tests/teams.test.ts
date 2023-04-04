import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';
import { app } from '../app';
import Team from '../database/models/TeamModel';
import { all } from './mocks/mockTeams.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testando model de Teams', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Testa se retorna todos os times', async () => {
    sinon.stub(Team, 'findAll')
    .resolves(all);

    const res: Response = await chai
    .request(app)
    .get('/teams');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(all);
  });

  
  it('Testa se retorna o time pelo id', async () => {
    sinon.stub(Team, 'findByPk')
    .resolves(all[0]);

    const res: Response = await chai
    .request(app)
    .get('/teams/1');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(all[0]);
  });
});
