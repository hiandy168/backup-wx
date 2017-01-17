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
    console.log(e.currentTarget.dataset.id);
  },
  getList1: function(){
      wx.showToast({
        title: '载入中',
        icon: 'loading',
        duration: 60000
      })
    var self = this;
    wx.request({
      url: 'https://www.91xiangju.com/api/commodity-house/get-list',
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
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
