// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModel:true,
    show:false
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  toAcerstore:function(e){
    wx.navigateTo({
      url: '../acerstore/acerstore',
    })
  },
  toExchangeList:function(){
    wx.navigateTo({
      url: '../exchangeList/exchangeList',
    })
  },
  toShareList:function(){
    wx.navigateTo({
      url: '../shareList/shareList',
    })
  },
  // 点击签到
  sign:function(e){
    this.setData({
      showModel: false,
      show:true
    })
  },
  close:function(){
    this.setData({
      showModel:true
    })
  }
})