// pages/subject/subject.js
// var app = getApp();
var http = require('../../utils/httpHelper.js');
Page({
  data: {
    page1: 1,
    page2: 1,
    page3: 1,
    page4: 1,
    limit:10,
    currentTab: 1, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    sortList:[], //排序方式 - LQ
    goodsList1:[], //商品列表
    goodsList2: [], //商品列表
    goodsList3: [], //商品列表
    goodsList4: [], //商品列表
    type_id:''
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function (options) {
    var that = this;
    //排序方式 - 20180108 - LQ
    http.httpPost('nine_sort', {
      member_id: wx.getStorageSync('member_id') 
    },function(res){
      that.setData({
        sortList: res.data.sorts_type,
        currentTaB : res.data.sorts_type[0]['id'],
        type_id: options.type_id
      });
      
    });
    that.getGoodsList1(options.type_id)
    that.getGoodsList2(options.type_id)
    that.getGoodsList3(options.type_id)
    that.getGoodsList4(options.type_id)
  },
  //商品列表 - 20180108 - LQ
  getGoodsList1: function (type_id){
    var that = this;
    http.httpPost('nine', { sort: 1, type_id: type_id, page: that.data.page1, limit: that.data.limit, member_id: wx.getStorageSync('member_id')  }, function (res) {
      console.log(res);
      that.setData({
        goodsList1: res.data.nine_products
      });
    });
  },
  //商品列表 - 20180108 - LQ
  getGoodsList2: function (type_id) {
    var that = this;
    http.httpPost('nine', { sort: 2, type_id: type_id, page: that.data.page2, limit: that.data.limit, member_id: wx.getStorageSync('member_id')  }, function (res) {
      console.log(res);
      that.setData({
        goodsList2: res.data.nine_products
      });
    });
  },
  //商品列表 - 20180108 - LQ
  getGoodsList3: function (type_id) {
    var that = this;
    http.httpPost('nine', { sort: 3, type_id: type_id, page: that.data.page3, limit: that.data.limit, member_id: wx.getStorageSync('member_id')  }, function (res) {
      console.log(res);
      that.setData({
        goodsList3: res.data.nine_products
      });
    });
  },
  //商品列表 - 20180108 - LQ
  getGoodsList4: function (type_id) {
    var that = this;
    http.httpPost('nine', { sort: 4, type_id: type_id, page: that.data.page4, limit: that.data.limit, member_id: wx.getStorageSync('member_id')  }, function (res) {
      console.log(res);
      that.setData({
        goodsList4: res.data.nine_products
      });
    });
  },

  /**
   * 跳转商品详情 - 20180115 - LQ
   */
  toGoodsDetail:function(e){
    var goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id='+goods_id,
    })
  }
  
})