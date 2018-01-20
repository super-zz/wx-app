var resumeApi = require('../../common/js/api/resume.js')
var app = getApp()
var pageObject = {



    onLoad: function (option) {
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

        resumeApi.getDetailByPuid(option.puid, function (res) {
            if (res.errcode == 0) {
                that.setData({
                    resumeInfo: res.data
                });
            }
            else {
                console.log(res);
            }

        })


    },
    data: {
        resumeInfo: null,
        userInfo: null,
        token:null
    }

}
Page(pageObject)