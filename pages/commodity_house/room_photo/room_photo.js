var app = getApp();

Page({
  data: {
    rooms: [],
    currentPhoto: 0,
    isZoomIn: false
  },

  onLoad: function (options) {
    var self = this

    wx.showToast({
      title: '载入中',
      icon: 'loading',
      duration: 60000
    })

    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/room-photo',
      data: {
        id: options.id
      },
      success: function (res) {
        console.log(res.data.data);

        self.setData({
          rooms: res.data.data
        })

      },

      fail: function () {
        console.log("获取数据失败");
      },

      complete: function () {
        wx.hideToast();
      }
    })
  },

  zoomIn: function (e) {
    // console.log(e.target.dataset.id)
    var self = this

    this.setData({
      isZoomIn: true,
      currentPhoto: e.target.dataset.id
    })
  },

  zoomOut: function (e) {
    this.setData({
      isZoomIn: false
    })
  }

})