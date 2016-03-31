/**
 * Created by KC on 2016-03-31.
 */

angular.module('myApp.error')
.factory('error', function(){
    const OP_ERR_NONE = 0;
    const OP_ERR_LOGIN = -100;
    const OP_ERR_CONNECT = -101;
    const OP_ERR_VERSION = -102;
    const OP_ERR_SISE_OVERFLOW = -200;
    const OP_ERR_RQ_STRUCT_FAIL = -201;
    const OP_ERR_RQ_STRING_FAIL = -202;
});