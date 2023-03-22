const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.use(chaiHttp);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const mock = require('../../mock/sales');

describe('Testes unitários para sales Controller', () => {
  afterEach(() => sinon.restore());
  it('Deve devolver a lista com todas as sales', async () => {
    sinon.stub(salesService, 'findAll').resolves(mock.findAll);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.findAll);
  });

  it('Deve devolver a lista com todas as sales pelo id', async () => {
    sinon.stub(salesService, 'findById').resolves(mock.findById);

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.findById);
  });

  it('Deve devolver a lista com todas as sales criadas', async () => {
    sinon.stub(salesService, 'create').resolves(mock.create);

    const req = {
      body: [
        {
          productId: 1,
          quantity: 10,
        }
      ]
     };
    const res = {};
    const next = () => { };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.create(req, res, next);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mock.create);
  });

  it('deve devolver status 204 após apagar a sale', async () => {
    sinon.stub(salesService, 'salesDelete').resolves();

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.salesDelete(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Deve devolver a lista com todas as sales após update', async () => {
    sinon.stub(salesService, 'update').resolves(mock.create);

    const req = {
      body: [
        {
          productId: 1,
          quantity: 10,
        }
      ],
      params: { id: 1 },
    };

    const next = () => { };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.update(req, res, next);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.create);
  });
})