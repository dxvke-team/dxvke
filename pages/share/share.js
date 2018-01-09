// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgs:[]
  },
  chooseImageTap:function(e){
    let self = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            self.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            self.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    let self = this;
    wx.chooseImage({
      count:1,//限制上传图片的数量，默认9张
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = [];
        tempFilePaths.push(res.tempFilePaths)

        var imgs = self.data.imgs
        console.log(tempFilePaths[0])
        wx.uploadFile({
          url: 'http://192.168.1.101/api/upload', //接口地址
          filePath: tempFilePaths,
          name: "images",
          // formData:{
          //   images:tempFilePaths[0]
          // },
          success: function (res) {
            var data = res.data
            console.log(data)
          },

        })












        // var imgs = self.data.imgs;
        // for (var i = 0; i < tempFilePaths.length; i++) {
        //   if (imgs.length >= 9) {
        //     self.setData({
        //       imgs: imgs
        //     });
        //     return false;
        //   } else {
        //     imgs.push(tempFilePaths[i]);
        //   }
        // }
        // console.log(imgs);
        // self.setData({
        //   imgs: imgs
        // });
      }
    })
  }
})