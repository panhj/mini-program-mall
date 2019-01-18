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
      { type: '高跟鞋', type: 'HIGH HEELED', pic: "" },
      { type: '平底鞋', type: 'FLAT SHOES', pic: "" },
      { type: '凉鞋', type: 'SANDALS', pic: "" },
      { type: '马丁靴', type: 'MARTIN', pic: "" },
      { type: '运动鞋', type: 'SPORTS', pic: "" },
      { type: '靴子', type: 'BOOTS', pic: "" },
    ],
    news: [
      { date: '11月11日', money: 299 },
      { date: '11月11日', money: 899 },
      { date: '11月11日', money: 499 },
    ],
    goods: [
      { name: '', price: '299', oldPrice: '1299', num: '9999' },
      { name: '', price: '299', oldPrice: '1299', num: '9999' },
      { name: '', price: '299', oldPrice: '1299', num: '9999' },
      { name: '', price: '299', oldPrice: '1299', num: '9999' },
    ],
    newmores1: [
      { pic: '' },
      { pic: '' },
      { pic: '' },
      { pic: '' },
    ],
    newmores2: [
      { pic: '' },
      { pic: '' },
      { pic: '' },
      { pic: '' },
    ],
    currentTab: 1,
    keywords: "",
  },
  onLoad: function () {
    let that = this;
    // get banner
    wx.request({
      url: 'https://api.it120.cc/panhjserve/banner/list',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code != 0) return false;
        let banners = [], adPics = [], sidePics = []
        res.data.data.map( (value, index) => {
          if (value.type == 'banner') banners.push(value);
          if (value.type == 'adpic') adPics.push(value);
          if (value.type == 'sidepic') sidePics.push(value);
        })
        that.setData({
          banners: banners,
          adPics: adPics,
          sidePics: sidePics
        })
        console.log(that.data)
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
          tabGoods: list.slice(15, 18),
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
  setKeyWords (e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  bindSearch (e) {
    let value = this.data.keywords;
    wx.navigateTo({
      url: '/pages/list/list?title=搜索&keywords=' + value
    })
  },
  tapBanner(event) {
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + event.currentTarget.dataset.id,
    })
  },
  navToList(e) {
    let title = e.currentTarget.dataset.title
    let bar = e.currentTarget.dataset.bar || ""
    wx.navigateTo({
      url: '/pages/list/list?title=' + title + '&bar=' + bar
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