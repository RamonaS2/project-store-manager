const { Router } = require('express');
const salesController = require('../controllers/salesController');

const verifySale = require('../middlewares/validadeSale');

const salesRoute = Router();

salesRoute.post('/', verifySale.validadeSale, salesController.addSale);

salesRoute.get('/', salesController.getAllSale);

salesRoute.get('/:id', salesController.getByIdSale);

salesRoute.delete('/:id', salesController.remove);

salesRoute.put('/:id', verifySale.validadeSale, salesController.updateSale);

module.exports = salesRoute;
