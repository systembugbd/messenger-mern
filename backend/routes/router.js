const router = require('express').Router();
const homeController = require('../controller/homeController');
const userRegisterController = require('../controller/userRegisterController');
const userLoginController = require('../controller/userLoginController');

router.route('/').get(homeController);
router.route('/user/register').post(userRegisterController);
router.route('/user/login').post(userLoginController);

module.exports = router;
