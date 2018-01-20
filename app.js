//app.js
var base = require('common/js/base.js');
App({

    onLaunch: function () {
        console.log('App Launch')
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        var that = this
        wx.setStorageSync('logs', logs)
    },
    onShow: function () {
        var that = this
        this.getToken(function (token) {
        })
        wx.checkSession({
            success: function () {
                //登录态未过期
            },
            fail: function () {
                //登录态过期
                that.globalData.userInfo = null
                that.getUserInfo(function (userInfo) { })
                that.globalData.token = null
                that.getToken(function (token) { })
                wx.redirectTo({ url: '/pages/index/index' })
            }
        })
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.getUserInfo({
                            success: function (res) {
                                console.log(res)
                                that.globalData.userInfo = res.userInfo
                                typeof cb == "function" && cb(that.globalData.userInfo)
                            },
                            fail: function () {
                                console.warn('getUserInfo error')
                            }
                        })
                    } else {
                        console.warn('1获取用户登录态失败！' + res.errMsg)
                    }
                },
                fail: function () {
                    console.warn('1login error')
                }
            })
        }
    },
    getToken: function (cb) {
        var that = this
        var storageToken = wx.getStorageSync('token')
        var storageIsBind = wx.getStorageSync('isBind')
        if (storageToken) {
            this.globalData.token = storageToken
            this.globalData.isBind = storageIsBind
            typeof cb == "function" && cb(storageToken)
        }
        else if (this.globalData.token) {
            wx.setStorageSync('token', this.globalData.token)
            wx.setStorageSync('isBind', this.globalData.isBind)
            typeof cb == "function" && cb(this.globalData.token)
        } else {
            //调用登录接口
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.request({
                            url: that.globalData.serverUrl + '/user/getToken?version=' +
                            that.globalData.version + '&source_type=' + that.globalData.appType
                            + '&token=',
                            method: 'POST',
                            data: {
                                code: res.code,
                            },
                            header: { 'content-type': 'application/x-www-form-urlencoded' },
                            //
                            success: function (tokenRes) {
                                console.info(tokenRes);
                                if (tokenRes.data.errcode == 0) {
                                    that.globalData.token = tokenRes.data.data.token
                                    that.globalData.isBind = tokenRes.data.data.isBind
                                    wx.setStorageSync('token', that.globalData.token)
                                    wx.setStorageSync('isBind', that.globalData.isBind)
                                    typeof cb == "function" && cb(that.globalData.token)

                                }
                                else {
                                    console.warn('errocode !=0');
                                }
                            },
                            fail: function () {
                                console.warn('getToken error')
                            }
                        })
                    }
                    else {
                        console.warn('2获取用户登录态失败！' + res.errMsg)
                    }
                },
                fail: function () {
                    console.warn('2login error')
                },
            })
        }
    },
    //公共配置文件
    globalData: {
        userInfo: null,
        token: null,
        isBind: null,
        resumeInfo: null,
        serverUrl: 'https://zpapp.ganji.com',
        appType: 'gzt',
        version: '1.0.0',
    },
})

