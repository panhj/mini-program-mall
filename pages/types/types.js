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
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', price: 849.00, num: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', price: 849.00, num: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', price: 849.00, num: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', price: 849.00, num: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', price: 849.00, num: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', price: 849.00, num: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', price: 849.00, num: 124 },
      { name: '刺刀绣花设计Mbbcar原创设计中国风元素绣花加厚保暖', price: 849.00, num: 124 },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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