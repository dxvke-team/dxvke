// pages/exchangeList/exchangeList.js
var http = require('../../utils/httpHelper.js');
// var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据

    }],
    banner:'', //粉丝福利banner
    sortList:[], //排序方式
    goodsList:[], //商品列表
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this;
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
      that.getGoodsList();
    }
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
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        });
      }
    });

    //banner - 20180108 - LQ
    http.httpPost('fanswelfare_banner',{
      member_id: wx.getStorageSync('member_id') 
    },function(res){
      console.log(res);
      that.setData({
        banner:res.data.banner[0]['banner_image']
      });
    });

    //排序方式 - 20180108 - LQ
    http.httpPost('fanswelfare_type',{
      member_id: wx.getStorageSync('member_id') 
    },function(res){
      that.setData({
        sortList: res.data.sorts,
        currentTab: res.data.sorts[0]['id']
      });
    });

    //商品 - 20180108 - LQ
    that.getGoodsList();

  },

  getGoodsList:function(){
    var that = this;
    http.httpPost('fanswelfare_product', { 
       sorts_type: that.data.currentTab,
       member_id: wx.getStorageSync('member_id') 
      },function(res){
      that.setData({
        goodsList: res.data.goods_list
      });
    });
  }
  // footerTap: app.footerTap
})