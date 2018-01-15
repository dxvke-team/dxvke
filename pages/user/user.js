
const app = getApp();
var http = require('../../utils/httpHelper.js');
var login = require('../../utils/login.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    userAcer:0, //用用户元宝数
  },

  onLoad: function () {
    var that = this;
    login.dologin(function(res){
      console.log(res);
      that.setData({
        userInfo: res
      })
      //获取元宝数
      console.log(wx.getStorageSync('member_id'));
      http.httpPost('member_acer', { member_id: wx.getStorageSync('member_id') }, function (res) {
        that.setData({
          userAcer: res.data.member_acer
        });
      });
    })
},
toOrderList:function(e){
  console.log(e)
  var type = e.currentTarget.dataset.type
  wx.navigateTo({
    url: '../orderList/orderList?type='+type,
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
  },
  toExchangeList:function(e){
    wx.navigateTo({
      url: '../exchangeList/exchangeList',
    })
  },
  toSign:function(e){
    wx.navigateTo({
      url: '../sign/sign',
    })
  },
  toInfoCenter:function(e){
    wx.navigateTo({
      url: '../infoCenter/infoCenter',
    })
  },
  toFeedback:function(e){
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  toShareList:function(e){
    wx.navigateTo({
      url: '../shareList/shareList',
    })
  }

})