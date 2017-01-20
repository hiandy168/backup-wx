var WxParse = require('../../../utils/wxParse/wxParse.js');
var app = getApp();

Page({
  data: {
    houseMetaStatus: 0,
    id:0,
    photo_index: 1,
    show_detail: false,
    //   house: {
    //     name: '楼盘名称'
    //   }
  },

  photochange: function(e){
    this.setData({
      photo_index:e.detail.current+1
    });
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    wx.showToast({
        title: '载入中',
        icon: 'loading',
        duration: 60000
      })
    var that = this
    var test = '<div>我是HTML代码</div>';
    WxParse.wxParse('description', 'html', test , that,0);
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/index',
      data: {
        id: options.id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
  //       console.log(res.data.data)
        that.setData({
          house: res.data.data
        });

      },
      complete: function() {
        wx.hideToast();
      }
    })
  },
  showmore: function(){
    var show = this.data.show_detail;
   
    this.setData({
      show_detail:!show,
    });
  },
  houseMetaShowDetail() {
    this.setData({
      houseMetaStatus: 1
    })
  },
  
  houseMetaHideDetail() {
    this.setData({
      houseMetaStatus: 0
    })
  }
})
