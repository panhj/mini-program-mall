// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: {
      name: '暂无数据',
      minPrice: '0.00',
      originalPrice: '0.00',
      stores: 0
    },
    index: 0,
    sizes: ['暂无尺码'],
    currentSize: '请选择尺码',
    islike: false
  },
  bindPickerChange(e) {
    this.setData({
      currentSize: this.data.sizes[e.detail.value]
    })
  },
  bindAddmyLike() {
    let that = this;
    let token = wx.getStorageSync('token');
    if (!this.data.goodId) return false;
    if (this.data.islike) {
      // 取消收藏
      wx.request({
        url: 'https://api.it120.cc/panhjserve/shop/goods/fav/delete',
        data: {
          goodsId: this.data.goodId,
          token: token
        },
        success: res => {
          if (res.data.code == 0) {
            that.setData({
              islike: !that.data.islike
            })
            wx.showToast({
              title: '已取消收藏',
              icon: 'success',
              duration: 2000
            });
          }
        }
      })
    } else {
      // 收藏
      wx.request({
        url: 'https://api.it120.cc/panhjserve/shop/goods/fav/add',
        data: {
          goodsId: this.data.goodId,
          token: token
        },
        success: res => {
          if (res.data.code == 0) {
            that.setData({
              islike: !that.data.islike
            })
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 2000
            });
          }
        }
      })
    }
  },
  bindAddcart() {
    if (!this.data.goodId) return false;
    if (this.data.currentSize == '请选择尺码') return wx.showToast({
      title: '还未选尺码',
      icon: 'success',
      duration: 1000
    });
    const app = getApp();
    app.carts.push({
      id: this.data.goodId,
      name: this.data.good.name,
      price: this.data.good.minPrice,
      size: this.data.currentSize,
      num: 1,
      picUrl: this.data.pics[0].pic,
      selected: true
    })
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1000
    });
  },
  bindSwitchTocart() {
    wx.switchTab({
      url: '/pages/carts/carts',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({ icon: 'loading' });
    this.setData({
      goodId: options.id
    })
    if (!options.id && options.id != 0) return wx.showToast({
      title: '获取失败',
      icon: 'loading',
      duration: 2000
    });
    let token = wx.getStorageSync('token');
    let that = this;
    // 获取详情
    wx.request({
      url: 'https://api.it120.cc/panhjserve/shop/goods/detail',
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideToast();
        if(res.data.code != 0) {
          return wx.showToast({
            title: '获取失败',
            icon: 'loading',
            duration: 2000
          });
        }
        let _sizes = [];
        // 过滤尺码
        res.data.data.properties.map(function (value, index) {
          _sizes.push('中国码：女' + value.name)
        })
        // res.data.data.content.split('\"')[1]
        that.setData({
          good: res.data.data.basicInfo,
          pics: res.data.data.pics,
          sizes: _sizes,
          detailPic: res.data.data.content
        })
      },
      fail(e) {
        wx.showToast({
          title: '获取失败',
          icon: 'loading',
          duration: 2000
        });
      }
    })
    // 检查是否收藏
    wx.request({
      url: 'https://api.it120.cc/panhjserve/shop/goods/fav/check',
      data: {
        goodsId: this.data.goodId,
        token: token
      },
      success: res => {
        if (res.data.code == -1) {
          that.setData({
            islike: false
          })
        } else if (res.data.code == 0) {
          that.setData({
            islike: true
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