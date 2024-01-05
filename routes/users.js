var express = require('express')
const { getAllCourtData,getSingleCourtData,dayWiseTimeSlout,getMyBookingData } = require('../controllers/userControllers');
const { userAuth } = require('../middlewares/authorization');
// const { userAuth } = require('../middlewares/authorization');

var router = express.Router();




router.get('/getAllCourtData',userAuth,getAllCourtData)
router.get('/getSingleCourtData',userAuth,getSingleCourtData)
router.get('/dayWiseTimeSlout',userAuth,dayWiseTimeSlout)
router.get('/getMyBookingData',userAuth,getMyBookingData)




module.exports = router;
