// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    searchWords: "",
    bar: null
  },
  bindToGood(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + id
    })
  },
  getGoodsList () {
    wx.showToast({ icon: 'loading',title: 'loading'});
    let that = this;
    wx.request({
      url: 'https://api.it120.cc/panhjserve/shop/goods/list',
      data: {
        nameLike: this.data.searchWords || "",
        barCode: this.data.bar || ""
      },
      success: res => {
        wx.hideToast();
        if(res.data.code != 0) return false;
        that.setData({
          goods: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    if (options.keywords) {
      this.setData({
        searchWords: options.keywords
      })
    }
    if (options.bar) {
      this.setData({
        bar: options.bar
      })
    }
    this.getGoodsList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})