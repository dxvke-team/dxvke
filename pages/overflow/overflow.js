// pages/overflow/overflow.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    banner:{}, //banner图
    timeList:[], //抢购时间列表
    goodsList:[], //抢购商品
    page:1, //页码
    limit:10, //每页显示条数
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
      });
      this.getPanicList();
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

    // banner - 20180108 - LQ
    http.httpPost('newspaper_banner',{
      member_id: wx.getStorageSync('member_id') 
    },function(res){
      that.setData({
        banner: res.data.banner[0]['banner_image']
      });
    });

    //抢购时间 - 20180108 - LQ
    http.httpPost('newspaper_time',{
      member_id: wx.getStorageSync('member_id') 
    },function(res){
      var timeList = res.data.time;
      var time = timeList[0]['panic_id'];
      for (var index in timeList){
        if (timeList[index]['status'] == 2){
          var time = timeList[index]['panic_id'];
        }
      }
      that.setData({
        timeList: timeList,
        currentTab : time
      });
    });

    //抢购商品 - 20180108 - LQ
    that.getPanicList();
  },

  getPanicList:function(){
    var that = this;
    var condition = {
      panic_id: that.data.currentTab,
      page: that.data.page,
      limit: that.data.limit,
      member_id: wx.getStorageSync('member_id') 
    };
    http.httpGet('overflow', condition, function (res) {
      that.setData({
        goodsList : res.data.goods_list
      });
    });
  }
})