//app.js
var http = require('./utils/httpHelper.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('PHPSESSID',null);
    wx.setStorageSync('member_id', null);
  },

  globalFunction: function(){
    wx.checkSession({
      success:function(){
        
      }
    })
  },

  globalData: {
    userInfo: null,
    member_id : null
  }
})