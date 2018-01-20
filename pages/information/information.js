
var base = require('../../common/js/base.js')
var messageApi = require('../../common/js/api/message.js')
var app = getApp()

var app = getApp()
Page({
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

        messageApi.getNum(function (res) {
            if (res.errcode == 0) {
                that.setData({
                    //messageInfo: res.data
                })
            }
            else {

            }
        })

    },
    data: {
        userInfo: null,
        messageInfo: {invite:0,miss_call:0,viewed:0,system:0},
        footer: {
            findjob: 0,
            personcenter: 0,
            message: 1
        },
    }
})