//index.js
//获取应用实例
var resumeApi = require('../../common/js/api/resume.js')
var app = getApp()
Page({
  data: {
    userInfo: {},
    //token:null,
  },
  verifyToken: function () {
    console.info('index getApp()')
    console.info(app);
    if (app.globalData.token) {
      console.info('index token')
      console.info(app.globalData.token);
      if (app.globalData.isBind == 1) {
        console.info('index isBind')
        console.info(app.globalData.isBind);
        resumeApi.getLastResume(
          function (res) {
            console.info('index getLastResume');
            console.info(res);
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
               wx.redirectTo({
                url: '/pages/register/register',
                 success: function (res) {
                  console.info(res);
                  console.info('go register success');
                },
                fail: function () {
                  console.info('go register fail');
                }
              });
            }
          }
        )
      }
      else {
        wx.login({
          success: function (res) {
            console.warn(res)
            console.warn(getCurrentPages())
            wx.redirectTo({
              url: '/pages/login/login',
              success: function () {

                console.info('go3 login success');

                // success
              },
              fail: function () {
                console.info('go login fail');
                // fail
              }
            })
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })

      }

    } else {
      console.log('token error');
    }
  },
  onLoad: function () {
    console.log('index onLoad')
    var that = this



    /*wx.navigateTo({
                 //wx.redirectTo({
                   url: '/pages/postlist/postlist'
                 });
    */

  },
  onShow: function () {
    var that = this
    console.log('index onShow')
    app.getToken(function (token) {
      that.verifyToken();
    })
  
//    setTimeout(this.go, 3000)
  },
  onReady: function () {
    var that = this
    console.log('index onReady');
    app.getToken(function (token) {
      //that.verifyToken();
    })
    console.log('index go');

  },
  go: function () {
    var that = this
    that.verifyToken();
  },
  onHide: function () {
    console.log('onHide');
    var that = this
    app.getToken(function (token) {
      //that.verifyToken();
    })
  }
})
