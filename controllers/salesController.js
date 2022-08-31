const salesService = require('../services/salesSevice');

const addSale = async (req, res) => {
  const sale = req.body;

  try {
    const newSale = await salesService.addSales(sale);

    if (!newSale) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(201).json(newSale);
  } catch (error) {
    return res.status(500).json({ message: { error } });
  }
};

const getAllSale = async (_req, res) => {
  try {
    const sales = await salesService.getAllSales();

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: { error } });
  }
};

const getByIdSale = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await salesService.getByIdSales(id);

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({ message: { error } });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await salesService.remove(id);

    if (sale.message) {
      return res.status(404).json(sale);
    }

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: { error } });
  }
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  try {
    const newSale = await salesService.updateSales(id, sale);

    if (newSale.message) {
      return res.status(404).json(newSale);
    }

    return res.status(200).json(newSale);
  } catch (error) {
    return res.status(500).json({ message: { error } });
  }
};

module.exports = {
  addSale,
  getAllSale,
  getByIdSale,
  remove,
  updateSale,
};