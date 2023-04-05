import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
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
    .send({ email: 'admin@admin.com', password: 'admin1' }));

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

    expect(res.body).to.be.deep.equal({ message: 'Invalid email or password' });
  })

  it('Testa se retorna um erro quando o email é inválido', async () => {
    sinon.stub(User, 'findOne')
    .resolves(user[0]);

    const res: Response = (await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'administrador' }));

    expect(res.status).to.be.equal(401);

    expect(res.body).to.be.deep.equal({ message: 'Invalid email or password' });
  })

  it('Testa se retorna um erro quando o email está incorreto', async () => {
    sinon.stub(User, 'findOne')
    .resolves(null);

    const res: Response = (await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'admni' }));

    expect(res.status).to.be.equal(401);

    expect(res.body).to.be.deep.equal({ message: 'Invalid email or password' });
  })

  it('Testa se retorna a role', async () => {
    sinon.stub(User, 'findOne')
    .resolves(user[0]);

    const token: Response = (await chai.request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'admin1' }));

    const res: Response = (await chai.request(app)
    .get('/login/role')
    .set('Authorization', token.body.token));

    expect(res.status).to.be.equal(200);

    expect(res.body).to.be.deep.equal({ role: 'admin' });
  })

  it('Testa se retorna um erro quando o token for inválido', async () => {
    const res: Response = (await chai.request(app)
    .get('/login/role')
    .set('Authorization', '1234'));

    expect(res.status).to.be.equal(401);

    expect(res.body).to.be.deep.equal({ message: 'Token must be a valid token' });
  })

  it('Testa se retorna um erro quando o token não for encontrado', async () => {
    const res: Response = (await chai.request(app)
    .get('/login/role'));

    expect(res.status).to.be.equal(401);

    expect(res.body).to.be.deep.equal({ message: 'Token not found' });
  })
})