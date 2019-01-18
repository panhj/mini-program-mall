// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPic: "",
    userName: " ",
    favorNum: 0
  },
  bindMyFavor: function () {
    wx.navigateTo({
      url: '/pages/user/favor/favor',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userPic: app.globalData.userInfo.avatarUrl,
      userName: app.globalData.userInfo.nickName
    })
    let token = wx.getStorageSync('token');
    let that = this;
    wx.request({
      url: 'https://api.it120.cc/panhjserve/shop/goods/fav/list',
      data: {
        token: token
      },
      success: res => {
        if(res.data.code == 0) {
          let sum = 0;
          that.setData({
            favorNum: res.data.data.length
          })
        }
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
    let token = wx.getStorageSync('token');
    let that = this;
    wx.request({
      url: 'https://api.it120.cc/panhjserve/shop/goods/fav/list',
      data: {
        token: token
      },
      success: res => {
        if (res.data.code == 0) {
          let sum = 0;
          that.setData({
            favorNum: res.data.data.length
          })
        }
      }
    })
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