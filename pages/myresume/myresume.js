var base = require('../../common/js/base.js')
var userApi = require('../../common/js/api/user.js')
var resumeApi = require('../../common/js/api/resume.js')
var verify = require('../../common/js/verify.js')
var app = getApp()

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1945; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({

  update: function (e) {
    var that = this
    if (!verify.name(that.data.resumeInfo.person)) {
      return false
    }
    that.data.resumeInfo.birthday_year = that.data.years[that.data.yearIndex];
    that.data.resumeInfo.birthday_month = that.data.months[that.data.monthIndex];
    userApi.updateBasic(
      that.data.resumeInfo.person,//persion,
      that.data.resumeInfo.sex,//sex,
      that.data.resumeInfo.birthday_year,//birthday_year,
      that.data.resumeInfo.birthday_month,//birthday_month,
      that.data.resumeInfo.open_status,//open_status,
      function (res) {
        if (res.errcode == 0) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({ delta: 1, })
        } else {
          console.log('error')
        }
      })
  },
  setPerson: function (e) {
    this.data.resumeInfo.person = e.detail.value
    this.setData({
      resumeInfo: this.data.resumeInfo
    })

  },



  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        avatarUrl: userInfo.avatarUrl
      })
    })

    app.getToken(function (token) {
      that.setData({
        token: token
      })
    })

    resumeApi.getLastResume(
      function (res) {
        if (res.errcode == 0) {
          var resumeInfo = res.data
          var yearNo = that.data.years.indexOf(parseInt(resumeInfo.birthday_year))
          var monthNo = that.data.months.indexOf(parseInt(resumeInfo.birthday_month))
          that.setData({
            resumeInfo: resumeInfo,
            yearIndex: yearNo > -1 ? yearNo : 0,
            monthIndex: monthNo > -1 ? monthNo : 0,
            date: resumeInfo.birthday_year + '-' + (resumeInfo.birthday_month < 10 ? '0' + resumeInfo.birthday_month : resumeInfo.birthday_month),
            personSex: [
              { name: '男', value: '0', checked: resumeInfo.sex == 0 ? true : false },
              { name: '女', value: '1', checked: resumeInfo.sex == 1 ? true : false }
            ],
            person: resumeInfo.person,
            openStatus: resumeInfo.open_status
          })
        }
        else if (res.errcode == 30006) {
          wx.redirectTo({
            url: '/pages/register/register'
          });
        }
      }
    )
  },
  switchChangeOpenStatus: function (e) {
    if (e.detail.value) {
      this.data.resumeInfo.open_status = 1;
    }
    else {
      this.data.resumeInfo.open_status = 0;
    }
    this.setData({
      resumeInfo: this.data.resumeInfo
    })

    console.log(e);
  },
  test: function () {
    console.log(33)
  },
  //数据
  data: {
    lan: '',
    userInfo: null,
    token: null,
    resumeInfo: null,
    openStatus: '',
    personSex: [
      { name: '男', value: '0' },
      { name: '女', value: '1' }
    ],
    date: null,
    years: years,
    yearIndex: 0,
    months: months,
    monthIndex: 0
  },
  choiceYear: function (e) {
    var that = this
    this.setData({
      yearIndex: parseInt(e.detail.value, 10),
      birthday: years[parseInt(e.detail.value, 10)] + '-' + months[that.data.monthIndex],
    })
  },
  choiceMonth: function (e) {
    var that = this
    console.log(e.detail.value);
    this.setData({
      monthIndex: parseInt(e.detail.value, 10),
      birthday: years[that.data.yearIndex] + '-' + months[parseInt(e.detail.value, 10)],
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },

  radioSex: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.personSex.length; i++) {
      if (checked.indexOf(this.data.personSex[i].name) !== -1) {
        if (i == 0) {
          this.data.resumeInfo.sex = 0;
        }
        else {
          this.data.resumeInfo.sex = 1;
        }
        this.setData({
          resumeInfo: this.data.resumeInfo
        })
        changed['personSex[' + i + '].checked'] = true
      } else {
        changed['personSex[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  choiceBirthday: function (e) {
    return true;
    var that = this
    var arrayDate = e.detail.value.split('-')
    this.data.resumeInfo.birthday_year = arrayDate[0];
    this.data.resumeInfo.birthday_month = arrayDate[1];
    this.setData({
      resumeInfo: that.data.resumeInfo,
      date: this.data.resumeInfo.birthday_year + '-' + this.data.resumeInfo.birthday_month
    })
  }
})