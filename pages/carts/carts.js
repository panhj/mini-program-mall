// pages/carts/carts.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    selectedAll: true,
    total: 0,
  },
  bindReduce (e) {
    let index = e.currentTarget.dataset.index;
    let newGoods = this.data.goods;
    if (newGoods[index].num == 0) return false;
    newGoods[index].num--;
    this.setData({
      goods: newGoods
    })
    this.calcTotal();
  },
  bindAdd (e) {
    let index = e.currentTarget.dataset.index;
    let newGoods = this.data.goods;
    if (newGoods[index].num == 100) return false;
    newGoods[index].num++;
    this.setData({
      goods: newGoods
    })
    this.calcTotal();
  },
  bindDelete (e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    wx.showModal({
      title: '删除确认',
      content: '确定要删除该商品？',
      showCancel: true,//是否显示取消按钮
      cancelText: "否",//默认是“取消”
      cancelColor: '#999',//取消文字的颜色
      confirmText: "是",//默认是“确定”
      confirmColor: '#b0424a',//确定文字的颜色
      success: function (res) {
        if (res.cancel) return false;
        let newGoods = that.data.goods;
        newGoods.splice(index, 1);
        that.setData({
          goods: newGoods
        })
        app.carts = newGoods;
      },
      fail: function (res) {
        return console.log('cancel')
      },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },
  bindSingleSelect (e) {
    let index = e.currentTarget.dataset.index;
    let flag = this.data.goods[index].selected;
    let item = 'goods[' + index + '].selected';
    this.setData({
      [item]: !flag
    })
    this.setData({
      selectedAll: this.checkIsSelectedAll(this.data.goods)
    })
    this.calcTotal();
  },
  bindAllSelect (e) {
    let newGoods = this.data.goods;
    let flag = this.data.selectedAll;
    newGoods.map(function (value, index) {
      value.selected = !flag;
    })
    this.setData({
      goods: newGoods,
      selectedAll: !flag
    })
    this.calcTotal();
  },
  checkIsSelectedAll (obj) {
    let flag = true;
    obj.map(function (value, index) {
      if(!value.selected) flag = false;
    })
    return flag;
  },
  calcTotal () {
    let sum = 0;
    this.data.goods.map(function (value, index) {
      if(value.selected) sum += (value.num * value.price);
    })
    this.setData({
      total: sum
    })
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
    this.setData({
      goods: app.carts
    });
    console.log('购物车列表')
    console.log(this.data.goods)
    this.calcTotal();
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