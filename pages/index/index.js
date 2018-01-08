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
    imgUrls: [],
    goods:[],
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
      http.httpPost("index_banner", {}, function (res) {
        that.setData({
          imgUrls: res.data.index_banner
        });
      });

      http.httpPost('index_goods',{},function(res){
          that.setData({
              goods : res.data.goods
          });
      })
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
      url:"../classify/classify"
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
