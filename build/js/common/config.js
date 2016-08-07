/**
 * Created by sun yi on 2016/7/20.
 */

var commonPagePath = '/backbone.spa/';

module.exports = {
    IMG_PATH: commonPagePath + 'images/',
    PAGE_URL: {
        INIT_PATH: commonPagePath + '#init',
        INIT_GENDER_PATH: commonPagePath + '#init/gender',
        MAIN_PATH: commonPagePath + '#main',
        MAIN_RECORD_PATH: commonPagePath + '#record',
        FIND_PATH: commonPagePath + '#find',
        LISTS_PATH: commonPagePath + '#lists',
        DETAIL_PATH: commonPagePath + '#details',
        MINE_PATH:commonPagePath + '#mine',
        LOGIN_PATH: commonPagePath + '#login',
        SETPWD_PATH: commonPagePath + '#setPwd',
        COLLECT_PATH: commonPagePath + '#collect',
        SUGGESTION_PATH: commonPagePath + '#suggestion',
        SET_PATH: commonPagePath + '#set',
        PROVISION_PATH: commonPagePath + '#provision',
        ABOUT_US_PATH: commonPagePath + '#aboutUs'
    },
    API_URL: {
        MAINJSON_PATH: commonPagePath + '/data/main.json', //首页列表数据接口
        BABYDETAIL_PATH: commonPagePath + '/data/babyDetail.json', //文章详情页数据接口
        BABYREG_PATH: commonPagePath + '/data/reg.json', //宝宝登记接口
        CAT_PATH: commonPagePath + '/data/cat.json', //宝宝知道分类头部导航接口
        CATLIST_PATH: commonPagePath + '/data/catlist.json', //宝宝知道文章列表接口
        FAV_PATH: commonPagePath + '/data/fav.json', //文章收藏接口
        LOGIN_PATH: commonPagePath + '/data/signin.json', //用户登录接口
        MEMBERREG_PAT: commonPagePath + '/data/memberReg.json', //用户注册接口
        AUTHCODE_PATH:commonPagePath + '/data/authcode.json', //获取验证码
        FAVLIST_PATH: commonPagePath + '/data/favlist.json' //我的收藏接口
    },
    DATE: '?date=2016072101'
};