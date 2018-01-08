var http = require('../../utils/httpHelper.js')

// pages/acerstore/acerstore.js
var page = 1;

var GetList = function (that) {
  that.setData({
    hidden: false
  });

  http.httpPost('acerList',{limit:10,page:page},function(res){
    // var l = that.data.list
    var l = []
    for (var i = 0; i < res.data.acer_list.length; i++) {
      l.push(res.data.acer_list[i])
    }
    that.setData({
      list: l
    });
    // page++;
    that.setData({
      hidden: true
    });
  });
}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    acer:0,
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight-109
        });
      }
    });

    var member_id = wx.getStorageSync('member_id')
    //加载元宝数据与元宝商品数据 - 20170105 - LQ
    if (member_id > 0){
      http.httpPost('member_acer', {}, function (res) {
        console.log(res);
        that.setData({
          acer: res.data.member_acer
        });
      });
    }
    
    
  },
  onShow: function () {
    var that = this;
    GetList(that);
  },
  bindDownLoad: function () {
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    console.log('更新')
    page = 1;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },
  onPullDownRefresh: function () {
    console.log("下拉")
    page = 1;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },
  onReachBottom: function () {
    console.log("上拉");
  },
  toExchangeList:function(){
    wx.navigateTo({
      url: '../exchangeList/exchangeList',
    })
  }
})  