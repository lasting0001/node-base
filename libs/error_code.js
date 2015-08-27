/**
 * Created by lijun on 15-4-20.
 */
function ErrorCode() {
    return {
        OK: {status: 200, code: 0},

        HEADER_ERROR: {status: 400, code: 1, error: 'Header error'},
        PARAM_ERROR: {status: 400, code: 2, error: 'Params error'},
        AUTH_ERROR: {status: 401, code: 3, error: 'Auth error'},

        INTERNAL_ERROR: {status: 500, code: 4, error: 'Internal error'},

        /** 信息修改失败*/
        INFO_MODIFY_ERROR: {status: 200, code: 10701, error: 'info_modify_error'}
    }
}

global.ERROR_CODE = ErrorCode();