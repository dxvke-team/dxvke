//app.js
var http = require('./utils/httpHelper.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('PHPSESSID',null);
    wx.setStorageSync('member_id', null);
    wx.setEnableDebug({
      enableDebug: true
    })
  },

  globalFunction: function(){
    wx.checkSession({
      success:function(){
        
      }
    })
  },

  //上传图片 - 20180110 - LQ
  uploadimg: function (data) {
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'logo',
      formData: {
        id: data.id
      },
      success: function (res) {
        success++;
        console.log(res)
        console.log(i);

      },
      fail: function (res) {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: function (res) {
        console.log(i);
        i++;
        if (i == data.path.length) {  //当图片传完时，停止调用       
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    })
  },  

  globalData: {
    userInfo: null,
    member_id : null
  }
})