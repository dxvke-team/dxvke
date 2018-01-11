// pages/exchange/exchange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1
  },
  reduce:function(){
    if(this.data.num<=0){
        return
    }else{
      var num = this.data.num - 1
      this.setData({
        num: num
      })
    }
   
  },
  add:function(){
    var num = this.data.num + 1
    this.setData({
      num:num
    })
  },
  toAddressList:function(){
    wx.navigateTo({
      url: '../addressList/addressList',
    })
  }
})