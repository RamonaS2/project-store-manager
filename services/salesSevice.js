const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const addSales = async (sale) => {
  const productsList = await productsModel.getAll();

  const verifySale = sale.every((item) =>
    productsList.some((product) => product.id === item.productId));

  if (verifySale === false) return false;

  const newSale = await salesModel.addSale(sale);

  const list = {
    id: newSale,
    itemsSold: sale,
  };

  return list;
};

const getAllSales = async () => salesModel.getAllSale();

const getByIdSales = async (id) => {
  const sale = await salesModel.getByIdSale(id);
if (sale.length === 0) return false;
  return sale;
};

const remove = async (id) => {
  const removeSale = await salesModel.remove(id);
  if (removeSale.affectedRows === 0) return { message: 'Sale not found' };
 return removeSale;
};

const updateSales = async (id, sale) => {
  const verifySale = await salesModel.getByIdSale(id);

  if (verifySale.length === 0) return { message: 'Sale not found' };
  
  const products = await productsModel.getAll();

  const sales = sale.every((i) =>
    products.some((product) => product.id === i.productId));

  if (sales === false) return { message: 'Product not found' };
  
  await salesModel.updateSale(id, sale);

  return {
    saleId: id,
    itemsUpdated: sale,
  };
};

module.exports = {
  addSales,
  getAllSales,
  getByIdSales,
  remove,
  updateSales,
};