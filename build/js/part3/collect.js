
var config = require('../common/config'),
    cookie = require('../common/commonCookie');

var collect = (function() {

    var Collect = function() {},
        fn = Collect.prototype;

    fn.onLoad = function () {
        this.getData();
        this.events();
    };

    fn.data = {

    };

    fn.events = function(){
        this.eventGoToBackClick();
    };

    //获取收藏数据
    fn.getData = function(){
        var that = this,
            user_id = cookie.getItem('user_id'),
            data = {
                userid: user_id
            };
        $.ajax({
            type: 'GET',
            data: data,
            url: config.API_URL.FAVLIST_PATH,
            dataType: 'json',
            success: function (data) {
                that.data.listData = data;
                that.loadTpl($('#collect-tpl'),$('#collect'),that.data);
                that.eventGoToDetailClick();
            },
            error: function (xhr, type) {
                alert('Ajax error!')
            }
        });
    };

    //点击跳转到详情页
    fn.eventGoToDetailClick = function(){
        $('.babyKnow-lists li').on('click', function goToDetailClickHandle() {
            var $this = $(this);
            location.href = config.PAGE_URL.DETAIL_PATH + '/0/' + $this.data('id');
        })
    };

    //点击返回
    fn.eventGoToBackClick = function(){

        $('#back').on('click',function goToBackClickHandle(){
            history.back();
        })

    };

    fn.loadTpl = function($tpl,$target,data){ //三个参数的顺序分别是script的id,div的id,数据

        var template = $tpl.html();
        Mustache.parse(template);
        var rendered = Mustache.render(template, data);
        $target.html(rendered);

    };

    return new Collect();


})();

module.exports = collect;