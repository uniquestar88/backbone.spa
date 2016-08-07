/**
 * Created by Administrator on 2016/7/20 0020.
 */
var config = require('../common/config'),
    cookie = require('../common/commonCookie')

var gender = (function() {

    var Gender = function() {},
        fn = Gender.prototype;

    fn.onLoad = function( birth ){
        this.events( birth );
    };

    fn.data = {
        sex:1
    };

    fn.events = function( birth ){
        this.eventGoNextOrPreClick();
        this.eventSelectSexClick();
        this.eventSubmitClick();
    };


    /*点击完成保存baby_id到cookie*/
    fn.eventSubmitClick = function( birth ){

        var that = this;
        $('#next-btn').on('click',function(){
            var data = {};
            data.birth = birth;
            data.sex = that.data.sex;
            $.ajax({
                type: 'POST',
                url: config.API_URL.BABYREG_PATH,
                data:data,
                dataType: 'json',
                success: function(data){
                    cookie.setItem('baby_id',data.baby_id);
                    location.href = config.PAGE_URL.MAIN_PATH;
                },
                error: function(xhr, type){
                    alert('Ajax error!')
                }
            });
        })

    };

    /*选择性别*/
    fn.eventSelectSexClick = function () {

        var that = this;
        $('#select-sex').find('li').on('click', function () {
            var $this = $(this);
            $this.addClass('active').siblings('li').removeClass('active');
            that.data.sex = $this.data('id');
        });

    };

    /*点击返回上一步*/
    fn.eventGoNextOrPreClick = function () {

        $('#pre-btn').on('click',function(){
            location.href = config.PAGE_URL.INIT_PATH;
        });

    };

    return new Gender();

})();

module.exports = gender;