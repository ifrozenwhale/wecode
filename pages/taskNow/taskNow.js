// pages/taskDetail/index.js
import Dialog from '../../dist/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    show: false, 
    indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    problems: []
  },
  showProblems: function () {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:9090/api/plan/problems/' + 'root/' + that.data.id,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          problems: res.data.problems
        })
        wx.navigateTo({
          url: '../taskProblems/taskProblems?id=' + that.data.id + '&&planTitle=' + that.data.title,
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    that.setData({
      title: options.title,
      endDate: options.endDate,
      description: options.description,
      startDate: options.startDate,
      id: options.id
    })
  },
  showDesc: function(){
    Dialog.alert({
      title: '计划描述',
      message: this.data.description
    }).then(() => {
      // on close
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onClose() {
    this.setData({ show: false });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})