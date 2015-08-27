/**
 * Created by Jun.li on 2015/8/27.
 */
"use strict";
var _template = require('art-template/node/template.js');
var _template_native = require('art-template/node/template-native.js');
_template.config('compression', true);
_template_native.config('compression', true);


function ArtTemplate() {
    return {
        compile: function (path, data) {
            return _template(path, data);
        },
        compileNative: function (path, data) {
            return _template_native(path, data);
        }
    }
}

global._ArtTemplate = ArtTemplate();