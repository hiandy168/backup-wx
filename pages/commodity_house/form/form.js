// pages/commodity_house/form/form.js
var app = getApp();

Page({
  data: {
    title: '标题',
  },

  onLoad: function (options) {
    var today = this.getTodayString()

    this.setData({
      house_id: options.id,
      type: options.type,
      date_start: today,
      date_value: today
    })
  },

  // 选择日期
  dateChange(e) {
    this.setData({
      date_value: e.detail.value
    })
  },

  // 提交表单
  formSubmit(e) {
    console.log(e.detail.value)

    var exception = this.validateForm(e.detail.value);
    if (exception) {
      wx.showModal({
        title: '提交失败',
        content: exception,
        showCancel: false,
        confirmText: '好的'
      })
      return
    }

    var self = this
    wx.request({
      url: app.globalData.siteUrl + '/api/customer/add-customer-wx',
      method: 'GET',
      data: e.detail.value,
      success: function (res) {
        if (res.data.ret == 0) {
          self.showSuccessModal(res.data.msg)
        } else {
          console.log(res.data.msg)
        }
      },
    })
  },

  // 成功提示
  showSuccessModal(content) {
    wx.showModal({
      title: '提交成功',
      content: content,
      showCancel: false,
      confirmText: '好的',
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },

  // 验证表单, 通过返回 null, 未通过返回错误信息
  validateForm(value) {
    if (!value.name)
      return '请输入姓名'
    if (!value.mobile)
      return '请输入手机号码'
    if (!this.validatePhoneNumber(value.mobile))
      return '请输入合法的手机号码, 谢谢'

    return null;
  },



  /**
   *  |-----------|
   *  |  Helpers  |
   *  |-----------|
   */

  // 获取今天的日期 (string)
  getTodayString() {
    var today = new Date
    var today_string = today.getFullYear() + '-' + this.zeroPrefix(today.getMonth() + 1) + '-' + this.zeroPrefix(today.getDate())

    return today_string;
  },

  // 1 位数补零
  zeroPrefix(number) {
    if (number < 10) {
      return '0' + number
    }
    return number
  },

  // 验证手机号
  validatePhoneNumber(number) {
    if (number.length != 11)
      return false

    var pattern = /^1[0-9]{10}$/;
    if (!pattern.test(number))
      return false;

    return true;
  }
})