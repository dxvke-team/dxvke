// pages/discount/discount.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1, //页码
    limie: 10, //每页显示条数 - LQ
    goodsList: [], //聚折扣商品列表 - LQ
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList()
  },

  getGoodsList:function(){
    var that = this;
    http.httpPost('discount', {
      page: that.data.page,
      limit: that.data.limit
    }, function (res) {
      console.log(res.data.discount_products)
      that.setData({
        goodsList: res.data.discount_products
      });
    });
  }
})