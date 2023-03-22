const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const productServive = require('../../../src/services/product.service');
const productModel = require('../../../src/models/product.model');
const mock = require('../../mock/product.models');


describe('Teste unitário para product service', () => {
  afterEach(() => sinon.restore());

  it('deve devolver todos os produtos', async () => {
    sinon.stub(productModel, 'findAll').resolves(mock.findAll);

    const result = await productServive.findAll();

    expect(result).to.be.deep.equal(mock.findAll[0]);
  });

  it('deve devolver um produto de acordo com o id passado', async () => {
    sinon.stub(productModel, 'findById').resolves(mock.findById)

    const result = await productServive.findById(1);

    expect(result).to.be.deep.equal(mock.findById[0]);
  });

/*   it('deve retornar um erro ao não encontrar o usuário', async () => {
    sinon.stub(productModel, 'findById').resolves([[]])

    const notFound = { status: 404, message: 'Product not found' };

    const result = await productServive.findById(999);

    expect(result).to.be.rejectedWith();
  }); */

  it('Deve devolver o produto cadastrado com ID', async () => {
    sinon.stub(productModel, 'create').resolves(mock.create);
    const expected = {
      id: 1,
      name: 'produto'
    };

    const result = await productServive.create('produto')
    expect(result).to.be.deep.equal(expected);
  })

  it('Deve devolver o producto no as informações do update', async () => {
    sinon.stub(productServive, 'findAll').resolves();
    sinon.stub(productModel, 'update').resolves();

    const expected = {
      id: 1,
      name: 'produto'
    };

    const result = await productServive.update(1, 'produto');

    expect(result).to.be.deep.equal(expected);
  })


  it('Deve devolver as linhas afetadas após o DELETE', async () => {
    sinon.stub(productServive, 'findAll').resolves();
    sinon.stub(productModel, 'prodDelete').resolves(mock.uptade);

    const result = await productServive.prodDelete(1);

    expect(result[0].affectedRows).to.be.equal(1);
  })
})