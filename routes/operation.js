var express = require('express');
var router = express.Router();


router.use(function (req, res, next) {
    next();
});

router.get('/preference', function (req, res) {

});

module.exports = router;
