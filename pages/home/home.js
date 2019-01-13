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
      { type: '高跟鞋', en: 'HIGH HEELED' },
      { type: '平底鞋', en: 'FLAT SHOES' },
      { type: '凉鞋', en: 'SANDALS' },
      { type: '坡跟鞋', en: 'WEDGES' },
      { type: '运动鞋', en: 'SPORTS' },
      { type: '靴子', en: 'BOOTS' },
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
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
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