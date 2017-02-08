
var app = getApp();

Page({

  data: {
    house_list: [],
    currentCity: 0,
    currentDistance: 0,
    currentCategory: 0,
    currentPriceRange: 0,
    currentResourceType: 0,
    currentLandArea: 0,
    page: 0,
    isFilterExpanded: false
  },

  // 展开更多(切换)
  bindFilterToggle() {
    this.setData({
      isFilterExpanded: !this.data.isFilterExpanded
    })
  },

  // 前往index的链接
  toHouseIndex: function (e) {
    wx.navigateTo({
      url: '../index/index?id=' + e.target.id
    })
  },

  // 获取筛选条目, 获取房源列表
  onLoad: function (option) {
    var self = this

    wx.request({
      url: app.globalData.siteUrl + '/api/house/get-filter',
      method: 'GET',
      success: function (res) {

        // console.log(res.data.data)

        self.setData({
          cityFilterRange: res.data.data.cities,
          distanceFilterRange: res.data.data.distances,
          categoryFilterRange: res.data.data.categories,
          priceRangeFilterRange: res.data.data.price_ranges,
          resourceTypeFilterRange: res.data.data.resource_types,
          landAreaFilterRange: res.data.data.land_areas,
        });
        // 异步, 先获取筛选条件, 再获取房源列表
        self.getList()
      },
    })
  },

  bindCityChange: function (e) {
    this.setData({
      currentCity: e.detail.value
    })
    this.filterChanged()
  },

  bindDistanceChange: function (e) {
    this.setData({
      currentDistance: e.detail.value
    })
    this.filterChanged()
  },

  bindCategoryChange: function (e) {
    this.setData({
      currentCategory: e.detail.value
    })
    this.filterChanged()
  },

  bindPriceRangeChange: function (e) {
    this.setData({
      currentPriceRange: e.detail.value
    })
    this.filterChanged()
  },

  bindResourceTypeChange: function (e) {
    this.setData({
      currentResourceType: e.detail.value
    })
    this.filterChanged()
  },

  bindLandAreaChange: function (e) {
    this.setData({
      currentLandArea: e.detail.value
    })
    this.filterChanged()
  },

  filterCancel() {
    this.setData({
      currentCity: 0,
      currentDistance: 0,
      currentCategory: 0,
      currentPriceRange: 0,
      currentResourceType: 0,
      currentLandArea: 0,
      isFilterExpanded: false
    });
    this.filterChanged()
  },

  // 筛选条件改变, 刷新房源列表
  filterChanged() {
    this.setData({
      isFilterExpanded: false,
      // 重置列表
      page: 0
    })
    this.getList()
  },

  // 瀑布流
  getMore() {
    this.getList();
  },

  // 获取房源列表, 包括初始列表和后续加载
  getList() {
    var self = this

    wx.showToast({
      title: '载入中',
      icon: 'loading',
      duration: 60000
    })

    wx.request({
      url: app.globalData.siteUrl + '/api/house/get-list-wx',
      data: {
        region: self.data.cityFilterRange[self.data.currentCity].id,
        distance: self.data.distanceFilterRange[self.data.currentDistance].id,
        cat: self.data.currentCategory,
        price: self.data.currentPriceRange,
        land_area: self.data.currentLandArea,
        resource_type: self.data.currentResourceType,
        page: self.data.page + 1,
        pagesize: 10,
        photo_cover_size: '300x300'
      },
      success: function (res) {
        // console.log(res.data.data);

        // 列表被重置
        if (self.data.page == 0) {
          var new_house_list = res.data.data
        }
        // 列表未重置, 添加到之前列表尾部
        else {
          var new_house_list = self.data.house_list.concat(res.data.data)
        }

        self.setData({
          house_list: new_house_list,
          page: self.data.page + 1
        })

      },
      fail: function () {
        console.log("获取数据失败");
      },
      complete: function () {
        wx.hideToast();
      }
    })
  }
})
