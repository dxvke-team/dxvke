var config = require('../config.js') 
function Get (url, data, cb ){
  var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID  
  if (session_id != "" && session_id != null) {
    var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id }
  } else {
    var header = { 'content-type': 'application/x-www-form-urlencoded' }
  } 
	wx.showNavigationBarLoading();
	wx.request({
        method:'GET',
		url: config.HTTP_BASE_URL + url,
		data: data,
    header:header,
		success: (res) => {
			typeof cb == "function" && cb(res.data,"");
      if (session_id == "" || session_id == null) {
        wx.setStorageSync('PHPSESSID', res.data.session_id) //如果本地没有就说明第一次请求 把返回的session id 存入本地  
      }  
			wx.hideNavigationBarLoading();
		},
		fail:(err) => {
			typeof cb == "function" && cb(null,err.errMsg);
			wx.hideNavigationBarLoading();
		}
	});
};

function Post (url,data, cb ){
  console.log(config.HTTP_BASE_URL + url);
  var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID  
  if (session_id != "" && session_id != null) {
    var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id }
  } else {
    var header = { 'content-type': 'application/x-www-form-urlencoded' }
  } 

	wx.request({
    method:'POST',
		url:  config.HTTP_BASE_URL + url,
		data: data,
    header: header,
		success: (res) => {
			typeof cb == "function" && cb(res.data,"");
      if (session_id == "" || session_id == null) {
        wx.setStorageSync('PHPSESSID', res.data.session_id) //如果本地没有就说明第一次请求 把返回的session id 存入本地  
      }  
		},
		fail:(err) => {
			typeof cb == "function" && cb(null,err.errMsg);
			console.log("http请求:"+config.HTTP_url);
			console.log(err)
		}
	});
};

function Upload (url ,file ,data, cb ){
	wx.uploadFile({
		url:  config.HTTP_BASE_URL + url,
		filePath: file,
		name:"file",
		formData:data,
		success: (res) => {
			if( typeof(res.data)=="string"  ){
				typeof cb == "function" && cb( JSON.parse(res.data),"");
			}else{
				typeof cb == "function" && cb(res.data,"");	
			}
			
		},
		fail:(err) => {
			typeof cb == "function" && cb(null,err.errMsg);
		}
	});
};


module.exports ={
    httpGet:Get,
    httpPost:Post,
	httpUpload:Upload
};