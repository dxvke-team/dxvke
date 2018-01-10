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
    http.httpPost('season_banner',{},function(res){
      that.setData({
        banner: res.data.banner[0]['banner_image']
      });
    });

    //应季必备商品 - 20180109 - LQ
    http.httpPost('seasonindex',{},function(res){
      that.setData({
        goodsList: res.data.season_products
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})