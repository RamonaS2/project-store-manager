const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product[0];
};

const addProducts = async (name) => productsModel.addProducts(name);

const updateProduct = async (id, name) => {
  const updatedProduct = await productsModel.updateProducts(id, name);
  if (updatedProduct.affectedRows === 0) return { message: 'Product not found' };
  return { id, name };
};

const removeProduct = async (id) => {
  const removedProduct = await productsModel.removeProducts(id);
  if (removedProduct.affectedRows === 0) return { message: 'Product not found' };
  return true;
};

const getQuery = async (q) => {
  if (!q) return productsModel.getAll();
 return productsModel.getQuery(q);
};

module.exports = {
  getAll,
  getById,
  addProducts,
  updateProduct,
  removeProduct,
  getQuery,
};
