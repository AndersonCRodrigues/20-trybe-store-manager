const connection = require('../db/connection');

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const data = await connection.execute(query);
  return data;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';

  const data = await connection.execute(query, [id]);

  return data;
};

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES(?)';
  const result = await connection.execute(query, [name]);
  return result;
};

const update = async (id, name) => {
  const query = `UPDATE StoreManager.products
                SET name = ?
                WHERE id = ?`;
  const data = await connection.execute(query, [name, id]);

  return data;
};

const prodDelete = async (id) => {
  const query = `DELETE FROM StoreManager.products
                WHERE id = ?`;

  const data = await connection.execute(query, [id]);
  return data;
};

module.exports = { findAll, findById, create, update, prodDelete };