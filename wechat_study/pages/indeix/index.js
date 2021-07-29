// pages/indeix/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    msg: '初始化测试数据',
  },
  handleParent(){
    console.log('parent')
  },
  handleChild(){
    console.log('child')
  },
  // 跳转至logs页面的方法
  toLogs(){
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  // toLogs(){
  //   wx.redirectTo({
  //     url: '/pages/logs/logs',
  //   })
  // },
  // toLogs(){
  //   wx.reLaunch({
  //     url: '/pages/logs/logs',
  //   })
  // },
  getUserProfile(){
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        let user = res.userInfo
        wx.setStorageSync('user', user)
        this.setData({
          userInfo: user
        })
        console.log(res);
      },
    })
  },
  logout(){
    this.setData({
      userInfo: {}
    })
    wx.setStorageSync('user', null)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.msg)
    // this.setData({
    //   msg: '修改后的数据'
    // })
    // console.log(this.data.msg)
    let user = wx.getStorageSync('user')
    this.setData({
      userInfo: user
    })
    console.log('onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
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