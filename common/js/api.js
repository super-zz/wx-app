app=getApp()
function bind(){
           wx.request({
            url: app.globalData.serverUrl + '/user/bind?version=' +
            app.globalData.version + '&source_type=' + app.globalData.appType
            + '&token=' + app.globalData.token,
            method: 'POST',
            data: {},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            //成功
            success: function (res) {
                base.verify(res.data);
                if (res.data.errcode == 0) {
                    wx.setStorageSync('token', res.data.token)
                    base.isResume(app);
                }
            },
            //失败用户继续重试
            fail: function () {
            },
        })
}