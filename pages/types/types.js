// pages/types/types.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgopacity: 0,
    types: [
      { name: '高跟鞋' },
      { name: '平底鞋' },
      { name: '运动鞋' },
      { name: '靴子' },
      { name: '拖鞋' },
      { name: '运动鞋' },
      { name: '靴子' },
      { name: '拖鞋' },
    ],
    goods: [
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', minPrice: 849.00, stores: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', minPrice: 849.00, stores: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', minPrice: 849.00, stores: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', minPrice: 849.00, stores: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', minPrice: 849.00, stores: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', minPrice: 849.00, stores: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', minPrice: 849.00, stores: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', minPrice: 849.00, stores: 124 },
    ],
    banners: [],
    bannerPic: ""
  },
  bindTabType: function (e) {
    let id = e.currentTarget.dataset.typeid;
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentTypeId: id,
      bannerPic: this.data.banners[index].picUrl
    })
    this.requestByType();
  },
  requestByType: function () {
    let that = this;
    wx.request({
      url: "https://api.it120.cc/panhjserve/shop/goods/list",
      data: {
        categoryId: this.data.currentTypeId
      },
      success: res => {
        console.log(res.data)
        if (res.data.code == 404) return that.setData({goods: []});
        if (res.data.code != 0) return wx.showModal({
          title: '提示',
          content: '获取商品分类失败',
          showCancel: false,
          confirmColor: 'b0424a'
        })
        that.setData({
          goods: res.data.data
        })
      }
    })
  },
  bindToGood: function (e) {
    let id = e.currentTarget.dataset.goodid
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 获取类别
    wx.request({
      url: "https://api.it120.cc/panhjserve/shop/goods/category/all",
      data: {},
      success: res => {
        console.log(res.data)
        if (res.data.code != 0) return wx.showModal({
          title: '提示',
          content: '获取商品分类失败',
          showCancel: false,
          confirmColor: 'b0424a'
        })
        that.setData({
          types: res.data.data,
          currentTypeId:res.data.data[0].id
        })
        that.requestByType();
      }
    })
    wx.request({
      url: 'https://api.it120.cc/panhjserve/banner/list',
      data: {
        type: 'type'
      },
      success: res => {
        let banners = res.data.data
        that.setData({
          banners: banners,
          bannerPic: banners[0].picUrl
        })
      }
    })
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

  },

  /**
   * 滚动监听
   */
  onPageScroll: function (e) {
    if (e.scrollTop > 300) return false;
    this.setData({
      bgopacity: (e.scrollTop*0.005).toFixed(2)
    });
  }
})