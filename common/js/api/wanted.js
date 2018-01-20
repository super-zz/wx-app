//服务器的地址
var serverUrl = getApp().globalData.serverUrl
var appType = getApp().globalData.appType
var version = getApp().globalData.version
var token = getApp().globalData.token



function detail(puid,cb) {
    wx.request({
        url: serverUrl + '/wanted/detail?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            puid:puid
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
    getDetail: detail
}