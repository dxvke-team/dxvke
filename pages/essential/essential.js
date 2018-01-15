// pages/essential/essential.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:'', //banner图 - LQ
    goodsList:[], //商品列表 - LQ
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //应季必备banner图 - 20180109 - LQ
    http.httpPost('season_banner',{
      member_id: wx.getStorageSync('member_id') 
    },function(res){
      that.setData({
        banner: res.data.banner[0]['banner_image']
      });
    });

    //应季必备商品 - 20180109 - LQ
    http.httpPost('seasonindex',{
      member_id: wx.getStorageSync('member_id') 
    },function(res){
      that.setData({
        goodsList: res.data.season_products
      });
    });
  },

  /**
   * 跳转商品详情 - 20180115 - LQ
   */
  toGoodsDetail:function(e){
    var goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id=' + goods_id,
    })
  }
})