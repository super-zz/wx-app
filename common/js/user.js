//服务器的地址
var serverUrl = getApp().globalData.serverUrl
var appType = getApp().globalData.appType
var version = getApp().globalData.version
var openId = wx.getStorageSync('openId')

//绑定微信用户和赶集用户
function bindUser() {
  //调用登录接口
  wx.login( {
    //获取用户基本信息
    success: function( res ) {
      //拿到用户code获取用户openid信息
      if( res.code ) {
        //发起网络请求
        wx.request( {
          url: '',
          data: {
            code: res.code
          }
        })
      } else {
        console.log( '获取用户登录态失败！' + res.errMsg )
      }
    }
  })
}

//获得微信个人信息
function getWeixinUserInfo() {
  //调用登录接口
  wx.login( {
    //获取用户基本信息
    success: function() {
      wx.getUserInfo( {
        success: function( res ) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb( that.globalData.userInfo )
        }
      })
    }
  })
}
//下发手机验证码
function getPhoneCode( phone ) {
  //console.log( serverUrl + '/app.php' )
  //console.log( phone )
  //发起网络请求
  wx.request( {
    url: serverUrl + '/index/getPhoneCode/',
    method: 'POST',
    data: {
      token: wx.getStorageSync( 'token' ),
      phone: phone,
      appType: appType,
      version: version,
    },
    header: {'content-type':'application/x-www-form-urlencoded'},
    //成功倒计时
    success: function( res ) {
      console.log( res )
    },
    //失败用户继续重试
    fail: function() {
    },
  })
}

//验证手机code
function checkPhoneCode( phone, code ) {
  //发起网络请求
  //=====================>
  wx.request( {
    url: serverUrl + '/appUser/login',
    method: 'POST',
    data: {
      phone: phone,
      code: code,
      openId: openId,
      appType: appType,
      version: version,
    },
    header: {},
    //成功倒计时
    success: function( res ) {
      console.log( res.data )
      return res.data
    },
    //失败用户继续重试
    fail: function() {
    },
  })
  //=========================>
}

module.exports = {
  bindUser: bindUser,
  getWeixinUserInfo: getWeixinUserInfo,
  getPhoneCode: getPhoneCode,
  checkPhoneCode: checkPhoneCode
}

