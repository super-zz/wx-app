var wantedApi = require('../../common/js/api/wanted.js')
var resumeApi = require('../../common/js/api/resume.js')
var pageObject = {

    showMore: function (e) {
        console.log(e)
        var height = this.data.describeHeight == 'auto' ? '250rpx' : 'auto'
        this.setData({
            describeHeight: height
        })
    },
    callPhone: function (e) {
        var that=this
        console.log(that.data.post.phone)
        wx.showModal({
            title: '确认拨出',
            content: '是否立即拨打' + that.data.post.phone,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.makePhoneCall({
                        phoneNumber: that.data.post.phone,
                        success: function () {
                            //console.log("拨打电话成功！")
                        },
                        fail: function () {
                            //console.log("拨打电话失败！")
                        }
                    })
                }
            }
        })

    },
    deliver: function () {
        var that = this
        resumeApi.deliver(that.data.post.puid, function (res) {
            if (res.errcode == 0) {
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
            }
            else {
                wx.showToast({
                    title: '投递失败',
                    icon: 'error',
                    duration: 2000
                })
            }
        })
    },

    onLoad: function (option) {
        var that = this
        wantedApi.getDetail(option.puid, function (res) {
            if (res.errcode == 0) {
                that.setData({
                    post: res.data.post,
                    company: res.data.company,
                    recommendPosts: res.data.recommendPosts
                })

            }
            else {
                wx.navigateBack({
                    delta: 1
                })
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
            }

        })

        console.log(333333333)
    },
    data: {
        post: null,
        title: null,
        puid: null,
        refresh_at: null,
        view_count: null,
        deliver_count: null,
        category_name: null,
        job_tag_name: null,
        employ_num: null,
        experience: null,
        education: null,
        address: null,
        district_name: null,
        street_name: null,
        description: null,
        welfare_tags: [],
        employer: null,
        is_hide_phone: null,
        comapny: null,
        recommendPosts: null
    }

}
Page(pageObject)