//服务器的地址
var serverUrl = getApp().globalData.serverUrl
var appType = getApp().globalData.appType
var version = getApp().globalData.version
var token = getApp().globalData.token

function getWantedList(page_num,page_size,district_id,street_id,
welfare_ids,salary_id,job_tag_ids,cb) {
    wx.request({
        url: serverUrl + '/recommend/getWantedList?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            page_num:page_num,
            page_size:page_size,
            district_id:district_id,
            street_id:street_id,
            welfare_ids:welfare_ids,
            salary_id:salary_id,
            job_tag_ids:job_tag_ids
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //
        success: function (res) {
            typeof cb == "function" && cb(res.data);

        },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
        }
    })
}

module.exports = {
    getWantedList:getWantedList
}