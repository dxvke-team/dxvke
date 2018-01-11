// pages/orderList/orderList.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值 1虚拟 2实物 3全部
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据

    }],
    orderList: [], //订单列表 - LQ
    isShow:false,
    show:false,
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
    if(cur=="0"){
      this.setData({
        isShow:false
      })
    }else{
      this.setData({
        isShow: true
      })
    }
    if (this.data.currentTaB == cur) { return false; }
    else {
      that.setData({
        currentTab: cur
      });
      if (cur > 0){
        that.getOrderList(cur);
      }
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
  onLoad: function (e) {
    var type =e.type
    var that = this;
    if (type == "0") {
      this.setData({
        isShow: false
      })
    } else {
      this.setData({
        isShow: true
      })
    }
    if (this.data.currentTaB == type) { return false; }
    else {
      that.setData({
        currentTab: type
      });
      if (type > 0) {
        that.getOrderList(type);
      }
    }
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc,
          currentTab: type
        });
      }
    });
  },

  //查询订单列表 - 20180109 - LQ
  getOrderList:function(order_type){
    var that = this;
    http.httpPost('myOrder', {back_status:order_type},function(res){
      console.log(res.data.order_list)
      if(res.data.order_list.length==0){
        that.setData({
          orderList: res.data.order_list,
          show:false
        });
      }else{
        that.setData({
          orderList: res.data.order_list,
          show: true
        });
      }
      
      
    });
  },

  //添加订单 - 20180111 - LQ
  formSubmit:function(e){
    var that = this;
    var orderNum = e.detail.value.orderNum;
    http.httpPost('addOrder',{order_num:orderNum},function(res){
      if(res.code == 200){
        wx.showModal({
          content : res.data.message,
          showCancel : false
        })
      }else{
        wx.showModal({
          content: res.error,
          showCancel : false
        })
      }
    });
  },
  toShare:function(e){
    console.log(e)
    var num = e.target.dataset.num
    wx.navigateTo({
      url: '../share/share?num='+num,
    })
  }
})