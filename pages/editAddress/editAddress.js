// pages/editAddress/editAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['', '', '']
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})