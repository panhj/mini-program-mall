// pages/user/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch: 0,
    coupons: [],
    coupon0: [],
    coupon1: [],
    coupon2: [],
    cn0: 0,
    cn1: 0,
    cn2: 0
  },
  bindSwitch (e) {
    let tab = e.currentTarget.dataset.type;
    let currentCoupon = this.data['coupon' + tab];
    this.setData({
      switch: tab,
      coupons: currentCoupon
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({ icon: 'loading', title: 'loading' });
    let that = this;
    let _token = wx.getStorageSync('token');
    wx.request({
      url: 'https://api.it120.cc/panhjserve/discounts/my',
      data: {
        token: _token
      },
      success: function (res) {
        wx.hideToast();
        console.log(res);
        if (res.data.code != 0) return wx.showModal({
          title: '提示',
          content: '获取优惠券失败',
          confirmColor: '#b0424a',
          showCancel: false
        })
        let coupons = res.data.data;
        let c0 = [];
        let c1 = [];
        let c2 = [];
        let ccn0 = 0;
        let ccn1 = 0;
        let ccn2 = 0;
        coupons.map(function (value, index) {
          if(value.status == 0) {
            ccn0++;
            c0.push(value);
          }
          if(value.status == 1) {
            ccn1++;
            c1.push(value);
          }
          if(value.status == 2) {
            ccn2++;
            c2.push(value);
          }
        })
        that.setData({
          coupons: c0,
          coupon0: c0,
          coupon1: c1,
          coupon2: c2,
          cn0: ccn0,
          cn1: ccn1,
          cn2: ccn2
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

  }
})