//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    loupan:true,
    list1:[],
    list2:[],
    page1:1,
    page2:1,
    showqr: false,
  },
  goto: function(e){
    var type = e.currentTarget.dataset.id;
    console.log(type);
    if(type == 1){
      wx.navigateTo({
        url: '/pages/commodity_house/list/list'
      });
    }
  },
  getList1: function(){
      wx.showToast({
        title: '载入中',
        icon: 'loading',
        duration: 60000
      })
    var self = this;
    wx.request({
      url: getApp().globalData.siteUrl + '/api/commodity-house/get-list',
      data: {
        page: self.data.page1,
        pagesize: 10,
        sort: 'id_desc',
      },
      method: 'GET',
      success: function(res){
        if(res.data.ret == 0){
          var tmp = res.data.data;
          tmp = self.data.list1.concat(tmp);
           self.setData({
             list1:tmp,
             page1: self.data.page1+1
           });

        }else{

          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel: false,
            success: function(res) {

            }
          })
        }

      },
      fail: function() {
        console.log("failed");
      },
      complete: function() {
        wx.hideToast();
      }
    })
  },
  
  getList2: function(){
     wx.showToast({
        title: '载入中',
        icon: 'loading',
        duration: 60000
      })
    var self = this;
    wx.request({
      url: getApp().globalData.siteUrl + '/api/house/get-list',
      data: {
        page: self.data.page2,
        pagesize: 10,
        sort: 'id_desc',
        ot: 'xiaochengxu',
      },
      method: 'GET',
      success: function(res){
        if(res.data.ret == 0){
          var tmp = res.data.data;
          tmp = self.data.list2.concat(tmp);
           self.setData({
             list2:tmp,
             page2: self.data.page2+1
           }); 
          
        }else{

          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel: false,
            success: function(res) {

            }
          })
        }

      },
      fail: function() {
        console.log("failed");
      },
      complete: function() {
        wx.hideToast();
      }
    })
  },
  changeList: function(e){
    var type = e.currentTarget.dataset.type ;

    this.setData({
      loupan: type == 1?true : false,
      page1: 1,
      page2: 1,
      list1: [],
      list2: [],
    });
    if(type == 1){
      this.getList1();
    }else{
      this.getList2();
    }
  },
  getMore: function(){
    console.log(this.data);
    if(this.data.loupan){
      this.getList1();
    }else{
      this.getList2();
    }
  },
  closeqr: function(){
    this.setData({
      showqr:false,
    });
  },
  showqr: function(){
    this.setData({
      showqr:true,
    });
  },
  onLoad: function () {
    this.getList1();
  }
})
