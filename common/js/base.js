function verify(data) {
    switch (data.errcode) {
        case 30007:
            RedirectToBind();
            break;
        case 10:
            RedirectToTest();
            break;
        default:
    }
    console.log(data.errcode);
    if (data.data) {
        console.log(data.data);
    }

    return data;
}

function RedirectToBind() {
    wx.redirectTo({
        url: '/pages/login/login',
    })
}

function RedirectToTest() {
    wx.redirectTo({
        url: '/pages/index/index',
    })
}

function isResume(that) {
    wx.request({
        url: that.globalData.serverUrl + '/resume/getLastResume?version=' +
        that.globalData.version + '&source_type=' + that.globalData.appType
        + '&token=' + that.globalData.token,
        method: 'POST',
        data: {},
        header: { 'content-type': 'application/x-www-form-urlencoded' },

        success: function (resumeRes) {
            wx.setStorageSync('resumeInfo', resumeRes.data.data)
            if (resumeRes.data.data) {
                wx.redirectTo({
                    //url: '/pages/postlist/postlist'
                    url: '/pages/logs/logs'
                });
            }
            else {
                wx.redirectTo({
                    url: '/pages/register/register'
                });
            }

            // success
        },
    })

}

function goRecommendPage() {
    wx.redirectTo({
        url: '/pages/postlist/postlist',
        
    })
}

function goUserCenterPage() {
    wx.redirectTo({
        url: '/pages/personcenter/personcenter',
    })
}
function goMessagePage() {
    wx.redirectTo({
        url: "/pages/information/information",
    })
}


module.exports = {
    verify: verify,
    isResume: isResume,
    goRecommendPage: goRecommendPage,
    goUserCenterPage: goUserCenterPage,
    goMessagePage: goMessagePage
}