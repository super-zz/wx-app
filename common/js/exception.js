//服务器的地址
var serverUrl = getApp().globalData.serverUrl
var appType = getApp().globalData.appType
var version = getApp().globalData.version
var token = wx.getStorageSync('token')

//验证失败跳转页面
function errorProcess(errcode) {
    //如果token有异常，跳转到绑定页面
    if (erroce == 30001) {
        wx.redirectTo({ url: '../login/login' })
    }
}





module.exports = {
    errorProcess: errorProcess
}