const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const mock = require('../../mock/sales');
const salesService = require('../../../src/services/sales.service');
const productService = require('../../../src/services/product.service');
const salesModel = require('../../../src/models/sales.model');

chai.use(sinonChai);

describe('Testes unitários para sales service', () => {
  afterEach(() => sinon.restore());
  it('Deve devolver a lista de todas as vendas', async () => {
    sinon.stub(salesModel, 'findAll').resolves(mock.findAll);

    const result = await salesService.findAll();

    expect(result).to.be.deep.equal(mock.findAll)
  })

  it('Deve devolver a lista das vendas igaul ao ID', async () => {
    sinon.stub(salesModel, 'findById').resolves(mock.findById);

    const result = await salesService.findById(1);

    expect(result).to.be.deep.equal(mock.findById)
  })

  it('Deve devolver a sales criada com ID', async () => {
    sinon.stub(salesModel, 'createSale').resolves(1);
    sinon.stub(productService, 'findById').resolves();

    const expected = {
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 10
        }
      ]
    };

    const result = await salesService.create([{productId: 1, quantity: 10}]);

    expect(result).to.be.deep.equal(expected)
  })

  it('Deve devolver o número de linhas afetadas', async () => {
    sinon.stub(salesModel, 'salesDelete').resolves(1);
    sinon.stub(salesService, 'findById').resolves();

    const result = await salesService.salesDelete(1);

    expect(result).to.be.deep.equal(1)
  });

  it('Deve devolver a sales com ID após update', async () => {
    sinon.stub(salesService, 'findById').resolves();
    sinon.stub(productService, 'findById').resolves();
    sinon.stub(salesModel, 'update').resolves();

    const expected = {
      saleId: 1,
      itemsUpdated: [
        {
          productId: 1,
          quantity: 10
        }
      ]
    };

    const result = await salesService.update(1, [{productId: 1, quantity: 10}]);

    expect(result).to.be.deep.equal(expected)
  })
})