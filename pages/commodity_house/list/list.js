
var app = getApp();

Page({
  onLoad: function () {
    var self = this
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/get-list',
      data: {
        pagesize: 10,
        photo_cover_size: '300x300'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data);
        self.setData({
          house_list: res.data.data
        })
      }
    })
  }
})
