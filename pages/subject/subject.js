// pages/subject/subject.js
// var app = getApp();
var http = require('../../utils/httpHelper.js');
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 1, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据

    }],
    sortList:[], //排序方式 - LQ
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
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
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
  onLoad: function (options) {
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

    //排序方式 - 20180108 - LQ
    http.httpPost('nine_sort', {},function(res){
      that.setData({
        sortList: res.data.sorts_type,
        currentTaB : res.data.sorts_type[0]['id']
      });
      
    });


    //商品列表 - 20180108 - LQ
    http.httpPost('nine', { sort: that.data.currentTab, type_id:options.type_id},function(res){
        console.log(res);
        that.setData({
          goodsList: res.data.nine_products
        });
    });
  },
  // footerTap: app.footerTap
})