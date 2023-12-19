var express = require('express');
const { doSignup , doLogin} = require('../controllers/authControllers');
var router = express.Router();



router.post('/signup', doSignup)
router.post('/login', doLogin)





module.exports = router;