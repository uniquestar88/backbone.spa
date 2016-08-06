
var config = require('../common/config');

var setPassword = (function() {

    var SetPassword = function() {},
        fn = SetPassword.prototype;

    fn.onLoad = function ( tel,code ) {
        this.events();
    };


    fn.events = function(){
        this.eventGoToBackClick();
    };

    //点击返回
    fn.eventGoToBackClick = function(){

        $('#back').on('click',function goToBackClickHandle(){
            history.back();
        })

    };

    //密码验证
    fn.isPassword = function (str) {
        return /^[a-zA-Z0-9_]{6,16}$/.test( str );
    };

    return new SetPassword();


})();

module.exports = setPassword;