const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const productServive = require('../../../src/services/product.service');
const productModel = require('../../../src/models/product.model');
const mock = require('../../mock/product.models');


describe('Teste unitário para product service', () => {
  before(() => sinon.stub(productModel, 'findById')
    .onFirstCall().resolves(mock.findById)
    .onSecondCall().resolves([[]]))

  after(() => sinon.restore());

  it('deve devolver todos os produtos', async () => {
    sinon.stub(productModel, 'findAll').resolves(mock.findAll);

    const result = await productServive.findAll();

    expect(result).to.be.deep.equal(mock.findAll[0]);
  });

  it('deve devolver um produto de acordo com o id passado', async () => {


    const result = await productServive.findById(1);

    expect(result).to.be.deep.equal(mock.findById[0]);
  });

  /* it('deve retornar um erro ao não encontrar o usuário', async () => {

    const notFound = { status: 404, message: 'Product not found' };

    const result = await productServive.findById(999);

    expect(result).throws(notFound.message);
  }); */
})