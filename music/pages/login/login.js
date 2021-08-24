// pages/login/login.js
// 1收集表单数据 
// 2前端验证:1）验证用户信息是否合法 2）前端验证通过了要发请求给后端 
// 3后端验证  1）验证用户是否存在 2）用户不存在直接返回 3）用户存在需要验证密码是否正确 不正确返回前端密码不正确，密码正确返回给前端数据（携带用户相关信息）
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleInput(event){
    // let type = event.currentTarget.id
    // console.log(type)
    // if(type == 1){
    //   this.setData({
    //     phone: event.detail.value
    //   })
      
    //   }else if(type == 2){
    //     this.setData({
    //       password: event.detail.value 
    //     })
    //   }
    // },   id 传参
    let type = event.currentTarget.dataset.type
    this.setData({
      [type]: event.detail.value
    })
  },

  // 登录的回调
  async login(){
    //手机表单数据
    let{phone,password} = this.data;
    //前端验证
    if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }
    // 正则表达式
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return;
    }

    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }
    // wx.showToast({
    //   title: '前端验证通过',
    // })

    //后端验证
    let result = await request('/login/cellphone', {phone, password, isLogin: true})
    if(result.code === 200){
      wx.showToast({
        title: '登陆成功',
      })
      //将用户的信息存储至本地
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))
      //跳转至个人中心
      wx.reLaunch({
        url: '/pages/personal/personal',
      })
    }else if(result.code === 400){
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    }else if(result.code === 502){
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    }else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    }
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