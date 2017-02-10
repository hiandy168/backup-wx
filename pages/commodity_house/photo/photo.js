var app = getApp();

Page({
  data: {
    currentType: 0,
    photos: [],
    type_pages: [],
    urls_extract: [],
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
      url: app.globalData.siteUrl + '/api/commodity-house/photo',
      data: {
        id: options.id
      },
      success: function (res) {
        console.log(res.data.data);

        var urls_extract = [];
        res.data.data.urls.forEach(function (type) {
          type.data.forEach(function (photo) {
            urls_extract.push(photo)
          })
        })

        // console.log(urls_extract);

        self.setData({
          photos: res.data.data.urls,
          type_keys: res.data.data.type_keys,
          urls_extract: urls_extract
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

    this.data.urls_extract.forEach(function(item, index) {
      if (e.target.dataset.id == item.id) {
        self.setData({
          currentPhoto: index
        })
      }
    })

    this.setData({
      isZoomIn: true
    })
  },

  zoomOut: function (e) {
    this.setData({
      isZoomIn: false
    })
  },

  // 切换type
  changeType: function (e) {
    this.setData({
      currentType: e.target.dataset.id
    })
  }
})