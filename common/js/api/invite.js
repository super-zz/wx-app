//服务器的地址
var serverUrl = getApp().globalData.serverUrl
var appType = getApp().globalData.appType
var version = getApp().globalData.version
var token = getApp().globalData.token



function getList(page_num,cb) {
    wx.request({
        url: serverUrl + '/invite/getList?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {     
            page_num:page_num
           },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //成功
        success: function (res) {
            typeof cb == "function" && cb(res.data);
        },
        //失败用户继续重试
        fail: function () {
        },
    })
}




module.exports = {
    getList: getList
}