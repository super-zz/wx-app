//服务器的地址
var serverUrl = getApp().globalData.serverUrl
var appType = getApp().globalData.appType
var version = getApp().globalData.version
var token = getApp().globalData.token



function getNum(cb) {
    wx.request({
        url: serverUrl + '/message/getNum?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {},
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


function getList(page_num, list_type, status, cb) {
    wx.request({
        url: serverUrl + '/message/getList?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            page_num: page_num,
            type: list_type,
            status: 0
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
    getNum: getNum,
    getList: getList
}