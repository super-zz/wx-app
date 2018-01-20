//postlist.js
var util = require('../../utils/util.js')
var base = require('../../common/js/base.js')
var recommendApi = require('../../common/js/api/recommend.js')
var resumeApi = require('../../common/js/api/resume.js')
var commonApi = require('../../common/js/api/common.js')
var config = require('../../common/js/config.js')

var app = getApp()

var pageObject = {
	onReachBottom: function () {
		//this.getPost()
		// Do something when page reach bottom.
	},
	deliver: function (e) {
		var that = this
		resumeApi.deliver(e.target.dataset.puid, function (res) {
			if (res.errcode == 0) {
				wx.showToast({
					title: '投递成功',
					icon: 'success',
					duration: 2000
				})
			}
			else {
				wx.showToast({
					title: '投递失败',
					icon: 'error',
					duration: 2000
				})
			}
		})
	},
	onPullDownRefresh1: function () {
		console.log('onPullDownRefresh', new Date())
		wx.stopPullDownRefresh()
		this.getPost()
	},

	onLoad: function (option) {
		var that = this
		this.data.pageNum = 0
		console.log('onLoad')
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

		try {
			var res = wx.getSystemInfoSync()
			console.log(res.model)
			console.log(res.pixelRatio)
			console.log(res.windowWidth)
			console.log(res.windowHeight)
			console.log(res.language)
			console.log(res.version)
			console.log(res.platform)
			this.setData({ height: res.windowHeight + 'px' })
		} catch (e) {
			// Do something when catch error
		}

		for (var i = 0, length = config.filter.welfare.length; i < length; i++) {
			config.filter.welfare[i].isSelect = 0
		}
		that.setData({
			salaryList: config.filter.salary,
			welfareList: config.filter.welfare
		})
		this.getPost()



	},
	onShow: function () {
		var that = this
		//return false
		resumeApi.getLastResume(function (res) {
			if (res.errcode == 30006) {
				//wx.navigateTo({
				wx.redirectTo({
					url: '/pages/register/register'
				})
			}
			else if (res.errcode == 0) {
				var resumeInfo = res.data
				if (that.data.jobTagName == '') {
					that.setData({
						jobTagName: resumeInfo.job_tag
					})
				}
				that.setData({
					resumeInfo: resumeInfo,
				})
				if (that.data.areaList == null) {
					commonApi.getArea(resumeInfo.city_domain, function (getAreaRes) {
						if (getAreaRes.errcode == 0) {
							var districtObj = new Object({ district_id: '-1', name: '不限', url: '', list: [] })
							var arr = new Array(districtObj)
							var areaList = getAreaRes.data
							var length = Object.keys(areaList).length
							for (var i = 0; i < length; i++) {
								var streetObj = new Object({ street_id: '-1', name: '不限', url: '' })
								var streetArr = new Array(streetObj)
								streetArr = streetArr.concat(areaList[i].list)
								areaList[i].list = streetArr
							}
							arr = arr.concat(getAreaRes.data)
							that.setData({
								areaList: arr,
								streetList: getAreaRes.data[0].list
							})
							console.log(getAreaRes.data)
							console.log(getAreaRes.data[0].list)
						}
					})
				}
			}
			else {
				console.log(res.errcode);
			}
		}, function () { })

	},

	selectSalary: function (e) {
		var index = e.target.dataset.index
		if (this.data.selectSalaryIndex == index) {
			index = -1;
		}
		this.setData({
			selectSalaryIndex: index
		});
	},
	selectWelfare: function (e) {
		var index = e.target.dataset.index

		if (this.data.welfareList[index].isSelect == 1) {
			this.data.welfareList[index].isSelect = 0;
		}
		else {
			this.data.welfareList[index].isSelect = 1;
		}
		this.setData({
			welfareList: this.data.welfareList
		});
	},
	selectDistrict: function (e) {
		console.log(e.target.dataset.index)
		var streetList = this.data.areaList[e.target.dataset.index].list

		this.setData({
			selectDistrictIndex: e.target.dataset.index,
			areaList: this.data.areaList,
			streetList: streetList,
			selectStreetIndex: 0
		})

	},
	selectStreet: function (e) {
		this.setData({
			selectStreetIndex: e.target.dataset.index
		})
	},


	data: {
		isPullDown: 1,
		postTotal: null,
		pageSize: 10,
		pageNum: 0,
		districtId: -1,
		streetId: -1,
		welfareIds: -1,
		salaryId: -1,
		jobTagIds: '',
		userInfo: null,
		token: null,
		logs: [],
		sortshow: 'fal',
		areaHidden: false,
		payHidden: false,
		wealHidden: false,
		modelHidden: false,
		postList: [],
		resumeInfo: null,
		areaList: null,
		streetList: null,
		selectDistrictIndex: null,
		selectStreetIndex: null,
		test: 'ttt',
		welfareList: null,
		salaryList: null,
		selectSalaryIndex: null,
		selectWelfareIndex: null,
		jobTagName: '',
		jobTagNames: null,
		selectJob: [],
		scrollTop: 100,
		jobTag: [],
		height: '100xp',
		hiddenLoading: true,
		footer: {
			findjob: 1,
			personcenter: 0,
			message: 0
		}
	},
	//点击区域|薪资|福利 出发此事件 发送请求获取二级及详细信息
	tabAreaDetail: function (e) {
		this.data.areaHidden = !this.data.areaHidden;
		this.data.modelHidden = this.data.areaHidden || this.data.payHidden || this.data.wealHidden;
		this.setData({
			areaHidden: this.data.areaHidden,
			payHidden: false,
			wealHidden: false,
			modelHidden: this.data.modelHidden
		});
	},
	tabPayDetail: function (e) {
		this.data.payHidden = !this.data.payHidden;
		this.data.modelHidden = this.data.areaHidden || this.data.payHidden || this.data.wealHidden;

		this.setData({
			areaHidden: false,
			payHidden: this.data.payHidden,
			wealHidden: false,
			modelHidden: this.data.modelHidden
		});

	},
	tabWealDetail: function (e) {
		this.data.wealHidden = !this.data.wealHidden;
		this.data.modelHidden = this.data.areaHidden || this.data.payHidden || this.data.wealHidden;

		this.setData({
			areaHidden: false,
			payHidden: false,
			wealHidden: this.data.wealHidden,
			modelHidden: this.data.modelHidden
		});
	},
	//点击蒙层关闭tab
	touchModel: function () {
		this.data.areaHidden = false;
		this.data.payHidden = false;
		this.data.wealHidden = false;
		//this.search()
		this.setData({
			areaHidden: false,
			payHidden: false,
			wealHidden: false,
			modelHidden: false
		});
	},

	getCondition: function () {

		var welfareList = this.data.welfareList
		var welfareLength = Object.keys(welfareList).length
		var welfareIds = new Array();
		for (var i = 0; i < welfareLength; i++) {
			if (welfareList[i].isSelect == 1) {
				welfareIds = welfareIds.concat(welfareList[i].id)
			}
		}
		welfareIds = welfareIds.join(',')
		var areaList = this.data.areaList
		var districtId = this.data.resumeInfo.district_id
		var streetId = this.data.resumeInfo.street_id
		if (areaList[this.data.selectDistrictIndex] != null) {
			districtId = areaList[this.data.selectDistrictIndex].district_id
			if (areaList[this.data.selectDistrictIndex].list[this.data.selectStreetIndex] != null) {
				streetId = this.data.areaList[this.data.selectDistrictIndex].list[this.data.selectStreetIndex].street_id
			}
		}
		var salaryId = this.data.resumeInfo.salary_id
		if (this.data.salaryList[this.data.selectSalaryIndex] != null) {
			salaryId = this.data.salaryList[this.data.selectSalaryIndex].id
		}

		this.setData({
			pageNum: 0,
			districtId: districtId,
			streetId: streetId,
			welfareIds: welfareIds,
			salaryId: salaryId,
			isPullDown: 1
		})

	},
	scroll: function (e) {
		console.log(e)
	},

	loadMore: function () {

		this.getPost()
	},

	search: function () {
		this.touchModel()
		this.data.pageNum = 0;
		this.data.postList = []

		this.setData({
			pageNum: this.data.pageNum,
			postList: this.data.postList
		})
		this.getCondition()
		this.getPost()
	},

	getPost: function () {

		var that = this
		if (that.data.isPullDown == 1) {
			this.setData({
				hiddenLoading: true
			});
			that.data.pageNum = parseInt(that.data.pageNum) + 1
			recommendApi.getWantedList(
				that.data.pageNum,
				that.data.pageSize,
				that.data.districtId,
				that.data.streetId,
				that.data.welfareIds,
				that.data.salaryId,
				that.data.jobTagIds
				, function (res) {

					//base.verify(res.data);
					if (res.errcode == 0) {
						var currentDataCount = Object.keys(res.data.list).length
						that.setData({
							hiddenLoading: false,
							postList: that.data.postList.concat(res.data.list),
							postTotal: res.data.count,
							pageNum: res.data.page_num,
							pageSize: res.data.page_size,
							isPullDown: (currentDataCount + (parseInt(res.data.page_num) - 1) * parseInt(res.data.page_size) < parseInt(res.data.count)) ? 1 : 0,
						})
					}
				})
		}
		else {
			this.setData({
				hiddenLoading: false
			});
			wx.showToast({
				title: '没有数据了',
				icon: 'success',
				duration: 2000
			})

		}

	}

}

Page(pageObject)
