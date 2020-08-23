import initCalendar, { getSelectedDay, setTodoLabels, switchView } from '../../template/calendar/index'
var util = require('../../utils/util.js')
const conf = {
  data: {
    show: 0,
    acRate: 0,
    proNum: 0,
    subNum: 0
  },
  onClose() {
    this.setData({ show: false })
  },
  showInfo: function() {
    this.setData({
      show: !this.data.show
    })
  },
  onShow: function() {
    initCalendar({
      // theme: 'elegant',
      // multi: true, // 是否开启多选,
      // disablePastDay: true, // 是否禁选过去日期
      // defaultDay: '2018-8-8', // 初始化日历时指定默认选中日期，如：'2018-3-6' 或 '2018-03-06'
      /**
       * 选择日期后执行的事件
       * @param { object } currentSelect 当前点击的日期
       * @param { array } allSelectedDays 选择的所有日期（当mulit为true时，才有allSelectedDays参数）
       */
      afterTapDay: (currentSelect, allSelectedDays) => {
        var date = new Date(currentSelect.year, currentSelect.month - 1, currentSelect.day)
        console.log(util.formatTime(date))
        var that = this
        this.setData({
          show: true
        })
        wx.request({
          url: 'http://127.0.0.1:9090/api/calendar/acrate/' + 'root/' + util.formatTime(date),
          data: '',
          header: {},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            var total = res.data[0] + res.data[1]
            if (total == 0) {
              that.setData({
                acRate: 0
              })
            } else {
              that.setData({
                acRate: res.data[0] / total
              })
            }

            that.setData({
              proNum: res.data[2],
              subNum: res.data[0] + res.data[1]
            })

            console.log(that.data.acRate)
          },
          fail: function(res) {},
          complete: function(res) {}
        })
        console.log('===============================')
        console.log('当前点击的日期', currentSelect)
        console.log('当前点击的日期是否有事件标记: ', currentSelect.hasTodo || false)
        allSelectedDays && console.log('选择的所有日期', allSelectedDays)
        console.log('getSelectedDay方法', getSelectedDay())
      },
      whenChangeMonth(current, next) {
        // console.log(current);
        // console.log(next);
      },
      /**
       * 日期点击事件（此事件会完全接管点击事件）
       * @param { object } currentSelect 当前点击的日期
       * @param { object } event 日期点击事件对象
       */
      // onTapDay(currentSelect, event) {
      //   console.log(currentSelect);
      //   console.log(event);
      // },
      /**
       * 日历初次渲染完成后触发事件，如设置事件标记
       */
      afterCalendarRender(ctx) {
        // const data = [
        //   {
        //     year: '2019',
        //     month: '3',
        //     day: '15'
        //   },
        //   {
        //     year: 2020,
        //     month: 3,
        //     day: 18,
        //     todoText: '待办'
        //   }
        // ];
        // 异步请求
        // setTimeout(() => {
        //   setTodoLabels({
        //     circle: true,
        //     days: data,
        //     showLabelAlways: true
        //   });
        // }, 1000);
        // enableArea(['2018-10-7', '2018-10-28']);
      }
    })
  },
  switchView() {
    if (!this.weekMode) {
      switchView('week')
    } else {
      switchView()
    }
  }
}
Page(conf)
