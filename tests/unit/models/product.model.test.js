const connection = require("../../../src/db/connection");
const { expect } = require('chai');
const sinon = require('sinon');
const mock = require('../../mock/product.models')
const productModel = require('../../../src/models/product.model')

describe('Teste unitário para models de product método GET', () => {
    afterEach(() => sinon.restore());
  it('Deve devolver todos os produtos do banco', async () => {
    sinon.stub(connection, 'execute').resolves(mock.findAll);
    const result = await productModel.findAll();

    expect(result).to.be.deep.equal(mock.findAll);
  })

  it('Deve devolver apenas o produto igual ao id passado', async () => {
     sinon.stub(connection, 'execute').resolves(mock.findById);
    const result = await productModel.findById(1);

    expect(result).to.be.deep.equal(mock.findById);
  })
})

describe('Testes unitários para models de products método POST', () => {
  afterEach(() => sinon.restore());
  it('Deve devolver o id do produto cadastrado após se conectar com o banco', async () => {
    sinon.stub(connection, 'execute').resolves(mock.create);

    const result = await productModel.create('name');

    expect(result[0].insertId).to.be.equal(1);
  })
})

describe('Testes unitários para models de products método PUT', () => {
  afterEach(() => sinon.restore());
  it('Deve devolver o número de linha afetadas após o update', async () => {
    sinon.stub(connection, 'execute').resolves(mock.uptade);

    const result = await productModel.update(1, 'name');
    expect(result[0].affectedRows).to.be.equal(1);
  })
})

describe('Testes unitários para models de products método DELETE', () => {
  afterEach(() => sinon.restore());
  it('Deve devolver o número de linha afetadas após o update', async () => {
    sinon.stub(connection, 'execute').resolves(mock.uptade);

    const result = await productModel.prodDelete(1);
    expect(result[0].affectedRows).to.be.equal(1);
  })
})