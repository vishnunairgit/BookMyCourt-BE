var express = require('express');
var router = express.Router();
const { userAuth } = require('../middlewares/authorization');
const {orders, paymentSuccess}= require('../controllers/paymentControllers')


router.post('/orders',userAuth, orders)
router.post('/success',userAuth, paymentSuccess)









module.exports = router;
