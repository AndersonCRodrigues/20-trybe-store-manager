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
                ON s.id = p.sale_id
                ORDER BY p.sale_id, p.product_id`;

  const [data] = await connection.execute(query);

  return data;
};

const findById = async (id) => {
  const query = `SELECT s.date,
                        p.product_id productId,
                        p.quantity
                FROM StoreManager.sales s
                INNER JOIN StoreManager.sales_products p
                ON s.id = p.sale_id
                WHERE s.id = ?
                ORDER BY p.sale_id, p.product_id`;

  const [data] = await connection.execute(query, [id]);

  return data;
};

const salesProdDelete = async (id) => {
  const query = `DELETE FROM StoreManager.sales_products
                  WHERE sale_id = ?`;
  return connection.execute(query, [id]);
};

const salesDelete = async (id) => {
  await salesProdDelete(id);

  const query = `DELETE FROM StoreManager.sales
                  WHERE id = ?`;

  return connection.execute(query, [id]);
};

module.exports = { createSale, findAll, findById, salesDelete };