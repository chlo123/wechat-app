// 发送ajax请求
/*
1封装功能函数
  1功能点明确
  2函数内部应该保留固定代码（静态的）
  3将动态的数据抽取成形参，由使用者根据自身的情况动态的传入实参
  4一个良好的功能函数应该设置形参的默认值（es6）
2封装功能组件
  1功能点明确
  2组件的内部保留静态的代码
  3将动态的数据抽取成props参数，由使用者根据自身的情况以标签属性的形式动态传入props数据
  4一个良好的组件应该设置组件的必要性及数据类型

*/
import config from './config'
export default (url, data={}, method='GET') => {
  return new Promise((resolve, reject) => {
    //1 new Promise 初始化promise实例的状态为pending
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {
        cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
      },
      success: (res) =>{
        // console.log("请求成功",res);
        if(data.isLogin){//登录请求
          wx.setStorage({
            key: 'cookies',
            data: res.cookies
          })
        }
        resolve(res.data);
      },
      fail: (err) =>{
        // console.log("shibai",err);
        reject(err)
      }
    })
  })
}