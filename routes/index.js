var express = require('express');
var router = express.Router();


router.use(function (req, res, next) {
    next();
});

router.use('/ajax', require('./ajax'));
router.use('/render', require('./render'));

module.exports = router;
