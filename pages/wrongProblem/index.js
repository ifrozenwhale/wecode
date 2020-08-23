//Page Object
// const md = require('./demo.md')
Page({
  data: {
    problem: '',
    type: ''
  },
  //options(Object)
  onLoad: function (option) {
    this.setData({
      problem: JSON.parse(decodeURIComponent(option.data))
    })
    var t = this.data.problem.result
    var info = ''
    switch (t) {
      case 0:
        info = "AC"
        break;
      case -1:
        info = "WA"
      case -2:
        info = "CE"
      case 3:
        info = "MLE"
      case 4:
        info = "RE"
      case 1:
      case 2:
        info = "TLE"
      default:
        break;
    }
    this.setData({
      type: info
    })

  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {}
})