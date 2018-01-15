//index.js
var config = require('../../config.js')
var http = require('../../utils/httpHelper.js')
//获取应用实例
const app = getApp()
wx.showShareMenu({
  withShareTicket: true
})

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [], //banner图
    goods:[], //商品列表
    goods_type:[], //商品分类
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    page:1,
    limit:10,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    that.getBanner()
    that.getGoods()
    that.getGoodsType()
  },

  onShareAppMessage: function (res) {
    return {
      title: '洞悉微客',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showModal({
          content: '转发成功',
          showCancel: false,
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showModal({
          content: '转发失败',
          showCancel: false,
        })
      }
    }
  },
  getBanner:function(){
    var that = this
    //首页banner - LQ
    http.httpPost("index_banner", {}, function (res) {
      that.setData({
        imgUrls: res.data.index_banner
      });
    });
  },
  getGoods:function(){
    var that = this
    //首页商品 - LQ
    http.httpPost('index_goods', { page: that.data.page, limit: that.data.limit }, function (res) {
      var goods = that.data.goods.concat(res.data.goods)
      that.setData({
        goods: goods
      });
      console.log(that.data.goods);
    })

  },
  getGoodsType:function(){
    var that = this
    //首页分类 - 20180108 - LQ
    http.httpPost('index_type', {}, function (res) {
      that.setData({
        goods_type: res.data.goods_type_up
      });
    });
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  toClassify:function(e){
    wx.navigateTo({
      url: "../classify/classify?id="+e.currentTarget.id
    })
  },
  toAcerstore:function(e){
    wx.navigateTo({
      url: "../acerstore/acerstore"
    })
  },
  toOverflow: function (e) {
    wx.navigateTo({
      url: "../overflow/overflow"
    })
  },
  toFanswefare:function(e){
    wx.navigateTo({
      url: "../fanswefare/fanswefare"
    })
  },
  toGoodsDetail:function(e){
    wx.navigateTo({
      url: "../goodsDetail/goodsDetail?id=" + e.currentTarget.dataset.id +  '&type=' + e.currentTarget.dataset.type
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      imgUrls: [], //banner图
      goods: [], //商品列表
      goods_type: [], //商品分类
      scrollTop: 0,
      page:1
    });
    this.getBanner()
    this.getGoods()
    this.getGoodsType()
  },
  onReachBottom: function () {
    var page = this.data.page +  1
    this.setData({
      page:page
    })
    this.getGoods()
  },
})
