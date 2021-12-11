const router = require('express').Router();
const homeController = require('../controller/homeController');
const userRegisterController = require('../controller/userRegisterController');

router.route('/').get(homeController);
router.route('/user/register').post(userRegisterController);

module.exports = router;
