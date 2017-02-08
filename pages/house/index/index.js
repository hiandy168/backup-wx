var app = getApp();

Page({
  data: {
    id: 0
  },
  onLoad: function (options) {
    var self = this

    this.setData({
      id: options.id
    })

    wx.request({
      url: app.globalData.siteUrl + '/api/house/index',
      data: {
        id: options.id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        console.log(res.data.data)

        self.setData({
          house: res.data.data
        });

      },
    })
  },

  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: '4001720200'
    })
  }
})