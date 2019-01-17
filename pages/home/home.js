const app = getApp();
Page({
  data: {
    banners: [
      { picUrl: "https://cdn.it120.cc/apifactory/2019/01/12/4f434a3ea85dd476e7135ca5d56429ca.jpg"},
    ],
    coupons: [
      { num: 20, sum: 199 },
      { num: 40, sum: 299 },
      { num: 60, sum: 499 },
      { num: 80, sum: 699 },
      { num: 99, sum: 899 },
    ],
    types: [
      { type: '高跟鞋', en: 'HIGH HEELED', pic: "/image/high.png" },
      { type: '平底鞋', en: 'FLAT SHOES', pic: "/image/02.png" },
      { type: '凉鞋', en: 'SANDALS', pic: "/image/03.png" },
      { type: '坡跟鞋', en: 'WEDGES', pic: "/image/04.png" },
      { type: '运动鞋', en: 'SPORTS', pic: "/image/05.png" },
      { type: '靴子', en: 'BOOTS', pic: "/image/06.png" },
    ],
    news: [
      { date: '11月11日', money: 299 },
      { date: '11月11日', money: 899 },
      { date: '11月11日', money: 499 },
    ],
    goods: [
      { name: 'XXXXXXXXXXXXXXXXXXXXX', price: '299', oldPrice: '1299', num: '9999' },
      { name: 'SAHDSAJDIOASIODJIOASD', price: '299', oldPrice: '1299', num: '9999' },
      { name: 'SAHDSAJDIOASIODJIOASD', price: '299', oldPrice: '1299', num: '9999' },
      { name: 'SAHDSAJDIOASIODJIOASD', price: '299', oldPrice: '1299', num: '9999' },
    ],
    newmores: [
      { src: 'http://xxx' },
      { src: 'http://xxx' },
      { src: 'http://xxx' },
      { src: 'http://xxx' },
      { src: 'http://xxx' },
      { src: 'http://xxx' },
      { src: 'http://xxx' },
      { src: 'http://xxx' },
      { src: 'http://xxx' },
    ],
    currentTab: 1
  },
  onLoad: function () {
    let that = this;
    // get banner
    wx.request({
      url: 'https://api.it120.cc/panhjserve/banner/list',
      data: {
        type: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          banners: res.data.data
        })
        console.log(that.data.banners)
      }
    })
    // get coupon
    wx.request({
      url: 'https://api.it120.cc/panhjserve/discounts/coupons',
      data: {
        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let couponList = [];
        res.data.data.map(function (value, index) {
          couponList.push({
            num: value.moneyMax,
            sum: value.moneyHreshold,
            id: value.id
          })
        })
        that.setData({
          coupons: couponList
        })
      }
    })
    // get category
    wx.request({
      url: "https://api.it120.cc/panhjserve/shop/goods/category/all",
      data: {},
      success: res => {
        if (res.data.code != 0) return wx.showModal({
          title: '提示',
          content: '获取商品分类失败',
          showCancel: false,
          confirmColor: 'b0424a'
        })
        that.setData({
          types: res.data.data,
        })
      }
    })
    // get goods news(3)/newMores(8)
    wx.request({
      url: 'https://api.it120.cc/panhjserve/shop/goods/list',
      data: {
        page: 1,
        pageSize: 24
      },
      success: res => {
        if(res.data.code != 0) return false;
        let list = res.data.data;
        list.map((value, index) => {
          value.dateAdd = value.dateAdd.slice(5,7) + '月' + value.dateAdd.slice(8,10) + '日';
        })
        that.setData({
          news: list.slice(0,3),
          goods: list.slice(3,7),
          newmores1: list.slice(7, 11),
          newmores2: list.slice(11, 15),
          tabGoods1: list.slice(15, 18),
          tabGoods2: list.slice(18, 21),
          tabGoods3: list.slice(21, 24)
        })
      }
    })
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  addCoupon (e) {
    wx.request({
      url: 'https://api.it120.cc/panhjserve/discounts/fetch',
      data: {
        id: e.currentTarget.dataset.coupon.id,
        token: wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.code == 0) {
          wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 1000
          });
        } else if(res.data.code == 20003) {
          wx.showModal({
            title: '提示',
            content: '不能重复领取',
            confirmColor: '#b0424a',
            showCancel: false
          })
        }
      }
    })
  },
  tapBanner(event) {
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + event.currentTarget.dataset.id,
    })
  },
  navToList(e) {
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '/pages/list/list?title=' + title
    })
  },
  bindToGood (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + id
    })
  },
  bindToType (e) {
    let typeindex = e.currentTarget.dataset.typeindex;
    app.globalData.typeIndex = typeindex;
    wx.switchTab({
      url: '/pages/types/types'
    })
  },
  bindTabTo (e) {
    let tab = e.currentTarget.dataset.tab;
    this.setData({currentTab: tab});
    if (tab == 1) this.setData({ tabGoods: this.data.tabGoods1 })
    if (tab == 2) this.setData({ tabGoods: this.data.tabGoods2 })
    if (tab == 3) this.setData({ tabGoods: this.data.tabGoods3 })
  }
})