const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');

router.post('/order', orderController.createOrder);
router.get('/order', orderController.getOrder);
router.get('/order/:id', orderController.getOneOrder);
router.get('/orderu', orderController.getOrderByUser)
router.put('/order', orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);

module.exports = router;