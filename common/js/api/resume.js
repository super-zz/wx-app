//服务器的地址
var serverUrl = getApp().globalData.serverUrl
var appType = getApp().globalData.appType
var version = getApp().globalData.version
var token = getApp().globalData.token


var userApi = require('user.js')



function bind(cb) {
    wx.request({
        url: serverUrl + '/user/bind?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {},
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //成功
        success: function (res) {
            typeof cb == "function" && cb(res.data);

        },
        //失败用户继续重试
        fail: function () {
        },
    })
}

function getLastResume(cb, cb2) {
    wx.request({
        url: serverUrl + '/resume/getLastResume?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {},
        header: { 'content-type': 'application/x-www-form-urlencoded' },

        success: function (res) {
            if (res.data.errcode == 30007) {
                userApi.getToken(function (token, isBind) {
                    wx.redirectTo({ url: '/pages/index/index' });
                });
            }
            else {
                typeof cb == "function" && cb(res.data);
            }
            //typeof cb == "function" && cb(res.data);


            // success
        },
        complete: function () {
            typeof cb2 == "function" && cb2();
        }
    })

}

function create(name, degree_id, salary_id, sex, city_domain, district_id, birthday_year, birthday_month, job_tag_ids, cb) {
    wx.request({
        url: serverUrl + '/resume/create?version=' + version
        + '&app_type=' + appType +
        '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            sex: sex, //性别（0：男；1：女）
            name: name, //姓名
            //period: 1, //工作年限
            degree_id: degree_id, //1:初中及以下,s2:高中，3：中专/技校，4：本科，5:硕士及以上
            district_id: district_id, //区域
            salary_id: salary_id,//期望薪资
            birthday_year: birthday_year, //出生年
            birthday_month: birthday_month, //出生月
            job_tag_ids: job_tag_ids, //期望职位
            city_domain: city_domain
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //成功
        success: function (res) {
            typeof cb == "function" && cb(res.data);
        },
        //失败用户继续重试
        fail: function () {
        },
    })
}

function updateBasic(person, sex, birthday_year,
    birthday_month, open_status, cb) {
    wx.request({
        url: serverUrl + '/user/updateBasic?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            person: person,
            sex: sex,
            birthday_year: birthday_year,
            birthday_month: birthday_month,
            open_status: open_status
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //
        success: function (res) {
            typeof cb == "function" && cb(res.data);
            // success
        },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
        }
    })
}

function deliver(wantedId, cb) {
    wx.request({
        url: serverUrl + '/resume/deliver?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            wantedId: wantedId
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //
        success: function (res) {
            typeof cb == "function" && cb(res.data);
            // success
        },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
        }
    })
}

function getList(cb) {
    wx.request({
        url: serverUrl + '/resume/getList?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'GET',
        data: {},
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //
        success: function (res) {
            typeof cb == "function" && cb(res.data);
            // success
        },
        fail: function () {
            // fail
        },
        complete: function () {
            // complete
        }
    })
}
function getDetail(puid, cb) {
    wx.request({
        url: serverUrl + '/resume/detail?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            puid: puid
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },

        success: function (res) {
            if (res.data.errcode == 30007) {
                userApi.getToken(function (token, isBind) {
                    wx.redirectTo({ url: '/pages/index/index' });
                });
            }
            else {
                typeof cb == "function" && cb(res.data);
            }
            //typeof cb == "function" && cb(res.data);


            // success
        },
    })

}

function entrust(puid, cb) {
    wx.request({
        url: serverUrl + '/resume/entrust?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            puid: puid
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //成功
        success: function (res) {
            typeof cb == "function" && cb(res.data);
        },
        //失败用户继续重试
        fail: function () {
        },
    })
}

function deleteResume(puid, cb) {
    wx.request({
        url: serverUrl + '/resume/delete?version=' +
        version + '&source_type=' + appType
        + '&token=' + getApp().globalData.token,
        method: 'POST',
        data: {
            puid: puid
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        //成功
        success: function (res) {
            typeof cb == "function" && cb(res.data);
        },
        //失败用户继续重试
        fail: function () {
        },
    })
}




module.exports = {
    getLastResume: getLastResume,
    create: create,
    updateBasic: updateBasic,
    deliver: deliver,
    getList: getList,
    getDetailByPuid: getDetail,
    deleteResume: deleteResume,
    entrust: entrust
}