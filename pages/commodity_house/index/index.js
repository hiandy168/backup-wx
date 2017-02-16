var WxParse = require('../../../utils/wxParse/wxParse.js');
var app = getApp();

var ga = require("../../../utils/ga.js");
var HitBuilders = ga.HitBuilders;

var gps = require("../../../utils/gps.js");

Page({
  data: {
    markers: [],
    houseMetaStatus: 0,
    id: 0,
    photo_index: 1,
    photo_count:0,
    show_detail: false,
    row1_height: 0,
    hasRoom: false,
    //   house: {
    //     name: '楼盘名称'
    //   }
  },


  // 前往照片页面
  toPhotoPage: function (e) {
    wx.navigateTo({
      url: '../photo/photo?id=' + this.data.id + '&type=' + e.target.dataset.id
    })
  },

  // 前往户型图页面
  toRoomPhotoPage: function (e) {
    wx.navigateTo({
      url: '../room_photo/room_photo?id=' + this.data.id
    })
  },

  photochange: function (e) {
    this.setData({
      photo_index: e.detail.current + 1
    });
  },
  onLoad: function (options) {

    // 统计
    var t = getApp().getTracker();
    t.setScreenName('commodity_house_index');
    t.send(new HitBuilders.ScreenViewBuilder().build());

    this.setData({
      id: options.id
    })

    // 载入toast
    wx.showToast({
      title: '载入中',
      icon: 'loading',
      duration: 60000
    })


    // 获取数据
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

        var arr = gps.GPS.bd_decrypt(res.data.data.lat, res.data.data.lng);

        that.setData({
          house: res.data.data,
          markers: [{
            iconPath: "/utils/images/location.png",
            id: 0,
            title: res.data.data.name,
            latitude: arr.lat,
            longitude: arr.lon,
            width: 30,
            height: 30
          }]
        });
        var data = that.data.house.description;

        var tmp = 0;
        for(var i in that.data.house.photos){
            tmp += that.data.house.photos[i].length;
        }

        that.setData({
          photo_count: tmp,
        });
        data = data.replace(/&quot;/g,';');
        data = '';
        WxParse.wxParse('description', 'html', data, that, 15);

      },
      complete: function () {
        wx.hideToast();
      }
    })

    // 获取照片
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/photo',
      data: {
        id: options.id
      },
      success: function (res) {
        that.setData({
          photos: res.data.data.urls,
          type_keys: res.data.data.type_keys
        })
      }
    })

    // 获取户型图
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/room-photo',
      data: {
        id: options.id
      },
      success: function (res) {
        // console.log(res.data.data)

        if (res.data.data.length > 0) {
          that.setData({
            hasRoom: true,
            rooms: res.data.data
          })
        }
      }
    })

    // 高度计算
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight);
        that.setData({
          row1_height: res.windowHeight * 0.37
        });
      }
    })


  },


  showmore: function () {
    var show = this.data.show_detail;

    this.setData({
      show_detail: !show,
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
  },
  gotophoto: function(e){
    var name = e.currentTarget.dataset.photo_name;


  },
  gotoreg: function(e){
    var type = e.currentTarget.dataset.type;
    var houseid = e.currentTarget.dataset.houseid;

    console.log(houseid);
  },
  call: function(){
    wx.makePhoneCall({
      phoneNumber:'4001720200'
    });
  }
})
