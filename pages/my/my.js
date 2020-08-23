var app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.appData.userInfo == null){
      wx.redirectTo({
        url: '../login/login',
      })
    }
    else{
      console.log("already")
      console.log(app.appData.userInfo)
      // var today = new Date()
      // var year = today.getFullYear()
      // var month = today.getMonth()
      // var cnt = new Date(year, month, 0)
      // var fd = new Date(year, month, 1)
      // var ld = new Date(year, month, 0)
      // var firstDay = util.formatTime(fd)
      // var lastDay = util.formatTime(ld)
      // wx.request({
      //   url: 'http://127.0.0.1:9090/api/calendar/daylist/root/' + firstDay + '/' + lastDay,
      //   header: { 'content-type': 'application/json' },
      //   method: 'GET',
      //   dataType: 'json',
      //   responseType: 'text',
      //   success: function(res) {
      //     console.log(res)     
      //   },
      //   fail: function(res) {},
      //   complete: function(res) {},
      // })

      this.setData({
        username: app.appData.userInfo.username
      })
    }
  },
  btnExit: function(){
    // app.appData.userInfo = null
    wx.redirectTo({
      url:"../login/login"
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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