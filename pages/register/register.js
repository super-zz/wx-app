var user = require('../../common/js/exception.js')
var resumeApi = require('../../common/js/api/resume.js')
var commonApi = require('../../common/js/api/common.js')
var verify = require('../../common/js/verify.js')
var config = require('../../common/js/config.js')
var app = getApp();

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1954; i <= date.getFullYear(); i++) {
    years.push(i)
}

for (let i = 1; i <= 12; i++) {
    months.push(i)
}

for (let i = 1; i <= 31; i++) {
    days.push(i)
}

Page({
    //数据
    data: {
        userInfo: null,
        token: null,
        personSex: [
            { name: '男', value: '0', checked: 'true' },
            { name: '女', value: '1' }
        ],
        date: '请选择',
        selectEdu: '请选择',
        selectSalary: '请选择',
        selectProvince: '请选择',
        selectCity: '请选择',
        eduIndex: 0,
        eduArr: ['请选择', '111研究生及以上', '本科', '大专', '中专/技校', '高中', '初中及以下'],
        postIndex: 0,
        postArr: ['请选择', '销售', '清洁工', '保姆', '司机', '前台', '客服'],
        payIndex: 0,
        payArr: ['请选择', '1000元以下', '1000-2000元', '2000-3000元', '3000-5000元', '5000-8000元', '8000-12000元', '12000-20000元', '20000元以上', '面议'],
        addrIndex: 0,
        addrArr: ['请选择', '海淀', '海淀', '海淀', '海淀'],
        cityList: [],
        provinceList: [],
        provinceIndex: 0,
        cityArr: [],
        cityIndex: 0,
        name: null,
        degreeId: null,
        salaryId: null,
        sex: 0,
        districtId: null,
        birthday: '1990-1',
        citys: null,
        cityDomain: null,
        jobTagIds: '',
        jobTagName: '请选择',
        jobTagNames: null,
        selectJob: [],
        jobTag: [],
        years: years,
        yearIndex: 35,
        yearShow: '请选择',
        monthShow: '请选择',
        months: months,
        monthIndex: 0
    },
    choiceYear: function (e) {
        var that = this
        var selectIndex = 44
        if (e.detail.value !== '' && !isNaN(e.detail.value)) {
            selectIndex = parseInt(e.detail.value, 10)
        }
        this.setData({
            yearIndex: selectIndex,
            birthday: years[selectIndex] + '-' + months[that.data.monthIndex],
            yearShow: years[selectIndex]
        })
    },
    choiceMonth: function (e) {
        var that = this
        var selectIndex = 0
        if (e.detail.value !== '' && !isNaN(e.detail.value)) {
            selectIndex = parseInt(e.detail.value, 10)
        }
        this.setData({
            monthIndex: selectIndex,
            birthday: years[that.data.yearIndex] + '-' + months[selectIndex],
            monthShow: months[selectIndex]
        })
    },
    radioSex: function (e) {
        var checked = e.detail.value
        if (checked == 0) {
            this.data.personSex[0].checked = true;
            this.data.personSex[1].checked = false;
        }
        else {
            this.data.personSex[1].checked = true;
            this.data.personSex[0].checked = false;
        }

        this.setData({
            sex: checked
        })

    },
    choiceBirthday: function (e) {
        this.setData({
            date: e.detail.value,
            birthday: e.detail.value
        })
    },
    choiceEdu: function (e) {
        var index = 0
        if (e.detail.value != '' && !isNaN(e.detail.value)) {
            index = parseInt(e.detail.value)
        }
        var that = this
        this.setData({
            selectEdu: that.data.degreeOption[index].name,
            degreeId: that.data.degreeOption[index].id
        })

    },
    choicePost: function (e) {
        var that = this
        this.setData({
            postIndex: e.detail.value,
        })
    },
    choicePay: function (e) {
        var that = this
         var index = 0
        if (e.detail.value != '' && !isNaN(e.detail.value)) {
            index = parseInt(e.detail.value)
        }
        this.setData({
            selectSalary: that.data.salaryOption[index].name,
            salaryId: that.data.salaryOption[index].id
        })
    },
    choiceProvince: function (e) {
        var that = this;
        var citys = this.data.country[e.detail.value].citys;
        var length = Object.keys(citys).length
        var cityList = []
        for (var i = 0; i < length; i++) {
            cityList = cityList.concat(citys[i].name);
        }
        that.setData({
            selectProvince: that.data.provinceList[e.detail.value],
            selectCity: '请选择',
            cityId: null,
            citys: citys,
            cityList: cityList,
            cityDomain:''
        })
    },
    choiceCity: function (e) {
        var that = this

        this.setData({
            selectCity: that.data.cityList[e.detail.value],
            cityDomain: that.data.citys[e.detail.value].domain
        })
    },
    setName: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    complete: function (e) {
        console.log(this.data.birthday);
        //return true;
        this.data.districtId = -1
        if (verify.name(this.data.name) &&
            verify.birthday(this.data.birthday) &&
            verify.degree(this.data.degreeId) &&
            verify.jobTag(this.data.jobTagIds) &&
            verify.salary(this.data.salaryId) &&
            verify.city(this.data.cityDomain) &&
            verify.district(this.data.districtId)) {


            //return false;

            var that = this
            resumeApi.create(
                that.data.name,//'name',
                that.data.degreeId,//degree_id,
                that.data.salaryId,//salary_id,
                that.data.sex,//sex,
                that.data.cityDomain,//district_id,
                that.data.districtId,//district_id,
                that.data.birthday.split('-')[0],//birthday_year,
                that.data.birthday.split('-')[1],//birthday_month,
                that.data.jobTagIds,//that.data.jobTagIds,//job_tag_ids,
                function (res) {
                    if (res.errcode == 0) {
                        wx.switchTab({
                            url: '/pages/postlist/postlist'
                        });
                    } else {
                        console.log('error')
                    }
                })
        }
    },
    onShow: function () {
        console.log(333)
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this

        var area = config.filter.area
        var areaLength = area.length
        var provinceList = [];
        for (var i = 0; i < areaLength; i++) {
            provinceList = provinceList.concat(area[i].name)
        }
        this.setData({
            country: area,
            provinceList: provinceList,
            cityList: '先选择省份',
            degreeOption: config.filter.degree,
            salaryOption: config.filter.salary,
            eduArr: that.keyValue(config.filter.degree),
            payArr: that.keyValue(config.filter.salary),
        })

        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo
            })
        })

        app.getToken(function (token) {
            that.setData({
                token: token
            })
        })
        resumeApi.getLastResume(function (resumeRes) {
            if (resumeRes.errcode == 0) {
                wx.switchTab({
                    url: '/pages/postlist/postlist',
                    success: function (res) {
                        console.info(res);
                        console.info('register go postlist success');
                    },
                    fail: function () {
                        console.info('register go postlist fail');
                    }
                })
            }
        });
    },

    keyValue: function (array) {
        var length = Object.keys(array).length
        var values = [];
        for (var i = 0; i < length; i++) {
            values = values.concat(array[i].name);
        }
        return values;
    }
})

