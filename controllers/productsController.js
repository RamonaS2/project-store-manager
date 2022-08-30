const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

const addProducts = async (req, res) => {
  const { name } = req.body;

  try {
    const newProduct = await productsService.addProducts(name);

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: { error } });
  }
};

module.exports = {
  getAll,
  getById,
  addProducts,
};
