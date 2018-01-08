// pages/goodsDeatail/goodsDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:4,
     show:false,
     showService:true,
     showJuan:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show:false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
  click:function(e){
    this.setData({
      show:!this.data.show
    })
  },
  toHome:function(e){
    wx.switchTab({
      url: '../index/index',
    })
  },
  service:function(){
    this.setData({
      showService: false
    })
  },
  close:function(e){
    this.setData({
      showService: true
    })
  },
  showJuan:function(e){
    this.setData({
      showJuan: false
    })
  },
  closeJuan:function(e){
    this.setData({
      showJuan: true
    })
  }
})