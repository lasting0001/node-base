var express = require('express');
var router = express.Router();


router.use(function (req, res, next) {
    res._ajax_data = {error: ERROR_CODE.PARAM_ERROR, msg: 'id error'};
    next();
});


router.use('/user', require('./user'));
router.use('/operation', require('./operation'));
router.use('/statistics', require('./statistics'));
router.use('/application', require('./application'));

router.use(function (req, res) {
    var ajax_data = res._ajax_data || {};
    if (ajax_data.msg) {
        _BackClient(res)(ajax_data.error, ajax_data.msg);
    } else {
        _BackClient(res)(null, ajax_data.result);
    }
});

module.exports = router;
