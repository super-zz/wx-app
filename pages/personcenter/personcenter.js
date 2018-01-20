//postlist.js
var util = require('../../utils/util.js')
var base = require('../../common/js/base.js')

var userApi = require('../../common/js/api/user.js')
var resumeApi = require('../../common/js/api/resume.js')
var app = getApp()
Page({
  onShow: function () {

    this.getLastResume()
  },
  unbind: function () {
    userApi.unBind(function (res) {
      if (res.errcode == 0) {
        app.globalData.token = null
        app.globalData.isBind = 0
        wx.setStorageSync('token', null)
        wx.setStorageSync('isBind', 0)
        app.getToken(function (token) {
          getApp().globalData.token = token
          wx.setStorageSync('token', token)
          wx.redirectTo({
            url: '/pages/login/login'
          })
        })
      }
      else{
         wx.redirectTo({
            url: '/pages/index/index'
          })
      }
    })
  },
  onLoad: function () {
    var that = this

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
    //this.getLastResume()

  },
  getLastResume: function () {
    var that = this
    resumeApi.getLastResume(
      function (res) {
        if (res.errcode == 0) {
          console.log(res.data);
          var resumeInfo = res.data
          that.setData({
            resumeInfo: resumeInfo,
            person: resumeInfo.person,
            open_status: resumeInfo.open_status,
            integrity: resumeInfo.integrity
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
  data: {
    userInfo: null,
    token: null,
    resumeInfo: null,
    person: '',
    open_status: 0,
    integrity: '',
    logs: [],
    footer: {
      findjob: 0,
      personcenter: 1,
      message: 0
    },
  },
  interDetail: function () {
    console.log(11);
  }
})
