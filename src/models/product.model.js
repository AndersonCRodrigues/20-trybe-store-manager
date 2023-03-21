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

module.exports = { findAll, findById, create };