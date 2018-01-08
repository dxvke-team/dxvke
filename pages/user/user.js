
const app = getApp();
var http = require('../../utils/httpHelper.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },

  onShow: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] == null) {
          that.login();
        }
        else if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '',
            content: '需要开启用户信息才能使用此权限',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: function (res) {
                    that.login();
                  }
                })
              }
            }
          })
        }
        else if (res.authSetting['scope.userInfo']) {
          that.login();
        }
      }
    })
  },

  login:function() {
    var that = this;
    //调用登录接口
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              //发起网络请求
              var userInfo = res.userInfo;
              app.globalData.userInfo = userInfo;
              http.httpPost('login', { code: code }, function (res) {
                //将session_key存档
                wx.setStorageSync('LoginSessionKey', res.session_key);
                wx.setStorageSync('member_id', res.member_id);
                that.setData({
                  userInfo: userInfo
                });
              });
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },


getUserInfo: function() {
  var that = this;
  wx.getUserInfo({
    success: res => {
      app.globalData.userInfo = res.userInfo;
      console.log(res.userInfo);
      http.httpPost('checkMember', { member_id: wx.getStorageSync('member_id'),userInfo:res.userInfo},function(){});
      
      that.setData({
        userInfo: res.userInfo
      })
    }
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