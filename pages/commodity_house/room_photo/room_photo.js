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

        var i = 0;
        res.data.data.forEach(function (room) {
          room.PhotoIndex = i;
          room.PhotoUrls.forEach(function () {
            i++
          });
        })

        self.setData({
          rooms: res.data.data
        })

      },

      complete: function () {
        wx.hideToast();
      }
    })
  },

// 点击放大
  zoomIn: function (e) {
    // console.log(e.target.dataset)
    var self = this

    this.setData({
      isZoomIn: true,
      currentPhoto: e.target.dataset.index
    })
  },

  zoomOut: function (e) {
    this.setData({
      isZoomIn: false
    })
  }

})