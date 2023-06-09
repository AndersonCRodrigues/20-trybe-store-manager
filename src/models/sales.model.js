const connection = require('../db/connection');

const createSaleProduct = async (id, array) => {
  const querySalesProduct = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;

  const promises = array.map(async (e) => {
    await connection.execute(querySalesProduct, [id, e.productId, e.quantity]);
  });

  await Promise.all(promises);

  return true;
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
  const [data] = await connection.execute(query, [id]);
  return data.affectedRows;
};

const salesDelete = async (id) => {
  await salesProdDelete(id);

  const query = `DELETE FROM StoreManager.sales
                  WHERE id = ?`;

  const [data] = await connection.execute(query, [id]);
  return data.affectedRows;
};

const update = async (id, sales) => {
  const query = `UPDATE StoreManager.sales_products
                  SET quantity = ?
                  WHERE product_id = ? AND sale_id = ?`;

  const promises = sales.map(async (e) => {
    await connection.execute(query, [e.quantity, e.productId, id]);
  });

  await Promise.all(promises);

  return true;
};

module.exports = {
  createSale,
  findAll,
  findById,
  salesDelete,
  update,
  createSaleProduct,
  salesProdDelete,
};