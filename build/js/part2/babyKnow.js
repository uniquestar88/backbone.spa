
var config = require('../common/config'),
    cookie = require('../common/commonCookie');

var babyKnow = (function() {

    var BabyKnow = function() {},
        fn = BabyKnow.prototype;

    fn.onLoad = function () {
        this.getNavData();
        this.events();
    };

    fn.data = {
        IMG_PATH: config.IMG_PATH,
        DATE:config.DATE,
        page: 2
    };

    fn.events = function(){
        this.eventGoBackClick();
    };

    //获取导航栏信息
    fn.getNavData = function(){
        var that = this,
            data = {};
        data.baby_id = cookie.getItem('baby_id');
        $.ajax({
            type: 'GET',
            url: config.API_URL.CAT_PATH,
            data:data,
            dataType: 'json',
            success: function(data){
                var obj = {},
                    $ul = $('.babyKnow-lists ul');
                that.data.catid = data[0].catid;
                obj.catData = data;
                that.loadTpl($('#swiper-tpl'),$('#swiper'),obj);
                that.swipePicture();
                that.eventTabNavClick();
                that.getContentListData( that.data.catid,1,$ul );
                that.loadMore();
            },
            error: function(xhr, type){
                alert('Ajax error!')
            }
        });
    };

    //滚动加载更多
    fn.loadMore = function(){
        var that = this,
            range = 0,            //距下边界长度/单位px
            totalheight = 0,
            page = that.data.page,
            $ul = $('.babyKnow-lists ul');                     //主体元素
        $(window).scroll(function(){
            var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
            totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
            if(($(document).height()-range) <= totalheight ) {
                that.getContentListData( that.data.catid,page,$ul );
                that.data.page = page++;
            }
        });
    };

    //请求文章列表数据
    fn.getContentListData = function( catid,page,$append ){
        var that = this,
            data = {
                catid: catid,
                page: page
            };
        $.ajax({
            type: 'GET',
            url: config.API_URL.CATLIST_PATH,
            data:data,
            dataType: 'json',
            success: function(data){
                var liStr = $.map(data,function(v,k){
                    return '<li data-id="'+v.id+'"> <div class="lists-content clear"> <div class="left"><img src="'+ v.pic +'" /> </div> <div class="auto"> <h4>'+ v.title +'</h4> <p>'+ v.desc +'</p> </div> </div> </li>';
                });
                var mergeLi = liStr.join('');
                $append.append(mergeLi);
                that.eventGoToDetailClick();
            },
            error: function(xhr, type){
                alert('Ajax error!')
            }
        });
    };

    //导航轮播
    fn.swipePicture = function(){
        var swiper = new Swiper('.swiper-container', {
            scrollbarHide: true,
            slidesPerView: 'auto',
            centeredSlides: false,
            spaceBetween: 0,
            grabCursor: true
        });
    };

    //点击切换分类文章列表
    fn.eventTabNavClick = function(){
        var that = this,
            $slide = $('.swiper-slide'),
            $ul = $('.babyKnow-lists ul');
        $slide.eq(0).addClass('active');
        $slide.on('click',function tabNavClickHandle(){
            var $this = $(this),
                id = $this.data('id');
            that.data.catid = $this.data('catid');
            $ul.html('');
            $this.addClass('active').siblings('.swiper-slide').removeClass('active');
            switch (id){
                case 1:
                    that.getContentListData( that.data.catid,1,$ul );
                    break;
                case 2:
                    that.getContentListData( that.data.catid,1,$ul );
                    break;
                case 3:
                    that.getContentListData( that.data.catid,1,$ul );
                    break;
                case 4:
                    that.getContentListData( that.data.catid,1,$ul );
                    break;
                case 5:
                    that.getContentListData( that.data.catid,1,$ul );
                    break;
                case 6:
                    that.getContentListData( that.data.catid,1,$ul );
                    break;
                default :
                    break;
            }
        })

    };

    //点击跳转到详情页
    fn.eventGoToDetailClick = function () {

        $('.babyKnow-lists li').on('click', function () {
            console.log('dsafds');
            var $this = $(this);
            location.href = config.PAGE_URL.DETAIL_PATH +'/0/'+ $this.data('id');
        })

    };

    //点击返回
    fn.eventGoBackClick = function(){
        $('#back').on('click',function(){
            history.back();
        })
    };

    fn.loadTpl = function($tpl,$target,data){ //三个参数的顺序分别是script的id,div的id,数据
        var template = $tpl.html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, data);
        $target.html(rendered);
    };

    return new BabyKnow();

})();

module.exports = babyKnow;