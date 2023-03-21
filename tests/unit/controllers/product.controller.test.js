const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.use(chaiHttp);

const productServive = require('../../../src/services/product.service');
const productController = require('../../../src/controllers/products.controller')
const mock = require('../../mock/product.models');

describe('Teste unitário para product controller', () => {
  afterEach(() => sinon.restore());

  it('deve devolver todos os produtos', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productServive, 'findAll').resolves(mock.findAll[0]);

    await productController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.findAll[0]);
  })

  it('deve devolver apenas um produto', async () => {
    sinon.stub(productServive, 'findById').resolves(mock.findById[0]);

    const req = {
      params: { id: 1},
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.findById[0][0]);
  })
})