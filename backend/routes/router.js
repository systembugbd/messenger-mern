const router = require('express').Router();
const homeController = require('../controller/homeController');

router.route('/').get(homeController);

module.exports = router;
