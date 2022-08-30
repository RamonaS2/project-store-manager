const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product[0];
};

const addProducts = async (name) => productsModel.addProducts(name);

module.exports = {
  getAll,
  getById,
  addProducts,
};
