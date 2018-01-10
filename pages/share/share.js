// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgs:[],
      content:"", //晒单感受
      orderNum:"", //订单号
  },
  chooseImageTap:function(e){
    let self = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            self.chooseWxImage('album',function(result){
              self.setData({
                imgs: result
              });
              console.log(self.data.ims);
            })
          } else if (res.tapIndex == 1) {
            self.chooseWxImage('camera', function (result) {
              self.setData({
                imgs : result
              });
            })
          }
        }
      }
    })
  },
  chooseWxImage: function (type,cb) {
    var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID  
    if (session_id != "" && session_id != null) {
      var header = { 'content-type': 'multipart/form-data', 'Cookie': 'PHPSESSID=' + session_id }
    } else {
      var header = { 'content-type': 'multipart/form-data' }
    } 
    let self = this;
    wx.chooseImage({
      count:9,//限制上传图片的数量，默认9张
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var images = res.tempFilePaths;
        typeof cb == "function" && cb(images);
      }
    })
  },

  //删除图片
  delImageTap : function(e){
    var that = this;
    var imgsIndex = e.currentTarget.dataset.id;
    var imgs = that.data.imgs;
    imgs.splice(imgsIndex,1);
    that.setData({
      imgs : imgs
    });
  },
  

  formSubmit :function(e){
    var content = e.detail.value.content;
    var orderNum = e.detail.value.orderNum;
    if (content == '' || content == null){
      wx.showModal({
        content: '请输入晒单评价',
        showCancel : false
      })
    }
  }

})