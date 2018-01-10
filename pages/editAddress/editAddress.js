// pages/editAddress/editAddress.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo:{}, //地址详细信息 - LQ

  },
  onLoad:function(options){
    var that = this;
    http.httpGet('updateAddress',{address_id:options.id},function(res){
      console.log(res);
      that.setData({
        addressInfo : res.data.address_info
      });
    });
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})