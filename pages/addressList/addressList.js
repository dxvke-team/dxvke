// pages/addressList/addressList.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      checked:false,
      addressList:[], //地址列表 - LQ

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取地址列表 - 20180109 - LQ
    that.getAddressList();
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
  toEdit:function(e){
    var address_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../editAddress/editAddress?id='+address_id,
    })
  },

  //删除地址
  delAddress:function(e)
  {
    var that = this;
    var address_id = e.currentTarget.dataset.id
    http.httpPost('delAddress',{address_id:address_id},function(res){
      if(res.code == 200){
        that.getAddressList();
        var title = '删除成功';
      }else{
        var title = '删除失败';
      }
      wx.showModal({
        content: title,
        showCancel:false
      })
    });
  },

  //查询地址列表 - 20180109 - LQ
  getAddressList:function(){
    var that = this;
    http.httpPost('address_list', {}, function (res) {
      var addressList = res.data.address_list;
      that.setData({
        addressList: addressList
      });
    });
  }
})