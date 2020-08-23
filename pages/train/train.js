import * as echarts from '../../ec-canvas/echarts'
var util = require('../../utils/util.js')

var app = getApp()
var barChart0 = null
var barChart1 = null
var barChart3 = null
var lineChart = null
var xData = null
var xData2 = null
var yData2 = null
var xData0 = null
var yData0 = null
var xData1 = null
var yData1 = null
var xData3 = null
var yData3 = null
var yData = null
var xDatai = []
Page({
  onLoad: function() {
    let today = new Date()
    var that = this
    let hourDaysList = this.getHoursBefore(7 + this.data.before, today)
    var d = new Date()
    d.setDate(d.getDate() - 7 - this.data.before)
    console.log(hourDaysList)
    //xDataArray[0] = hourDaysList
    xData0 = hourDaysList
    today.setDate(today.getDate() + 1)

    wx.request({
      url:
        'http://127.0.0.1:9090/api/count/details/test/1/' +
        app.appData.userInfo.username +
        '/' +
        util.formatTime(d) +
        '/' +
        util.formatTime(today),
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: result => {
        //console.log(result.data)
        //yDataArray[0] = result.data
        yData0 = result.data
      },
      fail: () => {
        console.log('Wrong')
      },
      complete: () => {}
    })
   
    d = new Date()
    d.setDate(d.getDate() - 30 - this.data.before)
    let weekdaysList = this.getWeekdaysBefore(30 + this.data.before, today)
    console.log(weekdaysList)
    // xDataArray[1] = weekdaysList
    xData1 = weekdaysList
    today.setDate(today.getDate() + 1)
    wx.request({
      url:
        'http://127.0.0.1:9090/api/count/details/test/2/' +
        app.appData.userInfo.username +
        '/' +
        util.formatTime(d) +
        '/' +
        util.formatTime(today),
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: result => {
        console.log(result)
        //yDataArray = result.data
        yData1 = result.data
      },
      fail: () => {
        console.log('Wrong')
      },
      complete: () => {}
    })
   
    d = new Date()
    d.setFullYear(d.getFullYear() - 3 - this.data.before)
    // console.log("the d = " + d);

    let monthDaysList = this.getMonthsBefore(3 + this.data.before, today)
    console.log(monthDaysList)
    //xDataArray[3]= monthDaysList
    xData3 = monthDaysList
    today.setDate(today.getDate() + 1)
    wx.request({
      url:
        'http://127.0.0.1:9090/api/count/details/test/4/' +
        app.appData.userInfo.username +
        '/' +
        util.formatTime(d) +
        '/' +
        util.formatTime(today),
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: result => {
        console.log(result)
        // yData = resul
        //yDataArray[3] = result.data
        yData3 = result.data
        console.log('ydata3 get')
      },
      fail: () => {
        console.log('Wrong')
      },
      complete: () => {}
    })


    let daysList = this.getDaysBefore(180 + this.data.before, today)
    d = new Date()
    d.setDate(d.getDate() - 180 - this.data.before)
    xData2 = daysList
    today.setDate(today.getDate() + 1)
    wx.request({
      url:
        'http://127.0.0.1:9090/api/count/details/test/3/' +
        app.appData.userInfo.username +
        '/' +
        util.formatTime(d) +
        '/' +
        util.formatTime(today),
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: result => {
        console.log(result)
        yData2 = result.data
        console.log(yData2)
      },
      fail: () => {
        console.log('Wrong')
      },
      complete: () => {}
    })


    // if (event.detail.name == '5' || event.detail.name == '6') {
    //   let weekdaysList = this.getWeekdaysBefore(30, today)
    //   // console.log(weekdaysList)
    //   xData = weekdaysList
    //   // 仅用于测试
    //   yData = [
    //     2,
    //     40,
    //     14,
    //     53,
    //     43,
    //     87,
    //     72,
    //     9,
    //     2,
    //     8,
    //     16,
    //     100,
    //     35,
    //     60,
    //     8,
    //     15,
    //     28,
    //     18,
    //     11,
    //     99,
    //     58,
    //     77,
    //     62,
    //     22,
    //     66,
    //     5,
    //     87,
    //     56,
    //     43,
    //     79
    //   ]
    // }

    // wx.request({
    //   url: 'http://127.0.0.1:9090/',
    //   data: {},
    //   header: { 'content-type': 'application/json' },
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: result => {
    //     console.log(result)
    //     that.setData({
    //       yData: result
    //     })
    //   },
    //   fail: () => {
    //     console.log('Wrong')
    //   },
    //   complete: () => {}
    // })

    // wx.request({
    //   url: 'http://127.0.0.1:9090/',
    //   data: {},
    //   header: { 'content-type': 'application/json' },
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: result => {
    //     console.log(result)
    //     that.setData({
    //       yData: result
    //     })
    //   },
    //   fail: () => {
    //     console.log('Wrong')
    //   },
    //   complete: () => {}
    // })
  },
  getCurrentMonthFirst: function() {
    var date = new Date()
    var todate =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())

    return todate
  },
  getDaysBefore: function(days, todate = this.getCurrentMonthFirst()) {
    var dateArray = []
    for (var i = days - 1; i >= 0; i--) {
      var dateObj = util.dateBefore(todate, i)
      if (dateObj.month == 1 && dateObj.day == 1) {
        dateArray.push(dateObj.year + '-' + dateObj.month + '-' + dateObj.day)
      } else if (dateObj.day == 1) {
        dateArray.push(dateObj.month + '-' + dateObj.day)
      } else {
        dateArray.push(dateObj.day)
      }
    }
    return dateArray
  },

  getDatesAfter: function(days, todate = this.getCurrentMonthFirst()) {
    var dateArry = []
    for (var i = days - 1; i >= 0; i--) {
      var dateObj = util.dateLater(todate, i)
      console.log(dateObj)

      dateArry.push(dateObj)
    }
    return dateArry
  },
  getDatesBefore: function(days, todate = this.getCurrentMonthFirst()) {
    var dateArry = []
    for (var i = days - 1; i >= 0; i--) {
      var dateObj = util.dateBefore(todate, i)
      //console.log(dateObj)

      dateArry.push(dateObj)
    }
    return dateArry
  },
  getHoursBefore: function(days, todate = this.getCurrentMonthFirst()) {
    var hourSet = []
    for (var j = 0; j < days; j++) {
      for (var i = 0; i < 24; i++) {
        hourSet.push(i + 'h')
      }
    }
    return hourSet
  },
  getMonthsBefore: function(days, todate = this.getCurrentMonthFirst()) {
    var monthSet = []
    for (var j = 0; j < days; j++) {
      for (var i = 0; i < 12; i++) {
        monthSet.push(i + 1 + 'm')
      }
    }
    return monthSet
  },

  getWeekdaysBefore: function(days, todate = this.getCurrentMonthFirst()) {
    var dateArray = []
    for (var i = days - 1; i >= 0; i--) {
      var dateObj = util.dateBefore(todate, i)
      if (dateObj.month == 1 && dateObj.day == 1) {
        dateArray.push(dateObj.year + '-' + dateObj.month + '-' + dateObj.day + ' ' + dateObj.week)
      } else if (dateObj.day == 1) {
        dateArray.push(dateObj.month + '-' + dateObj.day + ' ' + dateObj.week)
      } else {
        dateArray.push(dateObj.week)
      }
    }
    return dateArray
  },

  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  onChange(event) {
    var today = new Date()
    wx.showToast({
      // 根据标签来确定startDate和endDate
      title: `切换到 ${event.detail.title}`,
      icon: 'none'
    })
    this.setData({
      before: 0
    })

    this.setData({
      active: event.detail.name
    })

    // if (event.detail.name == '3') {
    //   console.log('line set')
    //   lineChart.setOption(getLineOption())
    // }
    // if (event.detail.name == '1') {
    //   console.log('bar0 set')
    //   barChart0.setOption(getBarOption(xData0, yData0))
    // }
    // if (event.detail.name == '2') {
    //   console.log('bar1 set')

    //   barChart1.setOption(getBarOption(xData1, yData1))
    // }
    // if (event.detail.name == '4') {
    //   console.log('bar3 set')
    //   barChart3.setOption(getBarOption(xData3, yData3))
    // }
  },
  onReady() {
    // let today = new Date()
    // var that = this
    // let daysList = this.getDaysBefore(180 + this.data.before, today)
    // let datesList = this.getDatesBefore(180 + this.data.before, today)
    // xData = daysList
    // wx.request({
    //   url:
    //     'http://127.0.0.1:9090/api/count/details/test/' +
    //     app.appData.userInfo.username +
    //     '/' +
    //     d.getFullYear +
    //     '-' +
    //     d.getMonth +
    //     '-' +
    //     d.getDate +
    //     '/' +
    //     util.formatTime(today),
    //   data: {},
    //   header: { 'content-type': 'application/json' },
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: result => {
    //     console.log(result.data)
    //     yData = result.data
    //   },
    //   fail: () => {
    //     console.log('Wrong')
    //   },
    //   complete: () => {}
    // })
    // console.log('before')
    // console.log('after')
  },
  data: {
    timeStep: 1,
    before: 0,
    timeNow: new Date(),
    startDay: '2019-01-01',
    today: util.formatTime(new Date()),
    show: false,
    currentDate_sd: '2020-02-02',
    currentDate_ed: '2020-02-02',
    sd: null,
    ed: null,

    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    // ec: {
    //   onInit: initChart
    // },
    weekSet: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],

    active: '2',
    ecBar_0: {
      onInit: function(canvas, width, height) {
        barChart0 = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(barChart0)
        barChart0.setOption(getBarOption(xData0, yData0))

        return barChart0
      }
    },
    ecBar_1: {
      onInit: function(canvas, width, height) {
        barChart1 = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(barChart1)
        barChart1.setOption(getBarOption(xData1, yData1))

        return barChart1
      }
    },
    ecBar_3: {
      onInit: function(canvas, width, height) {
        barChart3 = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(barChart3)
        barChart3.setOption(getBarOption(xData3, yData3))
        console.log('ecbar3 init')

        return barChart3
      }
    },

    ecScatter: {
      onInit: function(canvas, width, height) {
        const scatterChart = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(scatterChart)
        scatterChart.setOption(getScatterOption())

        return scatterChart
      }
    },
    ecLine: {
      onInit: function(canvas, width, height) {
        lineChart = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(lineChart)
        lineChart.setOption(getLineOption())
        return lineChart
      }
    }
  },
  onInitLine: function() {},

  showPopup() {
    this.setData({ show: true })
  },

  onClose() {
    this.setData({ show: false })
  },
  onInputSd(event) {
    console.log(event.detail)

    this.setData({
      currentDate_sd: event.detail
    })
    var date = new Date(event.detail)
    console.log(date)
    // this.data.sd = util.formatTime(event.detail)
  },
  // onInputEd(e){
  //   console.log(e.detail);

  //   this.setData({
  //     currentDate_ed: e.detail
  //   })
  //   // console.log(util.formatTime(e.detail))

  //   //this.data.ed = util.formatTime(event.detail)
  // },
  onConfirm(e) {
    console.log(e)
    this.setData({ show: false })
  },
  onCancel() {
    this.setData({ show: false })
  },
  timeConfirm(e) {
    console.log(e)
    this.setData({
      show: false
    })
  },
  bindDateChangeSd: function(e) {
    this.setData({
      currentDate_sd: e.detail.value
    })
  },
  bindDateChangeEd: function(e) {
    this.setData({
      currentDate_ed: e.detail.value
    })
  },
  onClickMonth: function(e) {
    var today = new Date()

    this.setData({
      before: this.data.before + this.data.timeStep
    })
    var that = this
    let monthDaysList = this.getMonthsBefore(3 + this.data.before, today)
    var d = new Date()
    d.setFullYear(d.getFullYear() - 3 - this.data.before)
    // console.log(monthDaysList)
    xData3 = monthDaysList
    console.log(xData3)
    today.setDate(today.getDate() + 1)
    wx.request({
      url:
        'http://127.0.0.1:9090/api/count/details/test/4/' +
        app.appData.userInfo.username +
        '/' +
        util.formatTime(d) +
        '/' +
        util.formatTime(today),
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: result => {
        // console.log(result)
        yData3 = result.data
      },
      fail: () => {
        console.log('Wrong')
      },
      complete: () => {}
    })
    barChart3.setOption(getBarOption(xData3, yData3))
  },
  onClickWeekdays: function(e) {
    var today = new Date()

    this.setData({
      before: this.data.before + this.data.timeStep * 10
    })
    var that = this
    let weekdaysList = this.getWeekdaysBefore(30 + this.data.before, today)
    let d = new Date()
    d.setDate(d.getDate() - 30 - this.data.before)
    console.log(weekdaysList)
    xData1 = weekdaysList
    today.setDate(today.getDate() + 1)
    wx.request({
      url:
        'http://127.0.0.1:9090/api/count/details/test/2/' +
        app.appData.userInfo.username +
        '/' +
        util.formatTime(d) +
        '/' +
        util.formatTime(today),
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: result => {
        //console.log(result)
        yData1 = result.data
      },
      fail: () => {
        console.log('Wrong')
      },
      complete: () => {}
    })
    barChart1.setOption(getBarOption(xData1, yData1))
  },
  onClickHours: function() {
    var today = new Date()

    this.setData({
      before: this.data.before + this.data.timeStep
    })
    var that = this
    let hourDaysList = this.getHoursBefore(7 + this.data.before, today)
    let d = new Date()
    d.setDate(d.getDate() - 7 - this.data.before)
    //console.log(hourDaysList)
    xData0 = hourDaysList
    today.setDate(today.getDate() + 1)
    wx.request({
      url:
        'http://127.0.0.1:9090/api/count/details/test/1/' +
        app.appData.userInfo.username +
        '/' +
        util.formatTime(d) +
        '/' +
        util.formatTime(today),
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: result => {
        // console.log(result)
        yData0 = result.data
      },
      fail: () => {
        console.log('Wrong')
      },
      complete: () => {}
    })
    barChart0.setOption(getBarOption(xData0, yData0))
  },
  onClickDays: function() {
    var today = new Date()
    this.setData({
      before: this.data.before + this.data.timeStep * 20
    })
    var that = this
    let daysList = this.getDaysBefore(180 + this.data.before, today)
    let d = new Date()
    d.setDate(d.getDate() -  180 - this.data.before)
    xData2 = daysList

    // console.log(xData)
    console.log('here wa')
    today.setDate(today.getDate() + 1)
    wx.request({
      url:
        'http://127.0.0.1:9090/api/count/details/test/3' +
        app.appData.userInfo.username +
        '/' +
        util.formatTime(d) +
        '/' +
        util.formatTime(today),
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: result => {
        console.log('api AC!')

        //console.log(result.data)
        yData2 = result.data
        if (lineChart) {
          console.log('!linechart begin clear')
          // lineChart.clear()
          console.log('!linechart finish clear')
          lineChart.setOption(getLineOption(), true)
          console.log('!linechart finish setOption')
          //console.log('setoption and ydata = ' + yData2)
        }
      },
      fail: () => {
        console.log('Wrong')
      },
      complete: () => {}
    })
  }
})

function getLineOption() {
  return {
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 80,
        end: 100,
        handleSize: 15
      },
      {
        type: 'inside',
        start: 94,
        end: 100
      },
      {
        type: 'slider',
        show: false,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 12,
        height: '70%',
        handleSize: 8,
        showDataShadow: false,
        left: '93%'
      }
    ],
    title: {
      text: '折线图',
      left: 'center'
    },
    color: ['#37A2DA', '#67E0E3', '#9FE6B8'],
    legend: {
      data: ['ALL', 'AC', 'WA'],
      top: 23,
      left: 'center',
      backgroundColor: '#7ab8cc',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData2
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [
      {
        name: 'ALL',
        type: 'line',
        smooth: true,
        //  data: [18, 36, 65, 30, 78, 40, 33]
        data: yData2
      },
      {
        name: 'AC',
        type: 'line',
        smooth: true,
        data: [12, 50, 51, 35, 70, 30, 20]
      },
      {
        name: 'WA',
        type: 'line',
        smooth: true,
        data: [10, 30, 31, 50, 40, 20, 10]
      }
    ]
  }
}

