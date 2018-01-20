var resumeApi = require('../../common/js/api/resume.js')
var userApi = require('../../common/js/api/user.js')
var inviteApi = require('../../common/js/api/invite.js')
var messageApi = require('../../common/js/api/message.js')

var app = getApp()
Page({
    onLoad: function (option) {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
        console.log(option.type);
        var barTitle = '';
        switch (parseInt(option.type)) {
            case 0:
                barTitle = '面试邀请';
                break;
            case 1:
                barTitle = '面试消息';
                break;
            case 2:
                barTitle = '未接电话';
                break;
            case 3:
                barTitle = '谁看过我';
                break;
            case 4:
                barTitle = '系统消息';
                break;
            default:
                barTitle = '面试邀请';
                break;
        }
        console.log(barTitle);
        wx.setNavigationBarTitle({
            title: barTitle
        })
        if (option.type == 0) {
            inviteApi.getList(1, function (res) {
                if (res.errcode == 0) {
                    console.log(res.data.list)
                    var length = Object.keys(res.data.list)
                    that.setData({
                        messageCount: length,
                        messageList: res.data.list
                    })
                }
                else {

                }
            })
        }
        else {
            messageApi.getList(1, option.type, 0, function (res) {
                if (res.errcode == 0) {
                    console.log(res.data.list)
                    var length = Object.keys(res.data.list)
                    that.setData({
                        messageCount: length,
                        messageList: res.data.list
                    })
                }
                else {

                }
            })
        }






    },
    data: {
        userInfo: null,
        messageList: null,
        messageCount:0
    }

})