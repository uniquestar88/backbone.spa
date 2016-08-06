var tooltips = {

    /**
     *
     * @param str 弹窗显示的字符串
     * @param time 弹窗停留的毫秒数
     */
    show: function( str,time ){
        var html = '<div class="popup" id="tips-box" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000;"> <div style="position: absolute; top: 50%; left: 50%; width: 16rem; height: 2rem; line-height: 2rem; color: #59e4db; font-size: 1rem; background: rgba(0,0,0,.45); text-align: center; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; transform: translate3d(-50%, -50%, 0); -webkit-transform: translate3d(-50%, -50%, 0); -moz-transform:translate3d(-50%, -50%, 0); -o-transform:translate3d(-50%, -50%, 0) ;"> <p>'+ str +'</p> </div> </div>';
        if( $('#tips-box').length == 0 ){
            $('body').append(html);
        }else{
            $('#tips-box').show();
            $('#tips-box p').html(str);
        }
        setTimeout(function(){
            $('#tips-box').hide();
        },time);
    }

};

module.exports = tooltips;