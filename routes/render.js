var express = require('express');
var router = express.Router();


router.use(function (req, res, next) {
    var data = {msg: '123'};
    data.menu = {};
    data.user_info = {};
    res._render_data = data;
    next();
});

//首页
router.get('/home', function (req, res) {
    res.end(_ArtTemplate.compileNative(__dirname + '/../views/test', req._render_data || {}));
});


router.use('/user', require('./user'));
router.use('/operation', require('./operation'));
router.use('/statistics', require('./statistics'));
router.use('/application', require('./application'));

//模板返回
router.get('*', function (req, res) {
    res.end(_ArtTemplate.compileNative(__dirname + '/../views/test', res._render_data || {}));
});

module.exports = router;
