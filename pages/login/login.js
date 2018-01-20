var userApi = require('../../common/js/api/user.js')
var resumeApi = require('../../common/js/api/resume.js')
var verify = require('../../common/js/verify.js')
var interaction = require('../../common/js/interaction.js')
var base = require('../../common/js/base.js')
//服务器的地址

var app = getApp();
Page({
    onLoad: function (options) {

        console.log('login onLoad')
        var that = this
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

        app.getToken(function (token) {
            that.setData({
                token: token
            })
        })
    },
    onReady: function () {
        console.log('login onReady')
    },
    //页面数据存储
    data: {
        userInfo: null,
        token: null,
        inputPhone: null,
        inputCode: null,
        inputDefault: null,
        codeTimeText: '发送验证码',
        codeTimeOut: false,
        isSendCode: false
    },
    //输入手机号
    loginInputPhone: function (e) {
        this.setData({
            inputPhone: e.detail.value
        })
    },
    //输入验证码
    loginInputCode: function (e) {
        this.setData({
            inputCode: e.detail.value
        })
    },
    //点击登录
    login: function () {

        if (!verify.phone(this.data.inputPhone)) {
            return false;
        }
        if (!verify.phoneCode(this.data.inputCode)) {
            return false;
        }
        //登录发起网络请求
        //=====================>
        userApi.bind(this.data.inputPhone, this.data.inputCode, function (res) {
            if (res.errcode == 0) {
                app.globalData.token = res.data.token
                getApp().globalData.token = res.data.token
                app.globalData.isBind = 1
                wx.setStorageSync('token', app.globalData.token)
                wx.setStorageSync('isBind', app.globalData.isBind)
                wx.showToast({
                    title: '绑定成功',
                    icon: 'loding',
                    duration: 2000
                })
                resumeApi.getLastResume(function (resumeRes) {
                    if (resumeRes.errcode == 0) {
                        wx.switchTab({
                            url: '/pages/postlist/postlist'
                            //url: '/pages/logs/logs'
                        });
                    }
                    else {
                        wx.redirectTo({
                            url: '/pages/register/register'
                        });
                    }
                });

            }
            else {
                wx.showToast({
                    title: '验证码错误',
                    icon: 'loding',
                    duration: 2000
                })
            }
        });
        //  base.verify(res.data);

        //=========================>

    },
    //获取验证码
    getCode: function () {

        if (!verify.phone(this.data.inputPhone)) {
            return false;
        }
        //发起网络请求,下发验证码
        userApi.getPhoneCode(this.data.inputPhone, function (res) {
            console.log(res);
        });

        //验证手机号
        //console.log(interaction.verifyTel(this.data.inputPhone));
        //发送验证码
        var that = this;
        var sum = 60;
        if (!that.data.isSendCode) {
            that.data.isSendCode = true;
            that.setData({
                codeTimeOut: true
            })
            var timer = setInterval(function () {
                if (sum == 0) {
                    that.setData({
                        codeTimeOut: false,
                        codeTimeText: '发送验证码'
                    })
                    that.data.isSendCode = false;
                    clearInterval(timer);
                } else {
                    that.setData({
                        codeTimeText: sum--
                    })
                }
            }, 1000);
        }
    }
})


