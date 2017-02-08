var WxParse = require('../../../utils/wxParse/wxParse.js');
var app = getApp();

var ga = require("../../../utils/ga.js");
var HitBuilders = ga.HitBuilders;

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
    // 获取那个Tracker实例
    var t = getApp().getTracker();
    t.setScreenName('commodity_house_index');
    t.send(new HitBuilders.ScreenViewBuilder().build());

    this.setData({
      id: options.id
    })
    wx.showToast({
        title: '载入中',
        icon: 'loading',
        duration: 60000
      })
    var that = this
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/index',
      data: {
        id: options.id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
  
        that.setData({
          house: res.data.data
        });
        var data = that.data.house.description;
        console.log(data);
        
        //data = data.replace(/&quot;/g,';');
        data = '';
        WxParse.wxParse('description', 'html', data , that,0);

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
