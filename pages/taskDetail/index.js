// pages/taskDetail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    id: '',
    title: '',
    endDate: '',
    sumDay: '',
    summary: '',
    indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    problems: []
  },
  showProblems: function() {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:9090/api/plan/problems/' + 'root/' + that.data.id,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        that.setData({
          problems: res.data.problems
        })
        wx.navigateTo({
          url: '../taskProblems/taskProblems?id=' + that.data.id + '&&planTitle=' + that.data.title
        })
      },
      fail: function(res) {},
      complete: function(res) {}
    })
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },

  showSummary: function() {
    this.setData({ show: true })
  },

  bindFormSubmit: function(e) {
    console.log(e.detail.value.textArea)
    var that = this
    var reqTask = wx.request({
      url: 'http://127.0.0.1:9090/api/plan/summary/' + that.data.id,
      data: e.detail.value.textArea,
      header: { 'content-type': 'application/json' },
      method: 'PUT',
      dataType: 'STRING',
      responseType: 'text',
      success: result => {
        console.log('success update summary')
        that.setData({ show: false })
      },
      fail: () => {},
      complete: () => {}
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      title: options.title,
      endDate: options.endDate,
      sumDay: options.sumDay,
      summary: options.summary,
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
