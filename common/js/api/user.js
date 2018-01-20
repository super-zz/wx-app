//服务器的地址
var serverUrl = getApp().globalData.serverUrl
var appType = getApp().globalData.appType
var version = getApp().globalData.version
var token = getApp().globalData.token



function bind(phone, code, cb) {
    wx.request({
        url: serverUrl + '/user/bind?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            phone: phone,
            code: code
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //成功
        success: function (res) {
            if (res.data.errcode == 30007) {
                getApp().globalData.token = null;
                getToken(function () { });
            }
            else {
                typeof cb == "function" && cb(res.data);
            }


        },
        //失败用户继续重试
        fail: function () {
        },
    })
}
function getPhoneCode(phone, cb) {
    wx.request({
        url: serverUrl + '/user/getPhoneCode?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            phone: phone,
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //成功倒计时
        success: function (res) {
            typeof cb == "function" && cb(res.data);
        },
        //失败用户继续重试
        fail: function () {
        },
    })
}
function updateBasic(person, sex, birthday_year,
    birthday_month, open_status, cb) {
    wx.request({
        url: serverUrl + '/user/updateBasic?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            person: person,
            sex: sex,
            birthday_year: birthday_year,
            birthday_month: birthday_month,
            open_status: open_status
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //
        success: function (res) {
            typeof cb == "function" && cb(res.data);
            // success
        },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
        }
    })
}

function getToken(cb) {
    var that = getApp()
    //调用登录接口
    wx.login({
        success: function (res) {
            wx.request({
                url: serverUrl + '/user/getToken?version=' +
                version + '&source_type=' + appType + '&token=',
                method: 'POST',
                data: {
                    code: res.code,
                },
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                //
                success: function (tokenRes) {
                    if (tokenRes.data.errcode == 0) {
                        that.globalData.token = tokenRes.data.data.token
                        that.globalData.isBind = tokenRes.data.data.isBind
                        wx.setStorageSync('token', that.globalData.token)
                        wx.setStorageSync('isBind', that.globalData.isBind)
                        typeof cb == "function" && cb(that.globalData.token, that.globalData.isBind)

                    }
                    else {
                        console.log('error');
                    }
                }
            })

        }
    })
}

function unBind(cb) {
    wx.request({
        url: serverUrl + '/user/unBind?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'GET',
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



module.exports = {
    bind: bind,
    getPhoneCode: getPhoneCode,
    updateBasic: updateBasic,
    getToken: getToken,
    unBind: unBind
}