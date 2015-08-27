/**
 * Created by Jun.li on 2015/7/23.
 */
"use strict";
function Types() {
    return {
        SELF_PARAM: {},
        SELF_FUNC: {}
    }
}

var types = Types();

global.SELF_FUNC = types.SELF_FUNC;
global.SELF_PARAM = types.SELF_PARAM;
