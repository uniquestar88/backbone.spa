
var config = require('../common/config');

var course = (function() {

    var Course = function() {},
        fn = Course.prototype;

    fn.onLoad = function () {
        this.events();
        this.getData(1);
        this.loadMore();
    };

    fn.data = {
        page: 2
    };

    fn.events = function(){
        this.eventGoBackClick();
    };

    fn.eventGoBackClick = function(){
        $('#back').on('click',function(){
            history.back();
        })
    };

    //请求获取数据
    fn.getData = function ( page ) {
        var that = this,
            data = {
                page:page
            };
        console.log(data);
        $.ajax({
            type: 'GET',
            url: config.API_URL.COURSELIST_PATH,
            data:data,
            dataType: 'json',
            success: function(data){
                var liStr = $.map(data,function(v){
                    return '<li> <div class="img"><img src="'+  v.thumb +'" alt=""/> <div class="bottom">'+ v.title +'</div> </div> <div class="course-text"> <h4>主讲人：'+ v.author +'</h4> <p>基本内容：'+ v.content +'</p> <div class="course-play clear"> <div class="left"> <span>已有<i>'+ v.times +'</i>人播放</span> </div> <div class="right play" data-id="'+ v.course_id +'"> <span>立即播放</span> </div> </div> </div> </li>';
                });
                var $ul = $('.course-lists ul'),
                    mergeLi = liStr.join('');
                $ul.append(mergeLi);
                that.eventGoToDetailClick();
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
                that.getData( page );
                that.data.page = page++;
            }
        });
    };

    //点击跳转到详情页
    fn.eventGoToDetailClick = function(){
        $('.play').on('click',function goToDetailClickHandle(){
            var $this = $(this);
            location.href = config.PAGE_URL.DETAIL_PATH + '/1/' + $this.data('id');
        })
    };

    return new Course();

})();

module.exports = course;