const connection = require("../../../src/db/connection");
const { expect } = require('chai');
const sinon = require('sinon');
const mock = require('../../mock/sales');
const salesModel = require('../../../src/models/sales.model');



describe('Teste unitário para models de sales método GET', () => {
  afterEach(() => sinon.restore());
  it('Deve devolver uma lista com as vendas', async () => {
    sinon.stub(connection, 'execute').resolves(mock.findAll);

    const result = await salesModel.findAll();

    expect(result).to.be.deep.equal(mock.findAll[0])
  })

  it('Deve devolver uma lista com as vendas com o id passado', async () => {
    sinon.stub(connection, 'execute').resolves(mock.findById);

    const result = await salesModel.findById(1);

    expect(result).to.be.deep.equal(mock.findById[0])
   })

  it('Deve devolver TRUE se a sales_product for criada', async () => {
    sinon.stub(connection, 'execute').resolves();

    const result = await salesModel.createSaleProduct(1, [{ productId: 1, quantity: 10 }]);

    expect(result).to.be.equal(true);
  })

  it('Deve devolver o id da sales criada', async () => {
    sinon.stub(connection, 'execute').resolves(mock.create);
    sinon.stub(salesModel, 'createSaleProduct').resolves(true);

    const result = await salesModel.createSale([{ productId: 1, quantity: 10 }]);

    expect(result).to.be.equal(1);
  })

  it('Deveolve o número de linhas afetadas após DELETE em sales_products', async () => {
    sinon.stub(connection, 'execute').resolves(mock.prodDelete);

    const result = await salesModel.salesProdDelete(1)

    expect(result).to.be.equal(1);
  })

  it('Deveolve o número de linhas afetadas após DELETE em sales', async () => {
    sinon.stub(connection, 'execute').resolves(mock.prodDelete);

    const result = await salesModel.salesDelete(1)

    expect(result).to.be.equal(1);
  })

  it('Deve devolver TRUE ao realizar update no banco', async () => {
    sinon.stub(connection, 'execute').resolves();

    const result = await salesModel.update(1, [{ productId: 1, quantity: 10 }]);

    expect(result).to.be.equal(true);
  })
})