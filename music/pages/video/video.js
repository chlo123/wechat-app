// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],
    navId: '',
    videoList: [],
    videoId:'' ,
    videoUpdataTime:[]//video 播放的时长
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupListData()
  },
  // 获取导航数据
  async getVideoGroupListData(){
    let videoGroupListData = await request('/video/group/list')
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0, 14),
      navId: videoGroupListData.data[0].id
    })
    this.getVideoList(this.data.navId)
  },
  // 获取列表数据
  async getVideoList(navId){
    let videoListData = await request('/video/group', {id: navId})
    wx.hideLoading()
    let index = 0
    let videoList = videoListData.datas.map(item => {
      item.id = index++
      return item
    })
    this.setData({
      videoList
    })
  },
  changeNav(event){
    // let navId = event.currentTarget.id
    let navId = event.currentTarget.dataset.id
    // console.log(typeof navId)
    this.setData({
      navId,
      videoList: ''
    })
    wx.showLoading({
      title: '正在加载',
    })
    //动态获取当前导航对应的视频数据
    this.getVideoList(this.data.navId)
  },

  // 点击播放的回调
  handlePlay(event){
    // 1在点击播放的事件中找到上一个播放的视频
    // 2在播放新的视频时关闭上一个视频
    let vid = event.currentTarget.id
    // this.vid !== vid && this.videoContext && this.videoContext.stop();
    // this.vid = vid
    this.setData({
      videoId: vid
    })
    this.videoContext = wx.createVideoContext(vid)
    //判断当前的视频之前是否有播放记录，如果有，跳转至之前的位置
    let {videoUpdataTime} = this.data
    let videoItem = videoUpdataTime.find(item => item.vid === vid)
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime)
    }
    // this.videoContext.play()
  },
  handleTimeUpdate(event){
    let videoTimeObj = {vid: event.currentTarget.id, currentTime: event.detail.currentTime}
    let {videoUpdataTime} = this.data
    let videoItem = videoUpdataTime.find(item => item.vid === videoTimeObj.vid)
    if(videoItem){
      videoItem.currentTime = videoTimeObj.currentTime
    }else{
      videoUpdataTime.push(videoTimeObj)
    }
    this.setData({
      videoUpdataTime
    })
  },
  handleEnded(event){
    let {videoUpdataTime} = this.data
    videoUpdataTime.findIndex(item => item.vid === event.currentTarget.id)
    videoUpdataTime.splice(videoUpdataTime.findIndex(item => item.vid === event.currentTarget.id),1)
    this.setData({
      videoUpdataTime
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