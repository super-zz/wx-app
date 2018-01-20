var resumeApi = require('../../common/js/api/resume.js')
var app = getApp()
var pageObject = {



    onLoad: function (option) {
        var that = this
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo,
                img: userInfo.avatarUrl
            })
        })

        app.getToken(function (token) {
            that.setData({
                token: token
            })
        })

        resumeApi.getList(function (res) {
            if (res.errcode == 0) {
                that.setData({
                    resumeList: res.data
                });
            }
            else {
                console.log('error')
            }
        })
    },
    data: {
        resumeList: null,
        userInfo: null,
        token: null
    }

    ,
    entrustResume: function (e) {
        var that = this
        resumeApi.entrust(e.target.dataset.puid, function (res) {
            if (res.errcode == 0) {
                var length = Object.keys(that.data.resumeList).length
                var newResumeList = []
                for (var i = 0; i < length; i++) {
                    if (i == e.target.dataset.index) {
                        if (that.data.resumeList[i].is_entrust == 1) {
                            that.data.resumeList[i].is_entrust = 0
                        }
                        else {
                            that.data.resumeList[i].is_entrust = 1
                        }
                    }
                    newResumeList = newResumeList.concat(that.data.resumeList[i])

                }
                that.setData({
                    resumeList: newResumeList
                })
                wx.showToast({
                    title: '操作成功',
                    icon: 'success',
                    duration: 2000
                })
            }
            else {
                wx.showToast({
                    title: '操作失败',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },
    deleteResume: function (e) {
        var that = this

        var length = Object.keys(that.data.resumeList).length
        if (length == 1) {
            wx.showToast({
                title: '最后一份简历不能删除',
                icon: 'success',
                duration: 2000
            })
            return false;
        }
        resumeApi.deleteResume(e.target.dataset.puid, function (res) {
            if (res.errcode == 0) {

                var newResumeList = []
                for (var i = 0; i < length; i++) {
                    if (i != e.target.dataset.index) {
                        newResumeList = newResumeList.concat(that.data.resumeList[i])
                    }
                }
                wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                })
                if (newResumeList.length == 0) {
                    wx.redirectTo({ url: '/pages/register/register' })
                }
                else {
                    that.setData({
                        resumeList: newResumeList
                    })
                }
            }
            else if (res.errcode == 30006) {
                wx.redirectTo({ url: '/pages/register/register' })
            }
            else {
                wx.showToast({
                    title: '操作失败',
                    icon: 'success',
                    duration: 2000
                })
                resumeApi.getLastResume(
                    function (res) {
                        if (res.errcode == 0) {
                            wx.switchTab({
                                url: '/pages/postlist/postlist',
                                success: function (res) {
                                    console.info(res);
                                    console.info('go postlist success');
                                },
                                fail: function () {
                                    console.info('go postlist fail');
                                }
                            })
                        }
                        else if (res.errcode == 30006) {
                            wx.redirectTo({ url: '/pages/register/register' })
                        }
                    })
            }
        })

    }

}
Page(pageObject)