
var commonApi = require('../../common/js/api/common.js')
var app = getApp()
Page({
	data: {
		selectJob: [],
		jobTag: [],
		selectNum: 0,
		menuStatus: [],
		categoryList: null,
		userInfo: null,
		token: null
	},
	back: function () {
		var that = this
		wx.navigateBack({
			delta: 1, // 回退前 delta(默认为1) 页面
			success: function (res) {
				
				var length = Object.keys(getCurrentPages()).length
				var berforePage = getCurrentPages()[0];
				for (var i = 0; i < length; i++) {
					if (/pages\/postlist\/postlist/.test(getCurrentPages()[i].__route__)) {
						berforePage = getCurrentPages()[i]
					}
					if (/pages\/register\/register/.test(getCurrentPages()[i].__route__)) {
						berforePage = getCurrentPages()[i]
					}
				}
				//var berforePage = getCurrentPages()[length - 2] || getCurrentPages()[0];
				//var berforePage = getCurrentPages()[length - 1];
				var jobTag = that.data.jobTag
				var jobTagNames = [];
				var jobTagIds = [];
				for (var i = 0; i < jobTag.length; i++) {
					var item = jobTag[i].split('-')

					jobTagNames = jobTagNames.concat(item[0])
					jobTagIds = jobTagIds.concat(item[2] + ',' + item[1])
				}
				berforePage.data.selectJob = that.data.selectJob
				berforePage.data.jobTag = jobTag
				berforePage.data.jobTagIds = jobTagIds.join(';')
				berforePage.data.jobTagNames = jobTagNames
				berforePage.data.jobTagName = jobTagNames.join(' ')
				berforePage.setData({
					selectJob: berforePage.data.selectJob,
					jobTag: berforePage.data.jobTag,
					jobTagIds: berforePage.data.jobTagIds,
					jobTagNames: berforePage.data.jobTagNames,
					jobTagName: berforePage.data.jobTagName
				})
				typeof berforePage.search == "function" && berforePage.search()
				// success
			}
		})
	},

	onLoad: function (option) {
		if (option.selectJob) {
			this.data.selectJob = option.selectJob.split(',')
			this.data.jobTag = option.jobTag.split(',')
			this.data.selectNum = 5 - option.selectJob.split(',').length
		}
		this.setData({
			selectNum: 5 - this.data.selectNum,
			selectJob: this.data.selectJob,
			jobTag: this.data.jobTag
		})

		console.log('onLoad')
		var that = this
		//调用应用实例的方法获取全局数据
		app.getUserInfo(function (userInfo) {
			//更新数据
			that.setData({
				userInfo: userInfo
			})
		})

		app.getToken(function (token) {
			that.setData({
				token: token
			})
		})

		commonApi.getCategory(function (res) {
			if (res.errcode == 0) {
				var categoryList = res.data
				var length = Object.keys(categoryList).length
				var array = [];

				for (var i = 0; i < length; i++) {
					var obj = { 'name': categoryList[i].name };
					var majorCategory = categoryList[i];
					var majorCategoryLength = Object.keys(majorCategory.list).length
					var level = Math.ceil(majorCategoryLength / 4)
					var obj2 = [];
					for (var j = 0; j < level; j++) {
						var obj4 = []
						for (var x = j * 4; x < (j * 4 + 4) && x < majorCategoryLength; x++) {
							obj4 = obj4.concat({ name: majorCategory.list[x].name, list: majorCategory.list[x].list });
						}
						obj2 = obj2.concat([obj4]);
					}
					obj['list'] = obj2
					array = array.concat(obj);
				}
				console.log(array);
				that.data.menuStatus = that.initMenuDisplay(array);
				that.setData({
					categoryList: array,
					menuStatus: that.data.menuStatus
				})
			}
			else {
				console.log(res);
			}
		})
	},
	//小类目显示隐藏&&类别颜色状态
	classMenu: function (e) {
		var arrSub = e.currentTarget.dataset.id;
		arrSub = arrSub.split('-');
		var newMenuStatus = this.initMenuDisplay(this.data.categoryList);
		if (this.data.menuStatus[arrSub[0]][arrSub[1]][arrSub[2]] == 'show') {
			newMenuStatus[arrSub[0]][arrSub[1]][arrSub[2]] = 'hidden';
		} else {
			newMenuStatus[arrSub[0]][arrSub[1]][arrSub[2]] = 'show';
		}
		this.setData({
			menuStatus: newMenuStatus
		});
	},
	checkboxChange: function (e) {
		console.log(e.detail.value)
		console.log('checkbox发生change事件，携带value值为：', e.detail.value);
		if (e.detail.value.length > 5) {
			wx.showModal({
				title: '提示',
				content: '最多选择5个哟',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定')
					}
				}
			})
		} else {
			var checkArr = e.detail.value;
			var checkFilter = [];
			var checkName = [];
			for (var i = 0, len = checkArr.length; i < len; i++) {
				if (checkFilter.indexOf(checkArr[i]) == -1) {
					checkFilter.push(checkArr[i]);
				}
			}
			for (var i = 0, len = checkFilter.length; i < len; i++) {
				checkName.push(checkFilter[i].split('-')[0]);
			}
			this.data.selectNum = checkFilter.length;
			//this.data.selectJob = e.detail.value;
			this.setData({
				selectNum: 5 - this.data.selectNum,
				selectJob: checkName,
				jobTag: checkFilter
			})
		}
	},
	removeSelect: function (e) {
		this.data.selectJob.splice(e.target.dataset.i, 1);
		this.data.jobTag.splice(e.target.dataset.i, 1);
		console.log(this.data.selectJob.length);
		this.setData({
			selectNum: 5 - this.data.selectJob.length,
			selectJob: this.data.selectJob,
			jobTag: this.data.jobTag
		})
	},
	//返回一个页面隐藏元素数组
	initMenuDisplay: function (arr) {
		var menuarr = new Array();
		for (var i = 0, len = arr.length; i < len; i++) {
			menuarr[i] = new Array();
			for (var j = 0, len1 = arr[i].list.length; j < len1; j++) {
				menuarr[i][j] = new Array();
				for (var m = 0, len2 = arr[i].list[j].length; m < len2; m++) {
					for (var k = 0, len3 = arr[i].list[j][m].list.length; k < len3; k++) {
						menuarr[i][j][m] = new Array();
						menuarr[i][j][m].push('hidden');
					}
				}
			}
		}
		return menuarr;
	}



})
