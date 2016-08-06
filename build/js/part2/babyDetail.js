
var config = require('../common/config'),
    cookie = require('../common/commonCookie');

var babyDetail = (function() {

    var BabyDetail = function() {},
        fn = BabyDetail.prototype;

    fn.onLoad = function ( detailId ) {
        this.renderLoading();
        this.getData( detailId );
        this.events();
    };

    fn.data = {
        IMG_PATH: config.IMG_PATH,
        DATE:config.DATE
    };

    /*加载动画*/
    fn.renderLoading = function(){
        this.loadTpl($('#loading-tpl'),$('#loading'),this.data);
    };

    /*请求文章数据*/
    fn.getData = function ( detailId ) {
        var that = this,
            data = {
                id: detailId
            };
        $.ajax({
            type: 'GET',
            data: data,
            url: config.API_URL.BABYDETAIL_PATH,
            dataType: 'json',
            success: function(data){
                that.data.contentData = data;
                that.renderPage();
                $('#ajax-loading').hide();
                that.eventCollectClick();
            },
            error: function(xhr, type){
                alert('Ajax error!')
            }
        });
    };

    /*是否收藏*/
    fn.eventCollectClick = function(){
        var that = this,
            $keep = $('.keep-box');

        if(this.data.contentData.isFavorite){
            $keep.addClass('active');
            $keep.find('span').html("已收藏");
        }

        $keep.off('click').on('click', function () {
            var $this = $(this),
                id = that.data.contentData.id,  //文章id
                userid = cookie.getItem('user_id'); //从cookie获取用户id
                data = {
                    id:id,
                    userid:userid
                };
            if(!userid){
                location.href = config.PAGE_URL.LOGIN_PATH;
            }else {
                if ($this.hasClass('active')) {
                    $this.removeClass('active');
                    $keep.find('span').html("收藏");
                    that.data.contentData.isFavorite = 0;
                    //ajax取消收藏
                    $.ajax({
                        type: 'GET',
                        data: data,
                        url: config.API_URL.BABYDETAIL_PATH,
                        dataType: 'json',
                        success: function (data) {
                            that.data.contentData = data;
                            that.renderPage();
                            that.eventCollectClick();
                        },
                        error: function (xhr, type) {
                            alert('Ajax error!')
                        }
                    });
                } else {
                    $this.addClass('active');
                    $keep.find('span').html("已收藏");
                    that.data.contentData.isFavorite = 1;
                    //ajax收藏
                    $.ajax({
                        type: 'GET',
                        data: data,
                        url: config.API_URL.BABYDETAIL_PATH,
                        dataType: 'json',
                        success: function (data) {
                            that.data.contentData = data;
                            that.renderPage();
                            that.eventCollectClick();
                        },
                        error: function (xhr, type) {
                            alert('Ajax error!')
                        }
                    });
                }
            }
        })
    };

    fn.events = function(){
        this.eventGoBackClick();
    };

    fn.eventGoBackClick = function(){
        $('#back').on('click',function(){
            history.back();
        })
    };

    fn.renderPage = function () {
        this.loadTpl($('#details-tpl'),$('#details'),this.data.contentData)
    };

    fn.loadTpl = function($tpl,$target,data){ //三个参数的顺序分别是script的id,div的id,数据
        var template = $tpl.html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, data);
        $target.html(rendered);
    };

    return new BabyDetail();

})();

module.exports = babyDetail;