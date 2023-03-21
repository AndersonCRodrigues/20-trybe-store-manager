const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const productServive = require('../../../src/services/product.service');
const productModel = require('../../../src/models/product.model');
const mock = require('../../mock/product.models');


describe('Teste unitário para product service', () => {
  after(() => sinon.restore());

  it('deve devolver todos os produtos', async () => {
    sinon.stub(productModel, 'findAll').resolves(mock.findAll);

    const result = await productServive.findAll();

    expect(result).to.be.deep.equal(mock.findAll[0]);
  });

  it('deve devolver um produto de acordo com o i passado', async () => {
    sinon.stub(productModel, 'findById').resolves(mock.findById);

    const result = await productServive.findById(1);

    expect(result).to.be.deep.equal(mock.findById[0]);
  })
})