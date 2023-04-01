import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';
import { app } from '../app';
import User from '../database/models/User';
import { usersAll } from './mocks/mockUsers.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a model teams', () => {
  it('Testa se todos os times são retornados', async () => {
    sinon.stub(User, 'findAll')
    .resolves(usersAll);

    const res: Response = await chai.request(app)
    .get('/login');

    expect(res.status).to.be.equal(200);

    expect(res.body).to.be.deep.equal(usersAll);
  })
})