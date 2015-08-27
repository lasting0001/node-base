/**
 * Created by lijun on 15-4-15.
 */

var _md5 = require('MD5');
var _xmlreader = require("xmlreader");


var Util = function () {

    return {
        random: function (min, max) {
            var c = max - min;
            return Math.floor(Math.random() * c + min);
        },
        randomTo: function (max) {
            return Math.floor(Math.random() * max);
        },
        dbQuery: function (sql, callBack, params) {
            var dbPoolName = params.dbPoolName || COMMON_PARAM.DEFAULT_DB;
            if (!sql) {
                _Log.error('Util dbQuery sql参数错误:' + sql + ',dbPoolName:' + dbPoolName);
                callBack(null, params);
                return;
            }
            var dbPool = _DBPool[dbPoolName];
            if (!dbPool) {
                _Log.error('Util dbQuery 连接池错误 dbPool:' + dbPool);
                callBack(null, params);
                return;
            }
            dbPool.getConnection(function (err, conn) {
                if (err) {
                    _Log.fatalObj('getConnection error,sql:' + sql + ':', err);
                    callBack(null, params);
                    return;
                }
                var query = conn.query(sql, params.columns || [], function (err, results) {
                    conn.release();
                    if (err) {
                        _Log.fatalObj('query error,sql:' + sql + ':', err);
                        callBack(null, params);
                        return;
                    }
                    callBack(results, params);
                });
            });
        },
        md5: function (input) {
            return _md5(input);
        },
        obj2Xml: function (obj, type) {
            var left = '<';
            var right = '>';
            var leftEnd = '</';
            var typeHead = left + type + right;
            var typeEnd = leftEnd + type + right;
            var xmlHead = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>';
            var content = xmlHead + typeHead;
            for (var key in obj) {
                content += left;
                content += key;
                content += right;
                content += obj[key];
                content += leftEnd;
                content += key;
                content += right;
            }
            content += typeEnd;
            return content;
        },
        xml2Obj: function (xmlStr, type, callBack) {
            var xmlObj = {};
            _xmlreader.read(xmlStr, function (err, result) {
                if (err) {
                    return callBack(err);
                }
                var value = result[type];
                for (var key in value) {
                    var obj = value[key]
                    if ('text' in obj) {
                        xmlObj[key] = obj.text();
                    }
                }
                callBack(null, xmlObj);
            });
        },
        getDateFormat: function (format, date) {
            if (!format) {
                format = 'yyyyMMddhhmmss'
            } else if (format === '-') {
                format = 'yyyy-MM-dd hh:mm:ss';
            }
            return (date || new Date()).format(format);
        },
        getClientIp: function (req) {
            return req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress || 'unknown ip';
        },
        isApp: function (req) {
            var userAgent = req.get('user-agent') || '';
            var regx = /.*5miao_game.*/;
            if (userAgent.match(regx)) {
                return true;
            }
            return false;
        },
        getRedisTokenTey: function (uid) {
            return "user:" + uid + ":token";
        },
        getTotalDataKey: function (e) {
            return (e.date || '') + '_' + (e.partner_id || '') + '_' + ( e.game_id || '');
        },
        setCookie: function (res, cookie, params) {
            var cookieArr = [];
            cookie.forEach(function (e) {
                var cookieStr = '';
                for (var key in e) {
                    if (key === 'secure' || key === 'httponly') {
                        cookieStr += key;
                        cookieStr += ';';
                    } else {
                        cookieStr += key;
                        cookieStr += '=';
                        cookieStr += e[key];
                        cookieStr += ';';
                    }
                }
                if (cookieStr.length > 0) {
                    cookieStr = cookieStr.deleteCharAt(cookieStr.length - 1);
                }
                cookieArr.push(cookieStr);
            });
            var headObj = {
                'Set-Cookie': cookieArr,
                'Content-Type': 'text/html'
            };
            if (params.status == 302 && params.reUrl) {
                headObj['Location'] = params.reUrl;
            }
            res.writeHead(params.status, headObj);
            //res.headers['Set-Cookie'] = cookieArr;
        },
        getCookie: function (req, key) {
            var cookies = req.cookies || {};
            var json = cookies[key];
            if (json) {
                return JSON.parse(json);
            }
            return json;
        }
    };
};

global._Utils = Util();

function BackClient(res) {
    return function (err, result) {
        if (err) {
            var json = {code: err.code, error: err.error};
            if (result) {
                json.msg = result;
            }
            res.status(err.status).json(json);
        } else {
            if (!result) {
                result = {};
            }
            result.code = 0;
            res.status(200).json(result);
        }
    };
}

global._BackClient = BackClient;