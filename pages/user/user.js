
const app = getApp();
var http = require('../../utils/httpHelper.js');
var login = require('../../utils/login.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },

  onShow: function () {
    var that = this;
    login.dologin(function(res){
      that.setData({
        userInfo: res
      });
      app.globalData.userInfo = res;
    });
  }

})