function getBarOption(xDatai, yDatai) {
  console.log('getBarOption here and xdatai , ydatai = ' + xDatai + ' ' + yDatai)

  return {
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 80,
        end: 100,
        handleSize: 15
      },
      {
        type: 'inside',
        start: 94,
        end: 100
      },
      {
        type: 'slider',
        show: false,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 12,
        height: '70%',
        handleSize: 8,
        showDataShadow: false,
        left: '93%'
      }
    ],
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['总提交', '通过', '错误']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        // data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        // data: xData,
        data: xDatai,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '总提交',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: yDatai
      },
      {
        name: '通过',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220]
      },
      {
        name: '错误',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110]
      }
    ]
  }
}

function getScatterOption() {
  var data = []
  var data2 = []

  for (var i = 0; i < 10; i++) {
    data.push([Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 40)])
    data2.push([Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)])
  }

  var axisCommon = {
    axisLabel: {
      textStyle: {
        color: '#C8C8C8'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#C8C8C8'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#C8C8C8',
        type: 'solid'
      }
    }
  }

  return {
    color: ['#FF7070', '#60B6E3'],
    backgroundColor: '#eee',
    xAxis: axisCommon,
    yAxis: axisCommon,
    legend: {
      data: ['aaaa', 'bbbb']
    },
    visualMap: {
      show: false,
      max: 100,
      inRange: {
        symbolSize: [20, 70]
      }
    },
    series: [
      {
        type: 'scatter',
        name: 'aaaa',
        data: data
      },
      {
        name: 'bbbb',
        type: 'scatter',
        data: data2
      }
    ],
    animationDelay: function(idx) {
      return idx * 50
    },
    animationEasing: 'elasticOut'
  }
}
