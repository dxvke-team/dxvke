// pages/searchPage/searchPage.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus:true,
    show:true,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据

    }],
    hotWords: [], //热门搜索词 - LQ
    historyWords: [], //历史搜索词 - LQ
    sortList: [], //排序方式 - LQ
    goodsList: [], //搜索结构 - LQ
  },
  toClose:function(e){
    wx.navigateBack();
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

    // 热门搜索词 - 20180109 - LQ
    http.httpPost('searchHot',{},function(res){
      that.setData({
        hotWords : res.data.hot 
      });
    });

    // 历史搜索词 - 20180109 - LQ
    http.httpPost('searchPage',{},function(res){
      that.setData({
        historyWords: res.data.history
      });
    });

    //搜索结果排序方式 - 20180109 - LQ
    http.httpPost('serrchSort',{},function(res){
      that.setData({
        sortList : res.data.sorts_type,
        currentTab: res.data.sorts_type[0]['id']
      });
    });
  },
  // 清空搜索历史 - 20180109 - LQ
  clearHistory:function(){
    http.httpPost('delSearch',{},function(){});
  },

  // 获取焦点事件
  bindfocus:function(e){
    this.setData({ show: true });
  },
  // 开始搜索
  bindconfirm:function(e){
    var that = this;
    //搜索商品 - 20180109 - LQ
    var searchWord = e.detail.value;
    http.httpPost('doSearch',{
      keywords : searchWord,
      sort: 　that.data.currentTab
    },function(res){
      that.setData({
        goodsList: res.data.product_list
      });
      that.setData({ show: false });
    });
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   console.log('下拉啦')
  },

})