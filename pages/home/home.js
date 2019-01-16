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
      { name: '这是关于一款超级无敌坑人的高跟鞋的说明', price: '299', oldPrice: '1299', num: '9999' },
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
    ]
  },
  onLoad: function () {
    let that = this;
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
  navToDetail(event) {
    wx.navigateTo({
      url: '/pages/goods/goods?data=cnm'
    })
  },
  navToList(event) {
    wx.navigateTo({
      url: '/pages/list/list?data=cnm'
    })
  }
})