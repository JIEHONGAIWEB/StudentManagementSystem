var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 res.render('users', { title: '注册成功' });
});

module.exports = router;
