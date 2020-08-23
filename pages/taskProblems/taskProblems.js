var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    planTitle: null,
    problemId: [],
    problem: [],  
    result: [],
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.title)
    this.setData({
      id: options.id,
      planTitle: options.planTitle
    })
    var that = this
    wx.request({
      url: 'http://127.0.0.1:9090/api/plan/problems/' + 'root/' + that.data.id,
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: result => {
        console.log(result)
        that.setData({
          problem: result.data
        })
      },
      fail: () => {
        console.log('Wrong')
      },
      complete: () => { }
    })
  },
  onChange(e) {
    console.log(e.detail)

    this.setData({
      result: e.detail
    })
  },
  toggle(event) {
    const { index } = event.currentTarget.dataset
    const checkbox = this.selectComponent(`.checkboxes-${index}`)
    checkbox.toggle()
  },
  toDetail(e) {
    wx.navigateTo({
      url: 'problemDetail/problemDetail',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  submit(e) {
    wx.navigateBack({
      delta: 1
    });
    // wx.navigateTo({
    //   url: '../taskSetting/index?problemList=' + this.data.result,
    //   success: (result)=>{
    //     console.log("success");       
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
  },
  noop() { },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})
