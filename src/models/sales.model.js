const connection = require('../db/connection');

const create = async (array) => {
  const querySale = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';

  const [sales] = await connection.execute(querySale);
  const id = sales.insertId;

  const data = { id, itemsSold: [] };

  const querySalesProduct = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;

  array.forEach(async (e) => {
    await connection.execute(querySalesProduct, [id, e.productId, e.quantity]);
    data.itemsSold.push({ productId: e.productId, quantity: e.productId });
  });

  return data;
};

module.exports = { create };