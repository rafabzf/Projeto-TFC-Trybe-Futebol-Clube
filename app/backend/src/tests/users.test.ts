import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';
import { app } from '../app';
import User from '../database/models/userModel';
import { user } from './mocks/mockUsers.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a model users', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Testa se retorna o token', async () => {
    sinon.stub(User, 'findOne')
    .resolves(user[0]);

    const res: Response = (await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'admin' }));

    expect(res.status).to.be.equal(200);

    expect(res.body.token).to.be.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
  })

  it('Testa se retorna um erro quando falta credenciais', async () => {
    const res: Response = (await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com' }));

    expect(res.status).to.be.equal(400);

    expect(res.body).to.be.deep.equal({ message: 'All fields must be filled' });
  })

  it('Testa se retorna um erro quando a senha é inválida', async () => {
    sinon.stub(User, 'findOne')
    .resolves(user[0]);

    const res: Response = (await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'administrador' }));

    expect(res.status).to.be.equal(401);

    expect(res.body).to.be.deep.equal({ message: 'Email or password invalid' });
  })

  it('Testa se retorna um erro quando o email é inválido', async () => {
    sinon.stub(User, 'findOne')
    .resolves(user[0]);

    const res: Response = (await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'administrador' }));

    expect(res.status).to.be.equal(401);

    expect(res.body).to.be.deep.equal({ message: 'Email or password invalid' });
  })
})