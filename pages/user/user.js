
const app = getApp();
var http = require('../../utils/httpHelper.js');
var login = require('../../utils/login.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },

  onLoad: function () {
    var that = this;
    login.dologin(function(res){
      that.setData({
        userInfo: res
      })
    })
},
toOrderList:function(e){
  wx.navigateTo({
    url: '../orderList/orderList',
  })
},
  toAddressList:function(e){
    wx.navigateTo({
      url: '../addressList/addressList',
    })
  },
  toMyTracks:function(e){
    wx.navigateTo({
      url: '../myTracks/myTracks',
    })
  }

})