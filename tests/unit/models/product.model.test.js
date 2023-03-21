const connection = require("../../../src/db/connection");
const { expect } = require('chai');
const sinon = require('sinon');
const mock = require('../../mock/product.models')
const productModel = require('../../../src/models/product.model')

describe('Teste unitário para models de product', () => {
  before(() => sinon.stub(connection, 'execute')
    .onFirstCall().resolves(mock.findAll)
    .onSecondCall().resolves(mock.findById));

  it('Deve devolver todos os produtos do banco', async () => {
    const result = await productModel.findAll();

    expect(result).to.be.deep.equal(mock.findAll);
  })

  it('Deve devolver apenas o produto igual ao id passado', async () => {
    const result = await productModel.findById(1);

    expect(result).to.be.deep.equal(mock.findById);
  })

  after(() => sinon.restore());
})