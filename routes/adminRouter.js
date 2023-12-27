var express = require('express');
const {addCourtData,addTimeSlotData,updateEditCourtData} = require('../controllers/adminControllers');
var router = express.Router();
const multer = require('multer');
const { adminAuth } = require('../middlewares/authorization');

const fileStorage=multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'public/Courts')
    },
    filename:(req,file,callBack)=>{
        callBack(null, Date.now()+"-"+file.originalname)
    }

})

const upload = multer({storage:fileStorage})
router.post('/addCourtData',adminAuth,upload.single('image'),addCourtData )
//  adminAuth,  /// upload.single('image') .both are middlewares

router.post('/addTimeSlotData', adminAuth, addTimeSlotData )
router.post('/updateEditCourtData', adminAuth, updateEditCourtData )



// admin

module.exports = router;