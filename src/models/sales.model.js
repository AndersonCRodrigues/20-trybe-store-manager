const connection = require('../db/connection');

const createSaleProduct = async (id, array) => {
  const querySalesProduct = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;

  const promises = array.map(async (e) => {
    await connection.execute(querySalesProduct, [id, e.productId, e.quantity]);
  });

  await Promise.all(promises);
};

const createSale = async (array) => {
  const querySale = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';

  const [sales] = await connection.execute(querySale);
  const id = sales.insertId;

  await createSaleProduct(id, array);
  return id;
};

const findAll = async () => {
  const query = `SELECT p.sale_id saleId,
                        s.date,
                        p.product_id productId,
                        p.quantity
                FROM StoreManager.sales s
                INNER JOIN StoreManager.sales_products p
                ON s.id = p.sale_id`;

  const [data] = await connection.execute(query);

  return data;
};

module.exports = { createSale, findAll };