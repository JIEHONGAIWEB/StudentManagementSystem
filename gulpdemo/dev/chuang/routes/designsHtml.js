var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    //获取session
    if(!req.session.username){
        res.send("亲，您是非法登录");
    }else {
        res.render('index');
    }

});

module.exports = router;
