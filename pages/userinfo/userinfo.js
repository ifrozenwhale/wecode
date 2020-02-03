const app = getApp()
Page({
  data: {
    showTopTips: false,

    radioItems: [
      {
        name: 'cell standard',
        value: '0'
      },
      {
        name: 'cell standard',
        value: '1',
        checked: true
      }
    ],
    checkboxItems: [
      {
        name: 'standard is dealt for u.',
        value: '0',
        checked: true
      },
      {
        name: 'standard is dealicient for u.',
        value: '1'
      }
    ],

    github: null,
    blog: null,
    major: null,
    username: "用户名",
    levels: ['初级', '中级', '高级'],
    levelIndex: 0,
    isAgree: false,
    holdGithub: '请输入github地址',
    holdBlog: '请输入博客地址',
    holdMajor: '请输入所学专业',
  },
  onLoad: function(options) {
    this.setData({
      github: app.appData.github,
      blog: app.appData.blog,
      major: app.appData.major,
      levelIndex: app.appData.level
    })
    if(app.appData.userInfo != null){
      this.setData({
        username: app.appData.userInfo.username
      })
    }
    if (app.appData.github != null) {
      this.setData({
        holdGithub: app.appData.github
      })
    }
    if (app.appData.blog != null) {
      this.setData({
        holdBlog: app.appData.blog
      })
    }
    if (app.appData.major != null) {
      this.setData({
        holdMajor: app.appData.major
      })
    }
    if (app.appData.level != null) {
      this.setData({
        levelIndex: app.appData.level
      })
    }
  },

  inputGithub: function(e) {
    this.setData({
      github: e.detail.value
    })
  },
  inputBlog: function(e) {
    this.setData({
      blog: e.detail.value
    })
  },

  inputMajor: function(e) {
    this.setData({
      major: e.detail.value
    })
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

  submit: function() {
    // 提交 post
    wx.request({
      url: 'http://172.0.0.1:9090/user/' + app.appData.userInfo.username,
      method: 'POST',
      data: {
        github: this.data.github,
        blog: this.data.blog,
        major: this.data.major,
        level: this.data.level
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data)
        wx.navigateBack({
          delta: 1 //小程序关闭当前页面返回上一页面
        })
        wx.showToast({
          title: '保存成功！',
          icon: 'success',
          duration: 2000
        })
      }
    })
    app.appData.github = this.data.github
    app.appData.blog = this.data.blog
    app.appData.level = this.data.level
    app.appData.major = this.data.major
    wx.navigateBack(1)

  },

  bindLevelChange: function(e) {
    console.log('picker level 发生选择改变，携带值为', e.detail.value)
    this.setData({
      levelIndex: e.detail.value
    })
  }
})
