
var app = getApp();

Page({
  data: {
    cityFilter: {
      current: 1
    },
    categoryFilter: {
      current: 0
    },
    priceRangeFilter: {
      current: 0
    },
    decorationStandardFilter: {
      current: 0
    }, 
    roomTypesFilter: {
      current: 0
    }, 
    stylesFilter: {
      current: 0
    }, 
    isFilterExpanded: false
  },

  bindFilterToggle()
  {
    this.setData({
      isFilterExpanded: !this.data.isFilterExpanded
    })
  },

  toCommodityHouseIndex: function (event) {
    wx.navigateTo({
      url: '../index/index?id=' + event.target.id
    })
  },
  onLoad: function () {
    var self = this
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/get-filter',
      data: {},
      method: 'GET',
      success: function (res) {
        // console.log(res.data.data)
        self.setData({ 
          cityFilter: {
            current: self.data.cityFilter.current,
            filterRange: res.data.data.cities
          },
          categoryFilter: {
            current: self.data.categoryFilter.current,
            filterRange: res.data.data.categories
          },
          priceRangeFilter: {
            current: self.data.priceRangeFilter.current,
            filterRange: res.data.data.price_ranges
          },
          decorationStandardFilter: {
            current: self.data.decorationStandardFilter.current,
            filterRange: res.data.data.decoration_standards
          },
          roomTypesFilter: {
            current: self.data.roomTypesFilter.current,
            filterRange: res.data.data.room_types
          },
          stylesFilter: {
            current: self.data.stylesFilter.current,
            filterRange: res.data.data.styles
          }
        });
      },
    })
    wx.request({
      url: app.globalData.siteUrl + '/api/commodity-house/get-list',
      data: {
        pagesize: 10,
        photo_cover_size: '300x300'
      },
      success: function (res) {
        console.log(res.data.data);
        self.setData({
          house_list: res.data.data
        })
      }
    })
  },

  filterChange() {
    alert(1);
  }
})
