// pages/goodsDeatail/goodsDetail.js
var http = require('../../utils/httpHelper.js');
var login = require('../../utils/login.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:4,
     show:false,
     showAcer:true,
     showService:true,
     showJuan:true,
     goodsDetail:{}, // 商品详情 - LQ
     likeList:[], //猜你喜欢商品列表 - LQ
     command:'', //淘口令
     ewm:'', //客服二维码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      show:false
    });
    that.getProductDetail(options);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //判断登录 - 20180108 - LQ
    var that = this;
    login.dologin(function (res) {
      that.setData({
        userInfo: res
      });
      app.globalData.userInfo = res;
    });
  },
  click:function(e){
    this.setData({
      show:!this.data.show
    })
  },
  toHome:function(e){
    wx.switchTab({
      url: '../index/index',
    })
  },
  service:function(){
    var that = this;
    http.httpPost('serviceEwm',{},function(res){
      that.setData({
        ewm : res.data.ewm
      });
      that.setData({
        showService: false
      })
    });
    
  },
  close:function(e){
    this.setData({
      showService: true
    })
  },
  showJuan:function(e){
    var that = this;
    var condition = {
      click_url: e.currentTarget.dataset.click_url,
      pict_url: e.currentTarget.dataset.picy_url,
      title: e.currentTarget.dataset.title,
    };
    http.httpPost('command', condition,function(res){
      that.setData({
        command: res.data.command
      });
      that.setData({
        showJuan: false
      })
    });
  },
  closeJuan:function(e){
    this.setData({
      showJuan: true
    })
  },

  /**
   * 获取商品详情 - 20180112 - LQ
   */
  getProductDetail: function(options){
    var that = this;
    http.httpPost('goodsDetail', { goods_id: options.id, type: options.type }, function (res) {
      that.setData({
        goodsDetail: res.data
      });
      //猜你喜欢商品列表 - 20180108 - LQ
      http.httpPost('relevance', { id: that.data.goodsDetail.id }, function (res) {
        that.setData({
          likeList: res.data.goodsList
        });
      });
    });
  },

  toDetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../goodsDetail/goodsDetail?id=" + id
    })
  }
})