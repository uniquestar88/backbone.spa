
var config = require('../common/config'),
    cookie = require('../common/commonCookie'),
    tooltips = require('../common/toolTips');

var login = (function() {

    var Login = function() {},
        fn = Login.prototype;

    fn.onLoad = function () {
        this.renderPage();
        this.slidePicture();
        this.events();
    };

    fn.data = {
        IMG_PATH: config.IMG_PATH,
        DATE:config.DATE,
        listsContent:[

        ]
    };

    //事件点击处理
    fn.events = function(){
        this.eventTabNavClick();
        this.eventLoginClick();
        this.eventRegisterClick();
        this.eventGetVerifyCode();
    };

    //头部轮播图片
    fn.slidePicture = function () {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay:3000,
            autoplayDisableOnInteraction:true
        });
    };

    //导航切换
    fn.eventTabNavClick = function(){
        $('.login-nav ul li').on('click',function tabNavClickHandle(){
            var $this = $(this);
            $this.addClass('active').siblings('li').removeClass('active');
            if( $this.index() == 0 ){
                $('#login-part').show();
                $('#register-part').hide();
            }else if( $this.index() == 1 ){
                $('#login-part').hide();
                $('#register-part').show();
            }

        })
    };

    //点击登陆
    fn.eventLoginClick = function(){

        var that = this;
        $('#login-btn').on('click',function loginClickHandle(){
            var tel = $('#login-tel').val(),
                pwd = $('#login-pwd').val();
            that.verifyLogin( tel,pwd );
        })

    };

    //登录验证
    fn.verifyLogin = function( tel, pwd ){

        if( $.trim(tel) == '' || !this.isCellPhone(tel) ) {
            tooltips.show( '请输入正确的手机号码！',1000 );
            return false;
        }else if($.trim(pwd) == '' ){
            tooltips.show( '请输入密码！',1000 );
            return false;
        }
        var data = {
            username: tel,
            password: pwd
        };
        //console.log(data);
        $.ajax({
            type: 'GET',
            data: data,
            url: config.API_URL.LOGIN_PATH,
            dataType: 'json',
            success: function (data) {
                if( data.error == 10006 ){
                    tooltips.show( '请输入正确的手机号码！',1000 );
                }else if(data.error == 10007 ){
                    tooltips.show( '请输入正确密码',1000 );
                }else{
                    cookie.setItem('user_id',data.id);
                    history.back();
                }
            },
            error: function (xhr, type) {
                alert('Ajax error!')
            }
        });

    };

    //点击下一步
    fn.eventRegisterClick = function(){

        var that = this;
        $('#register-btn').on('click',function(){
            var tel = $('#register-tel').val(),
                code = $('#verify-code').val();
            if( $.trim(tel) == '' || !that.isCellPhone(tel) ) {
                tooltips.show( '请输入正确的手机号码！',1000 );
                return false;
            }
            if($.trim(code) == '' ){
                tooltips.show( '请输入验证码！',1000 );
                return false;
            }
            location.href = config.PAGE_URL.SETPWD_PATH + '/' + tel +'/' + code;
        });

    };

    //点击获取验证码
    fn.eventGetVerifyCode = function(){

        var that = this;
        $('#verify-btn').off('click').on('click',function(){
            var tel = $('#register-tel').val(),
                data = {
                    mobile: tel
                };
            console.log(tel);
            if( $.trim(tel) == '' || !that.isCellPhone(tel) ){
                tooltips.show( '请输入正确的手机号码！',1000 );
                return false;
            }
            $.ajax({
                type: 'GET',
                data: data,
                url: config.API_URL.AUTHCODE_PATH,
                dataType: 'json',
                success: function (data) {
                    if( data.error == 10007 ){
                        tooltips.show( '请输入正确的手机号码！',1000 );
                    }else if(data.code == 30007 ){
                        tooltips.show( '该用户已存在！',1000 );
                    }else{
                        that.eventRegisterClick();
                    }
                },
                error: function (xhr, type) {
                    alert('Ajax error!')
                }
            });
        })

    };

    //手机验证函数
    fn.isCellPhone = function( str ){
        return /^1[0-9]{10}$/.test( str );
    };

    //验证码验证函数
    fn.isCorrectVerifyCode = function(str){
        return /^[1-9]\d{5}$/.test( str );
    };

    //模板渲染
    fn.renderPage = function () {
        this.loadTpl($('#login-tpl'),$('#login'),this.data)
    };

    //模板调用方法
    fn.loadTpl = function($tpl,$target,data){ //三个参数的顺序分别是script的id,div的id,数据
        var template = $tpl.html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, data);
        $target.html(rendered);
    };

    return new Login();


})();

module.exports = login;