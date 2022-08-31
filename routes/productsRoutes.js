const { Router } = require('express');
const productsController = require('../controllers/productsController');
const validateProducts = require('../middlewares/validadeProducts');

const productsRoute = Router();

productsRoute.get('/search', productsController.getQuery);

productsRoute.get('/', productsController.getAll);

productsRoute.get('/:id', productsController.getById);

productsRoute.post('/', validateProducts.validadeProducts, productsController.addProducts);

productsRoute.put('/:id', validateProducts.validadeProducts, productsController.updateProducts);

productsRoute.delete('/:id', productsController.removeProducts);

module.exports = productsRoute;
