
var config = require('../common/config'),
    cookie = require('../common/commonCookie'),
    tooltips = require('../common/toolTips');

var setPassword = (function() {

    var SetPassword = function() {},
        fn = SetPassword.prototype;

    fn.onLoad = function ( tel,code ) {
        this.events( tel,code);
    };


    fn.events = function( tel,code ){
        this.eventGoToBackClick();
        this.eventSetPwdClick( tel,code );
    };

    //点击返回
    fn.eventGoToBackClick = function(){

        $('#back').on('click',function goToBackClickHandle(){
            history.back();
        })

    };

    //密码验证函数
    fn.isPassword = function (str) {
        return /^[a-zA-Z0-9_]{6,16}$/.test( str );
    };

    //提交密码验证
    fn.verifyPassword = function ( tel,code,firstPwd,SecondPwd ) {

        var baby_id = cookie.getItem('baby_id'),
            data = {
            username: tel,
            password: firstPwd,
            code: code,
            baby_id: baby_id
        };
        if( $.trim(firstPwd) == ''|| !this.isPassword(firstPwd) ){
            tooltips.show( '请输入正确格式的密码！',1000);
            return false;
        }
        if( firstPwd !== SecondPwd ){
            tooltips.show( '两次输入的密码不一致！',1000);
            return false;
        }
        $.ajax({
            type: 'GET',
            data: data,
            url: config.API_URL.LOGIN_PATH,
            dataType: 'json',
            success: function (data) {
                //todo返回错误码
                if( !data.id ){

                }else{
                    tooltips.show('注册成功！',1000);
                    setTimeout(function () {
                        location.href = config.PAGE_URL.LOGIN_PATH;//todo
                    },1000);
                }
            },
            error: function (xhr, type) {
                alert('Ajax error!')
            }
        });

    };

    //点击创建密码
    fn.eventSetPwdClick = function ( tel,code ) {

        var that = this;
        $('#setPwd-btn').on('click',function setPwdClickHandle(){
            var firtPwd = $('#first-pwd').val(),
                SecondPwd = $('#second-pwd').val();
            that.verifyPassword( tel,code,firtPwd,SecondPwd );
        });

    };

    return new SetPassword();


})();

module.exports = setPassword;