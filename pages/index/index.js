//index.js
var config = require('../../config.js')
var http = require('../../utils/httpHelper.js')
//获取应用实例
const app = getApp()

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
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;

      //首页banner - LQ
      http.httpPost("index_banner", {}, function (res) {
        that.setData({
          imgUrls: res.data.index_banner
        });
      });

      //首页商品 - LQ
      http.httpPost('index_goods',{},function(res){
          that.setData({
              goods : res.data.goods
          });
      })

      //首页分类 - 20180108 - LQ
      http.httpPost('index_type',{},function(res){
          that.setData({
            goods_type: res.data.goods_type_up
          });
      });
  },

  getUserInfo: function(e) {
    console.log(e)
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
      url: "../goodsDetail/goodsDetail"
    })
  }
})
