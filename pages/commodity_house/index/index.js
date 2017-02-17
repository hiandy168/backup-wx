var app = getApp();

// HTML 解析
var WxParse = require('../../../utils/wxParse/wxParse.js');

// Google Analysis
var ga = require("../../../utils/ga.js");
var HitBuilders = ga.HitBuilders;

// 定位
var gps = require("../../../utils/gps.js");

Page({
  data: {
    markers: [],
    id: 0,
    photo_index: 1,
    photo_count: 0,
    show_detail: false,
    row1_height: 0,
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

  // 顶部图片自动切换
  photochange: function (e) {
    this.setData({
      photo_index: e.detail.current + 1
    });
  },

  onLoad: function (options) {

    // Google Analysis
    var t = getApp().getTracker();
    t.setScreenName('commodity_house_index');
    t.send(new HitBuilders.ScreenViewBuilder().build());

    this.setData({
      id: options.id
    })

    /**
     * 获取数据
     */
    var that = this
    wx.showToast({
      title: '载入中',
      icon: 'loading',
      duration: 60000
    })
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/index',
      data: {
        id: options.id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var content = res.data.data;

        console.log(res.data)

        that.setData({
          house: content.house_attrs,
          photo_urls_array: content.photo_urls_array,
          photos_count: content.photo_urls_array.length,
          photo_types: content.photo_types,
          rooms: content.rooms
        })

        // 楼盘描述 HTML -> wxml 转换
        var description = content.house_attrs.description;

        description = description.replace(/&quot;/g, ';');
        // 上线时使用
        // WxParse.wxParse('description', 'html', description, that, 15);

        // 地图定位标记
        var arr = gps.GPS.bd_decrypt(content.house_attrs.lat, content.house_attrs.lng);
        that.setData({
          markers: [{
            iconPath: "/utils/images/location.png",
            id: 0,
            title: content.house_attrs.name,
            latitude: arr.lat,
            longitude: arr.lon,
            width: 30,
            height: 30
          }]
        })
      },
      complete: function () {
        wx.hideToast();
      }
    })

    // 顶部图片高度计算
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.windowHeight);
        that.setData({
          row1_height: res.windowHeight * 0.37
        });
      }
    })
  },

  // "展开显示更多"
  showMore: function () {
    var show = this.data.show_detail;

    this.setData({
      show_detail: !show,
    });
  },

  // 前往表单提交页面
  toRegister: function (e) {
    var type = e.currentTarget.dataset.type;
    var data = {
      'house_id': this.data.id,
      'type': type
    }

    wx.navigateTo({
      url: '../form/form' + app.parseQueryString(data)
    })
  },

  // "电话咨询"
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '4001720200'
    });
  }
})
