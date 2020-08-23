//Page Object
Page({
  data: {
    count: 0
  },
  //options(Object)
  
  onLoad: function(options){
    var that = this
    wx.request({
      url: 'http://127.0.0.1:9090/api/calendar/maxDays/' + '沃若的小号鸭',
      data: '',
      header: {
        "content-type": "application/json" 
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log("succ")
        that.setData({
          count: res.data
        })
        console.log(res.data)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  },
  setPlan: function () {
    wx.navigateTo({
      url: '../task/task',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    })
  }
});