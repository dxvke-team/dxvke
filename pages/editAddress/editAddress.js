// pages/editAddress/editAddress.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo:{}, //地址详细信息 - LQ
    addressId : '', //地址id
  },
  onLoad:function(options){
    var that = this;
    http.httpGet('updateAddress',{address_id:options.id},function(res){
      console.log(res);
      that.setData({
        addressInfo : res.data.address_info,
        addressId: options.id
      });
    });
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  formSubmit: function(e)
  {
    var that = this;
    var address_id = that.data.addressId;
    var person_name = e.detail.value.person_name;
    var address = e.detail.value.address;
    var province = e.detail.value.province[0] + ' ' + e.detail.value.province[1] + ' ' + e.detail.value.province[2];
    var telephone = e.detail.value.telephone;

    http.httpPost('updateAddress',{
      address_id : address_id,
      person_name : person_name,
      telephone : telephone,
      address : province,
      detail : address
    },function(res){
      if (res.code == 200){
        wx.showModal({
          content: res.data.message,
          showCancel : false,
          success:function(result){
            if (result.confirm){
              wx.navigateTo({
                url: 'pages/addressList/addressList',
              })
            }
          }
        })
      }
    });
  }
})