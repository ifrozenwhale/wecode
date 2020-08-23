var base64 = require('../../images/base64')
import Dialog from '../../dist/dialog/dialog'
Page({
  onLoad: function() {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:9090/api/plan/problemsId/' + 'root',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          unfinishedProblemsId: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {}
    })
    // 确定刚刚完成的任务
    var that = this
    wx.request({
      url: 'http://127.0.0.1:9090/api/plan/finished/' + 'root',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // 遍历 设置评论
        if (res.data.length != 0) {
          var id = res.data[0]
          that.setData({
            show: true,
            current: id
          })
          console.log('comment')
        }
      },
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  onClose() {
    this.setData({
      show: false
    })
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
  data: {
    cnt: 0,
    current: -1,
    show: false,
    unfinishedProblemsId: [],
    finishedTasks: [],
    justFinishedTasks: [],
    unfinishedTasksId: [],
    showFinishedInfo: '已完成的任务（点击显示）',
    activeNames: ['1'],
    finished: 0,
    delete: false
    // tasksFinished: [{
    //     title: 'Python',
    //     endDate: '2019-10-3',
    //     sumDay: 30,
    //     summary: '真有趣继续加油',
    //     status: false
    //   },
    //   {
    //     title: 'Java',
    //     endDate: '2020-3-20',
    //     sumDay: 20,
    //     summary: '太难了还要继续练习',
    //     status: true
    //   },
    //   {
    //     title: 'Matlab',
    //     endDate: '2018-5-19',
    //     sumDay: 10,
    //     summary: '无法形容',
    //     status: false
    //   }
    // ]
  },

  onShow: function(e) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:9090/api/plan/info/' + 'root' + '/1',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        that.setData({
          finishedTasks: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {}
    })
    wx.request({
      url: 'http://127.0.0.1:9090/api/plan/info/' + 'root' + '/0',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        that.setData({
          unfinishedTasks: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  onChange: function(e) {
    var $id = e.currentTarget.dataset.id
    console.log($id)

    var taskK = 'tasks[' + $id + '].status'
    console.log(this.data.tasks[$id].status)

    this.setData({
      [taskK]: !this.data.tasks[$id].status
    })
  },
  onCloseUnfinished(event) {
    console.log('delete first')

    const { position, instance } = event.detail
    var $id = event.currentTarget.dataset.id
    switch (position) {
      case 'left':
      case 'cell':
        instance.close()
        break
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close()
          this.data.unfinishedTasks.splice($id, 1)
          this.setData({
            unfinishedTasks: this.data.unfinishedTasks
          })
          var planId = this.data.unfinishedTasks[$id].id
          deleteProblem(planId)
        })
        break
    }
  },
  onCloseFinished(event) {
    console.log('delete first')

    const { position, instance } = event.detail
    var $id = event.currentTarget.dataset.id
    switch (position) {
      case 'left':
      case 'cell':
        instance.close()
        break
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close()
          this.data.finishedTasks.splice($id, 1)
          this.setData({
            finishedTasks: this.data.finishedTasks
          })
          var planId = this.data.finishedTasks[$id].id
          deleteProblem(planId)
        })
        break
    }
  },
  onChangeColl(event) {
    this.setData({
      activeNames: event.detail
    })
  },
  showFinished(e) {
    console.log(e.detail)

    if (this.data.finished == 1) {
      this.setData({
        finished: 0,
        showFinishedInfo: '已完成的任务（点击显示）'
      })
    } else {
      this.setData({
        finished: 1,
        showFinishedInfo: '已完成的任务（点击隐藏）'
      })
    }
  },
  addTask(e) {
    wx.navigateTo({
      url: '../taskSetting/index',
      success: result => {},
      fail: () => {},
      complete: () => {}
    })
    // var obj = {title: 'C++'}
    // this.data.tasks.push(obj)
    // this.setData({
    //   tasks: this.data.tasks
    // })
  }
})

function deleteProblem(id) {
  wx.request({
    url: 'http://127.0.0.1:9090/api/plan/' + id,
    header: {
      'content-type': 'application/json'
    },
    method: 'DELETE',
    success: function(res) {
      console.log('delete' + id)
    },
    fail: function(res) {
      console.log('fail to delete' + id)
    },
    complete: function(res) {}
  })
}
