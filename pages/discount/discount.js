// pages/discount/discount.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1, //页码
    limit: 10, //每页显示条数 - LQ
    goodsList: [], //聚折扣商品列表 - LQ
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    http.httpPost('discount',{
      page:that.data.page,
      limit:that.data.limit,
      member_id: wx.getStorageSync('member_id') 
    },function(res){
      console.log(res);
      that.setData({
        goodsList: res.data.discount_products
      });
    });
  },

  /**
   * 进入详情页 - 20180115 - LQ
   */
  toGoodsDetail:function(e){
    var goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id='+goods_id+'&type=3',
    })
  }
})