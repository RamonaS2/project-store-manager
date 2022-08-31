const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?',
    [id]);
  return product;
};

const addProducts = async (name) => {
  const [product] = await connection.execute('INSERT INTO StoreManager.products (name) VALUES (?)',
    [name]);
  return { id: product.insertId, name };
};

const updateProducts = async (id, name) => {
const [product] = await connection.execute('UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id]);
  return product;
};

const removeProducts = async (id) => {
  const [product] = await connection.execute('DELETE FROM StoreManager.products WHERE id = ?',
    [id]);
  return product;
};

const getQuery = async (q) => {
const [products] = await connection.execute('SELECT * FROM StoreManager.products WHERE name LIKE ?',
    [`%${q}%`]);
  return products;
};

module.exports = {
  getAll,
  getById,
  addProducts,
  updateProducts,
  removeProducts,
  getQuery,
};
