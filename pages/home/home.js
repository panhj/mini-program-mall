Page({
  data: {
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
      { name: '这是关于一款超级无敌坑人的高跟鞋的说明非常厉害', price: '299', oldPrice: '1299', num: '9999' },
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
  navToDetail(event) {
    wx.navigateTo({
      url: '/pages/goods/goods?data=cnm'
    })
  }
})