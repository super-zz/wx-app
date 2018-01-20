var deliveryApi = require('../../common/js/api/delivery.js')
var app = getApp()
var btns = ['getAll', 'getViewed', 'getInvite']

var PageObject = {
    getInvite2: function (e) {
        console.log(e);
    },
    onLoad: function () {

        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
        this.getAll(0)

    },
    data: {
        getAllCss: null,
        getInviteCss: null,
        getViewedCss: null,
        pageNum: 1,
        userInfo: null,
        messageList:null,
        messageCount:0
    },

    getList: function () {

    }
}

for (var i = 0; i < btns.length; i++) {
    (function (btn) {
        PageObject[btn] = function (e) {
            var index = 0
            if (isNaN(e)) {
                index = e.currentTarget.dataset.type
            }
            else {
                index = e
            }
            console.log()
            var changedData = {}

            for (var j = 0; j < btns.length; j++) {
                var key = btns[j] + 'Css'
                if (j == index) {

                    changedData[key] = 'current'
                }
                else {
                    changedData[key] = ''
                }
            }
            this.setData(changedData)

            var that = this
            deliveryApi.getList(this.data.pageNum, index, function (res) {
                if (res.errcode == 0) {
                    var length =Object.keys(res.data).length
                    that.setData({
                        messageList: res.data,
                        messageCount:length
                    })
                    console.log(res.data)
                }
                else {

                }
            })

        }
    })(btns[i])
}

Page(PageObject)