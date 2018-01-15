// pages/classify/classify.js
var http = require('../../utils/httpHelper.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    limit:10,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    http.httpPost('goodslist',{
        cate_id:options.id,
        limit:that.data.limit,
        page:that.data.page,
        member_id: wx.getStorageSync('member_id') 
      },function(res){
      that.setData({
        goods: res.data.goodsList
      });

      console.log(that.data.goods);
    });
  }
})