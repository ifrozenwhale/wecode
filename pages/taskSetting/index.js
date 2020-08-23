var app = getApp()

Page({
  data: {
    showTopTips: false,
    problemTips: "选择题目",
    problemList: [],
    title: null,
    description: null,
    radioItems: [
      { name: 'cell standard', value: '0' },
      { name: 'cell standard', value: '1', checked: true }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],

    date_1: '2016-09-01',
    date_2: '2019-10-10',

    countryCodes: ['+86', '+80', '+84', '+87'],
    countryCodeIndex: 0,

    countries: ['中国', '美国', '英国'],
    countryIndex: 0,

    accounts: ['微信号', 'QQ', 'Email'],
    accountIndex: 0,

    isAgree: false
  },
  onLoad(e) {
    this.setData({
      problemList: wx.getStorageSync('problemList')
    })
    console.log(this.data.problemList)
    if(this.data.problemList.length != 0){
      this.setData({
        problemTips: "选择完成"
      })
    }
  },
  showTopTips: function() {
    var that = this
    this.setData({
      showTopTips: true
    })
    setTimeout(function() {
      that.setData({
        showTopTips: false
      })
    }, 3000)
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    var radioItems = this.data.radioItems
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value
    }

    this.setData({
      radioItems: radioItems
    })
  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true
          break
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    })
  },
  bindDateChangeSt: function(e) {
    this.setData({
      date_1: e.detail.value
    })
  },
  bindDateChangeEd: function(e) {
    this.setData({
      date_2: e.detail.value
    })
  },

  bindAccountChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value)

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    })
  },
  getProblem(e) {
    wx.navigateTo({
      url: '../problems/problems',
      success: result => {},
      fail: () => {},
      complete: () => {}
    })
  },
  submit(e) {
    console.log(e.detail.value.textArea)
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textArea)
    console.log(this.data.problemList)
    wx.request({
      // url: 'http://127.0.0.1/api/plan/' + app.appData.userInfo.username,
      url: 'http://127.0.0.1:9090/api/plan/' + 'root',
      data: {
        id: 13,
        startDate: this.data.date_1,
        endDate: this.data.date_2,
        title: this.data.title,
        description: e.detail.value.textArea,
        status: 0,
        strProblems: JSON.stringify(this.data.problemList)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //使用POST方法要带上这个header
      },
      method: 'POST',
      success: result => {
        console.log('succ')
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: () => {
        console.log('fail')
      },
      complete: () => {}
    })
  },
  inputTitle(e) {
    this.setData({
      title: e.detail.value
    })
    console.log(this.data.title);
    
  },
  bindDesc(e) {
    this.setData({
      description: e.detail.value
    })
  }
})
