const app = getApp();

Page({
  data: {		//此处定义本页面中的全局变量
    result: '',
    username: '',
    passwd: ''
  },  
  inputName: function (e) {	// 用于获取输入的账号
    this.setData({
      username: e.detail.value	//将获取到的账号赋值给username变量
    })
  },
  inputPwd: function (e) {		// 用于获取输入的密码
    this.setData({
      passwd: e.detail.value	//将获取到的账号赋值给passwd变量
    })
  },


  log: function (e) {		//与服务器进行交互
    wx.request({
      url: 'http://127.0.0.1:9090/user/' + this.data.username,
      header: {
        "content-type": "application/json" //使用POST方法要带上这个header
      },
      method: "GET",
      dataType: 'json',
      success: res => {
        app.appData.github = res.data.github
        app.appData.major = res.data.userMajor
        app.appData.blog = res.data.blog
        app.appData.level = res.data.level
        console.log('-----------');
        
        console.log(app.appData.level);
        
      }

    })
     console.log('-----------')

     console.log(app.appData.level)
        
    wx.request({
      url: 'http://127.0.0.1:9090/login',	//获取服务器地址，此处为本地地址
      //url: 'https://baidu.com',
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {		//向服务器发送的信息
        username: this.data.username,
        passwd: this.data.passwd
      },
      success: res => {
        var resDate = res.data
        if (resDate == true || 1 == 1) {
          this.setData({
            result: "登录成功"
          })
          app.appData.userInfo = {username:this.data.username, passwd:this.data.passwd}
          console.log("appData " + app.appData.userInfo.username)
          wx.switchTab({
            url: '../my/my',
          })
        }
        else{
          this.setData({
            result:"登录失败"
          })
        }
      }
    })
  }
})
