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
    videoUpdataTime:[],//video 播放的时长
    isTriggered: false,
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
      videoList,
      isTriggered: false
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
  // 自动以下拉刷新回调
  handleRefresher(){
    this.getVideoList(this.data.navId)
  },
  //上拉触底刷新
  handleScrollTolower(){
    //数据分页 1.后端分页 2前端分页
    let newVideoList = [
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_F9569B95FDC52CC2F36520D1205F93DD",
                "coverUrl": "https://p2.music.126.net/z5jd7uOqHjZBGlP9VdIQrA==/109951163574225359.jpg",
                "height": 720,
                "width": 1280,
                "title": "超炸忍电Purple Dragons(VIp)夜猫必备神曲!",
                "description": null,
                "commentCount": 39,
                "shareCount": 98,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 16026530
                    },
                    {
                        "resolution": 480,
                        "size": 28064419
                    },
                    {
                        "resolution": 720,
                        "size": 43495860
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 440000,
                    "authStatus": 1,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/dFYj3xDCiy630pOlUbpzkg==/109951165823048667.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 445200,
                    "birthday": 847900800000,
                    "userId": 416954574,
                    "userType": 4,
                    "nickname": "爱音乐的郑小天",
                    "signature": "音乐制作人，DJ/纯电子音乐 邮箱：975586071@qq.com 希望我的音乐可以治愈你们每个人. 爱音乐，爱生活，多多支持！",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951165823048670,
                    "backgroundImgId": 109951166218854640,
                    "backgroundUrl": "http://p1.music.126.net/YqmSw__tO5jV6z6qJFVkSg==/109951166218854640.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "2": "音乐图文达人"
                    },
                    "djStatus": 10,
                    "vipType": 11,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951166218854640",
                    "avatarImgIdStr": "109951165823048667"
                },
                "urlInfo": {
                    "id": "F9569B95FDC52CC2F36520D1205F93DD",
                    "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/qnkBykJW_1914407470_shd.mp4?ts=1629783291&rid=40CA8644C41B5246874A63A8380A0A3A&rl=3&rs=kopaSvstTAUjcTFHyuolEoeOYyFIQfsj&sign=cc48c6303ff495b83ff1dcee558fa17b&ext=h7A1pNDY4L1WsBN9FRapMXK0PZDjbUrMSz8Q2Zo8hMnKnw%2Fsoh3ftOo4XAKWkgMzJnzTsHn32vsMRNou5mjSQ89%2FoUS7eBVnDv2quS7Dt20pr%2F52wZqpypQ5yk0BCBbkIiBNaQAL4PQlkpRmlsPkI3Yv7qLS1kDmOrl2iNINEKfrR2SyjB5Efxwq5hQ0Aqk8%2BEx2YIx2RwPjyymWaAizyroCyATw2iwNHCPndV9aN34RFiKz4HqmKmLbh3cWO3ZE",
                    "size": 43495860,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 720
                },
                "videoGroup": [
                    {
                        "id": 1105,
                        "name": "最佳饭制",
                        "alg": null
                    },
                    {
                        "id": 9104,
                        "name": "电子",
                        "alg": null
                    },
                    {
                        "id": 4104,
                        "name": "电音",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 15241,
                        "name": "饭制",
                        "alg": null
                    },
                    {
                        "id": 23116,
                        "name": "音乐推荐",
                        "alg": null
                    },
                    {
                        "id": 16142,
                        "name": "日语音乐",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [
                    {
                        "name": "Purple Dragons (Dragons VIP)",
                        "id": 526099041,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 813244,
                                "name": "Virtual Riot",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": null,
                        "fee": 0,
                        "v": 12,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 37027373,
                            "name": "Purple Dragons (Dragons VIP)",
                            "picUrl": "http://p4.music.126.net/UswIZ0GnLdO2xWtyEbIr0Q==/109951163093252046.jpg",
                            "tns": [],
                            "pic_str": "109951163093252046",
                            "pic": 109951163093252050
                        },
                        "dt": 184058,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 7364485,
                            "vd": -22100
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 4418708,
                            "vd": -18600
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 2945820,
                            "vd": -15500
                        },
                        "a": null,
                        "cd": "01",
                        "no": 1,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 0,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 0,
                        "mv": 0,
                        "publishTime": 1513958400007,
                        "privilege": {
                            "id": 526099041,
                            "fee": 0,
                            "payed": 0,
                            "st": 0,
                            "pl": 320000,
                            "dl": 320000,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 320000,
                            "fl": 320000,
                            "toast": false,
                            "flag": 128,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "F9569B95FDC52CC2F36520D1205F93DD",
                "durationms": 181000,
                "playTime": 131746,
                "praisedCount": 479,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_5DA5B896F72FD0D6A643E723D77DA4C6",
                "coverUrl": "https://p2.music.126.net/vZy587_W-oz2PoGiackvmQ==/109951163766420173.jpg",
                "height": 720,
                "width": 1632,
                "title": "Furkan Soysal ft Sözer Sepetci - Low Station",
                "description": "Furkan Soysal ft Sözer Sepetci - Low Station",
                "commentCount": 10,
                "shareCount": 486,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 18954656
                    },
                    {
                        "resolution": 480,
                        "size": 31939144
                    },
                    {
                        "resolution": 720,
                        "size": 39401539
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 650000,
                    "authStatus": 1,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/QzIquOHkx5H5jJkam4JeWQ==/109951166217631866.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 653000,
                    "birthday": 891792000000,
                    "userId": 111259490,
                    "userType": 4,
                    "nickname": "uRRa",
                    "signature": "üç günlük dünya🪐",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951166217631870,
                    "backgroundImgId": 109951164996625360,
                    "backgroundUrl": "http://p1.music.126.net/2iHgy7mewFmPCrhG1ErQqA==/109951164996625356.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "1": "影视视频达人"
                    },
                    "djStatus": 10,
                    "vipType": 11,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951164996625356",
                    "avatarImgIdStr": "109951166217631866"
                },
                "urlInfo": {
                    "id": "5DA5B896F72FD0D6A643E723D77DA4C6",
                    "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/OaAJeIQj_2230234657_shd.mp4?ts=1629783291&rid=40CA8644C41B5246874A63A8380A0A3A&rl=3&rs=JIaHPeUxtsXrjGdkswnvQwkhosXFLwWa&sign=d746d6150f82d26302b56649cfd72b6f&ext=h7A1pNDY4L1WsBN9FRapMXK0PZDjbUrMSz8Q2Zo8hMnKnw%2Fsoh3ftOo4XAKWkgMzJnzTsHn32vsMRNou5mjSQ89%2FoUS7eBVnDv2quS7Dt20pr%2F52wZqpypQ5yk0BCBbkIiBNaQAL4PQlkpRmlsPkI3Yv7qLS1kDmOrl2iNINEKfrR2SyjB5Efxwq5hQ0Aqk8%2BEx2YIx2RwPjyymWaAizyroCyATw2iwNHCPndV9aN34RFiKz4HqmKmLbh3cWO3ZE",
                    "size": 39401539,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 720
                },
                "videoGroup": [
                    {
                        "id": 1000,
                        "name": "MV",
                        "alg": null
                    },
                    {
                        "id": 9104,
                        "name": "电子",
                        "alg": null
                    },
                    {
                        "id": 4104,
                        "name": "电音",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 3102,
                        "name": "二次元",
                        "alg": null
                    },
                    {
                        "id": 14176,
                        "name": "体育",
                        "alg": null
                    },
                    {
                        "id": 14212,
                        "name": "欧美音乐",
                        "alg": null
                    },
                    {
                        "id": 23116,
                        "name": "音乐推荐",
                        "alg": null
                    },
                    {
                        "id": 72116,
                        "name": "短片",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "5DA5B896F72FD0D6A643E723D77DA4C6",
                "durationms": 184853,
                "playTime": 92811,
                "praisedCount": 335,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_91B9B855E011817BCB9B631299BC1EB7",
                "coverUrl": "https://p2.music.126.net/_dPRKlGkasJkY26yjt6M8A==/109951164995784926.jpg",
                "height": 1080,
                "width": 1920,
                "title": "最近很火的青钢影BGM，这句“我没说你可以走了”太燃了！",
                "description": "分享三首最近特别火的英雄联盟台词向歌曲\n①：优雅永不过时；我没说你可以走了--青钢影\n②：没有撤退可言-亚托克斯\n③：欢迎来到祖安--艾克",
                "commentCount": 147,
                "shareCount": 214,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 24219075
                    },
                    {
                        "resolution": 480,
                        "size": 41085124
                    },
                    {
                        "resolution": 720,
                        "size": 59860467
                    },
                    {
                        "resolution": 1080,
                        "size": 100478802
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 430000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/zhiko5uohH5ysFaK58GE1w==/109951165140421577.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 430100,
                    "birthday": 872006400000,
                    "userId": 1566634844,
                    "userType": 204,
                    "nickname": "唯一燃音乐",
                    "signature": "生活已经安静了太久，需要音乐带来热闹的理由！\n （有视频疑问私信）",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951165140421580,
                    "backgroundImgId": 109951165811671060,
                    "backgroundUrl": "http://p1.music.126.net/ddYc_CSnzRaR_av4dpxu8g==/109951165811671051.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "1": "音乐原创视频达人"
                    },
                    "djStatus": 0,
                    "vipType": 11,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951165811671051",
                    "avatarImgIdStr": "109951165140421577"
                },
                "urlInfo": {
                    "id": "91B9B855E011817BCB9B631299BC1EB7",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/qHy6q4u8_2993483969_uhd.mp4?ts=1629783291&rid=40CA8644C41B5246874A63A8380A0A3A&rl=3&rs=vkeDmMFOtlFqHftYLSqLgqTaQHqoTaSF&sign=8cd6552d1725ede2994bb39885533c80&ext=h7A1pNDY4L1WsBN9FRapMXK0PZDjbUrMSz8Q2Zo8hMnKnw%2Fsoh3ftOo4XAKWkgMzJnzTsHn32vsMRNou5mjSQ89%2FoUS7eBVnDv2quS7Dt20pr%2F52wZqpypQ5yk0BCBbkIiBNaQAL4PQlkpRmlsPkI3Yv7qLS1kDmOrl2iNINEKfrR2SyjB5Efxwq5hQ0Aqk8%2BEx2YIx2RwPjyymWaAizyroCyATw2iwNHCPndV9aN34RFiKz4HqmKmLbh3cWO3ZE",
                    "size": 100478802,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 1080
                },
                "videoGroup": [
                    {
                        "id": 2103,
                        "name": "游戏",
                        "alg": null
                    },
                    {
                        "id": 9104,
                        "name": "电子",
                        "alg": null
                    },
                    {
                        "id": 4104,
                        "name": "电音",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 23116,
                        "name": "音乐推荐",
                        "alg": null
                    },
                    {
                        "id": 15102,
                        "name": "华语音乐",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [
                    {
                        "name": "虚拟",
                        "id": 421423808,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 1007170,
                                "name": "陈粒",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": null,
                        "fee": 8,
                        "v": 21,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 34780579,
                            "name": "小梦大半",
                            "picUrl": "http://p3.music.126.net/HQxTggMCB7AHUXN-ZFEtmA==/1371091013186741.jpg",
                            "tns": [],
                            "pic": 1371091013186741
                        },
                        "dt": 240626,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 9627733,
                            "vd": 911
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 5776657,
                            "vd": 358
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 3851119,
                            "vd": -2
                        },
                        "a": null,
                        "cd": "1",
                        "no": 9,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 2,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 1416476,
                        "mv": 5368127,
                        "publishTime": 1469462400007,
                        "privilege": {
                            "id": 421423808,
                            "fee": 8,
                            "payed": 0,
                            "st": 0,
                            "pl": 128000,
                            "dl": 0,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 0,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "91B9B855E011817BCB9B631299BC1EB7",
                "durationms": 210280,
                "playTime": 412980,
                "praisedCount": 2944,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_75B0DF42E3295D8B09B635AAB785518E",
                "coverUrl": "https://p2.music.126.net/RowNGzx_Jfz_UzfaWjRmpw==/109951163936472332.jpg",
                "height": 1080,
                "width": 1920,
                "title": "最近超火的神曲《Cheap Thrills》北极星小姐姐很搭啊！",
                "description": "最近超火的神曲《Cheap Thrills》跟《天赋异禀》北极星小姐姐气质很搭啊，你肯定听过！\n音乐：Sia - Cheap Thrills \n视频：美剧《天赋异禀》第一季、第二季剪辑",
                "commentCount": 71,
                "shareCount": 621,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 17323005
                    },
                    {
                        "resolution": 480,
                        "size": 28125337
                    },
                    {
                        "resolution": 720,
                        "size": 44051443
                    },
                    {
                        "resolution": 1080,
                        "size": 74635961
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 110000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/7Em6WWhU5g-Qx58Uh2ebLA==/109951163207035380.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 110101,
                    "birthday": 760723200000,
                    "userId": 101949531,
                    "userType": 204,
                    "nickname": "大鹏不想飞",
                    "signature": "世界上那么多选择，很多还没有试过，去寻找自己想要的生活吧！",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951163207035380,
                    "backgroundImgId": 109951163198775580,
                    "backgroundUrl": "http://p1.music.126.net/qxW-8qj6DVoQvEhAsLz8Sw==/109951163198775583.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "1": "音乐视频达人"
                    },
                    "djStatus": 10,
                    "vipType": 0,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951163198775583",
                    "avatarImgIdStr": "109951163207035380"
                },
                "urlInfo": {
                    "id": "75B0DF42E3295D8B09B635AAB785518E",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/2b2cTBWD_2376187565_uhd.mp4?ts=1629783291&rid=40CA8644C41B5246874A63A8380A0A3A&rl=3&rs=AEXvUBwKNTvSHzMmZAOLPOUwePnihfeK&sign=80793b5baa449e6170b831ba69ba8a35&ext=h7A1pNDY4L1WsBN9FRapMXK0PZDjbUrMSz8Q2Zo8hMnKnw%2Fsoh3ftOo4XAKWkgMzJnzTsHn32vsMRNou5mjSQ89%2FoUS7eBVnDv2quS7Dt20pr%2F52wZqpypQ5yk0BCBbkIiBNaQAL4PQlkpRmlsPkI3Yv7qLS1kDmOrl2iNINEKfrR2SyjB5Efxwq5hQ0Aqk8%2BEx2YIx2RwPjyymWaAizyroCyATw2iwNHCPndV9aN34RFiKz4HqmKmLbh3cWO3ZE",
                    "size": 74635961,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 1080
                },
                "videoGroup": [
                    {
                        "id": 1105,
                        "name": "最佳饭制",
                        "alg": null
                    },
                    {
                        "id": 9104,
                        "name": "电子",
                        "alg": null
                    },
                    {
                        "id": 4104,
                        "name": "电音",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 14212,
                        "name": "欧美音乐",
                        "alg": null
                    },
                    {
                        "id": 15241,
                        "name": "饭制",
                        "alg": null
                    },
                    {
                        "id": 23116,
                        "name": "音乐推荐",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [
                    {
                        "name": "Cheap Thrills",
                        "id": 39224884,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 74625,
                                "name": "Sia",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": null,
                        "fee": 8,
                        "v": 119,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 3394107,
                            "name": "This Is Acting",
                            "picUrl": "http://p4.music.126.net/zmDE8IMf0QKDLVQc1xh4RA==/109951165973312283.jpg",
                            "tns": [],
                            "pic_str": "109951165973312283",
                            "pic": 109951165973312290
                        },
                        "dt": 211722,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 8468942,
                            "vd": -58315
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 5081382,
                            "vd": -55848
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 3387603,
                            "vd": -54329
                        },
                        "a": null,
                        "cd": "1",
                        "no": 6,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 7001,
                        "mv": 5304134,
                        "publishTime": 1453996800000,
                        "privilege": {
                            "id": 39224884,
                            "fee": 8,
                            "payed": 0,
                            "st": 0,
                            "pl": 128000,
                            "dl": 0,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 320000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "75B0DF42E3295D8B09B635AAB785518E",
                "durationms": 211413,
                "playTime": 802604,
                "praisedCount": 2990,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_8F9E1B4AA7397CAC5F38DF0B478DAD9E",
                "coverUrl": "https://p2.music.126.net/jtCrlQghtFMKp2y3oj8mLQ==/109951163573777323.jpg",
                "height": 1080,
                "width": 1920,
                "title": "BLACKPINK - Forever Young镜面练习室眼神版",
                "description": "#BLACKPINK# 《Forever Young》镜面练习室眼神版，快点翻跳哦，这是镜面视频。#敏雅音乐# #舞蹈# #敏雅韩舞专攻班#",
                "commentCount": 303,
                "shareCount": 3195,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 24717845
                    },
                    {
                        "resolution": 480,
                        "size": 44038259
                    },
                    {
                        "resolution": 720,
                        "size": 67202822
                    },
                    {
                        "resolution": 1080,
                        "size": 131886521
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 440000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/Vmijlx1Mqo5Um14qfXH79Q==/109951163200398605.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 440300,
                    "birthday": -2209017600000,
                    "userId": 1345521979,
                    "userType": 0,
                    "nickname": "MINYA敏雅工作室",
                    "signature": "",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951163200398610,
                    "backgroundImgId": 109951163547212400,
                    "backgroundUrl": "http://p1.music.126.net/h9S_5FAiPGgPoWTvllVDWw==/109951163547212397.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "1": "舞蹈视频达人"
                    },
                    "djStatus": 0,
                    "vipType": 0,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951163547212397",
                    "avatarImgIdStr": "109951163200398605"
                },
                "urlInfo": {
                    "id": "8F9E1B4AA7397CAC5F38DF0B478DAD9E",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/LinP23JI_1704879117_uhd.mp4?ts=1629783291&rid=40CA8644C41B5246874A63A8380A0A3A&rl=3&rs=IYGjbcCdOsqFTiipnBoxOKeBdPrhSRfw&sign=994a7d6f590ec08b56add16d835e099c&ext=h7A1pNDY4L1WsBN9FRapMXK0PZDjbUrMSz8Q2Zo8hMnKnw%2Fsoh3ftOo4XAKWkgMzJnzTsHn32vsMRNou5mjSQ89%2FoUS7eBVnDv2quS7Dt20pr%2F52wZqpypQ5yk0BCBbkIiBNaQAL4PQlkpRmlsPkI3Yv7qLS1kDmOrl2iNINEKfrR2SyjB5Efxwq5hQ0Aqk8%2BEx2YIx2RwPjyymWaAizyroCyATw2iwNHCPndV9aN34RFiKz4HqmKmLbh3cWO3ZE",
                    "size": 131886521,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 1080
                },
                "videoGroup": [
                    {
                        "id": 1101,
                        "name": "舞蹈",
                        "alg": null
                    },
                    {
                        "id": 58113,
                        "name": "舞蹈表演",
                        "alg": null
                    },
                    {
                        "id": 58116,
                        "name": "韩舞",
                        "alg": null
                    },
                    {
                        "id": 9104,
                        "name": "电子",
                        "alg": null
                    },
                    {
                        "id": 4104,
                        "name": "电音",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 14146,
                        "name": "兴奋",
                        "alg": null
                    },
                    {
                        "id": 92105,
                        "name": "BLACKPINK",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": [
                    104
                ],
                "relateSong": [],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "8F9E1B4AA7397CAC5F38DF0B478DAD9E",
                "durationms": 239530,
                "playTime": 2345493,
                "praisedCount": 18863,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_D5735D6E71F0C7D34A7FF7FC3879A9DF",
                "coverUrl": "https://p2.music.126.net/c9LpI3XMOvYgkcZtvuCjXA==/109951163573601406.jpg",
                "height": 720,
                "width": 1280,
                "title": "《All Falls Down》听一遍就忍不住抖腿了，开口酥啊！",
                "description": "Alan Walker ft. Noah Cyrus 《All Falls Down》听一遍就忍不住抖腿了，开口酥啊！",
                "commentCount": 1652,
                "shareCount": 3721,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 27621374
                    },
                    {
                        "resolution": 480,
                        "size": 38168053
                    },
                    {
                        "resolution": 720,
                        "size": 58553557
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 1000000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/VPGeeVnQ0jLp4hK9kj0EPg==/18897306347016806.jpg",
                    "accountStatus": 0,
                    "gender": 0,
                    "city": 1002400,
                    "birthday": -2209017600000,
                    "userId": 449979212,
                    "userType": 207,
                    "nickname": "全球潮音乐",
                    "signature": "有时候音乐是陪我熬过那些夜晚的唯一朋友。",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 18897306347016810,
                    "backgroundImgId": 18987466300481468,
                    "backgroundUrl": "http://p1.music.126.net/qx6U5-1LCeMT9t7RLV7r1A==/18987466300481468.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "1": "音乐视频达人",
                        "2": "华语音乐|欧美音乐资讯达人"
                    },
                    "djStatus": 0,
                    "vipType": 0,
                    "remarkName": null,
                    "backgroundImgIdStr": "18987466300481468",
                    "avatarImgIdStr": "18897306347016806"
                },
                "urlInfo": {
                    "id": "D5735D6E71F0C7D34A7FF7FC3879A9DF",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/XLPpEYNW_1624893373_shd.mp4?ts=1629783291&rid=40CA8644C41B5246874A63A8380A0A3A&rl=3&rs=jLFzWFKPSbjHdOkUwTxjRsFeAPtmnpsz&sign=a58cbe6e4327702c6d18aee2e027d3d1&ext=h7A1pNDY4L1WsBN9FRapMXK0PZDjbUrMSz8Q2Zo8hMnKnw%2Fsoh3ftOo4XAKWkgMzJnzTsHn32vsMRNou5mjSQ89%2FoUS7eBVnDv2quS7Dt20pr%2F52wZqpypQ5yk0BCBbkIiBNaQAL4PQlkpRmlsPkI3Yv7qLS1kDmOrl2iNINEKfrR2SyjB5Efxwq5hQ0Aqk8%2BEx2YIx2RwPjyymWaAizyroCyATw2iwNHCPndV9aN34oMsJSrQW1SlSVYB9ALTdL",
                    "size": 58553557,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 720
                },
                "videoGroup": [
                    {
                        "id": 58100,
                        "name": "现场",
                        "alg": null
                    },
                    {
                        "id": 57106,
                        "name": "欧美现场",
                        "alg": null
                    },
                    {
                        "id": 57108,
                        "name": "流行现场",
                        "alg": null
                    },
                    {
                        "id": 59108,
                        "name": "巡演现场",
                        "alg": null
                    },
                    {
                        "id": 9136,
                        "name": "艾兰·沃克",
                        "alg": null
                    },
                    {
                        "id": 1100,
                        "name": "音乐现场",
                        "alg": null
                    },
                    {
                        "id": 9104,
                        "name": "电子",
                        "alg": null
                    },
                    {
                        "id": 4104,
                        "name": "电音",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 15249,
                        "name": "Alan Walker",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [
                    {
                        "name": "All Falls Down",
                        "id": 515453363,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 1045123,
                                "name": "Alan Walker",
                                "tns": [],
                                "alias": []
                            },
                            {
                                "id": 12175271,
                                "name": "Noah Cyrus",
                                "tns": [],
                                "alias": []
                            },
                            {
                                "id": 840929,
                                "name": "Digital Farm Animals",
                                "tns": [],
                                "alias": []
                            },
                            {
                                "id": 12647253,
                                "name": "Juliander",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": null,
                        "fee": 8,
                        "v": 132,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 36682047,
                            "name": "All Falls Down",
                            "picUrl": "http://p4.music.126.net/LSNp2g4GIUaQBT1yvOq6XQ==/109951165983599325.jpg",
                            "tns": [],
                            "pic_str": "109951165983599325",
                            "pic": 109951165983599330
                        },
                        "dt": 199157,
                        "h": {
                            "br": 320002,
                            "fid": 0,
                            "size": 7967391,
                            "vd": -66082
                        },
                        "m": {
                            "br": 192002,
                            "fid": 0,
                            "size": 4780452,
                            "vd": -63800
                        },
                        "l": {
                            "br": 128002,
                            "fid": 0,
                            "size": 3186982,
                            "vd": -62581
                        },
                        "a": null,
                        "cd": "1",
                        "no": 1,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 7001,
                        "mv": 5694021,
                        "publishTime": 1509033600000,
                        "privilege": {
                            "id": 515453363,
                            "fee": 8,
                            "payed": 0,
                            "st": 0,
                            "pl": 128000,
                            "dl": 0,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 320000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 4,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "D5735D6E71F0C7D34A7FF7FC3879A9DF",
                "durationms": 195954,
                "playTime": 4925761,
                "praisedCount": 30545,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_4EB02BF19D882A92FD649378C300EA94",
                "coverUrl": "https://p2.music.126.net/QI6YTJGxrItPA0fdTcmCsQ==/109951163661867774.jpg",
                "height": 1080,
                "width": 1920,
                "title": "最孤独的电音《Lifeline》人生百态，带上耳机细细品味！",
                "description": "音乐小视频日推，喜欢的记得关注！头像歌单分享快乐",
                "commentCount": 2035,
                "shareCount": 2279,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 22344492
                    },
                    {
                        "resolution": 480,
                        "size": 35953647
                    },
                    {
                        "resolution": 720,
                        "size": 49867134
                    },
                    {
                        "resolution": 1080,
                        "size": 98339348
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 420000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/8BKSf2mTuI0BoM12py6Z_A==/109951165815124521.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 420100,
                    "birthday": 913305600000,
                    "userId": 344705772,
                    "userType": 0,
                    "nickname": "爷不理你了",
                    "signature": "生年不满百 常怀千岁忧",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951165815124530,
                    "backgroundImgId": 109951165815113490,
                    "backgroundUrl": "http://p1.music.126.net/3aG1I95v-NA7O77rIfYWxg==/109951165815113487.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": null,
                    "djStatus": 0,
                    "vipType": 0,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951165815113487",
                    "avatarImgIdStr": "109951165815124521"
                },
                "urlInfo": {
                    "id": "4EB02BF19D882A92FD649378C300EA94",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/SpVcCba0_2116083780_uhd.mp4?ts=1629783291&rid=40CA8644C41B5246874A63A8380A0A3A&rl=3&rs=PigKAZJmUTlKEQgHgErbBbiOWUwDvNxs&sign=bba6e36a2858f31ab1ff93a632140ae3&ext=h7A1pNDY4L1WsBN9FRapMXK0PZDjbUrMSz8Q2Zo8hMnKnw%2Fsoh3ftOo4XAKWkgMzJnzTsHn32vsMRNou5mjSQ89%2FoUS7eBVnDv2quS7Dt20pr%2F52wZqpypQ5yk0BCBbkIiBNaQAL4PQlkpRmlsPkI3Yv7qLS1kDmOrl2iNINEKfrR2SyjB5Efxwq5hQ0Aqk8%2BEx2YIx2RwPjyymWaAizyroCyATw2iwNHCPndV9aN34RFiKz4HqmKmLbh3cWO3ZE",
                    "size": 98339348,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 1080
                },
                "videoGroup": [
                    {
                        "id": 1105,
                        "name": "最佳饭制",
                        "alg": null
                    },
                    {
                        "id": 9104,
                        "name": "电子",
                        "alg": null
                    },
                    {
                        "id": 4104,
                        "name": "电音",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 14212,
                        "name": "欧美音乐",
                        "alg": null
                    },
                    {
                        "id": 15241,
                        "name": "饭制",
                        "alg": null
                    },
                    {
                        "id": 23116,
                        "name": "音乐推荐",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [
                    {
                        "name": "Lifeline",
                        "id": 38019092,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 1083104,
                                "name": "Zeraphym 六翼使徒",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": null,
                        "fee": 8,
                        "v": 91,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 3428032,
                            "name": "生命线",
                            "picUrl": "http://p4.music.126.net/rukrV8tgLCltzzT7ZJJ6Yw==/109951163861234431.jpg",
                            "tns": [],
                            "pic_str": "109951163861234431",
                            "pic": 109951163861234430
                        },
                        "dt": 313234,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 12531504,
                            "vd": -9200
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 7518919,
                            "vd": -6500
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 5012627,
                            "vd": -5100
                        },
                        "a": null,
                        "cd": "1",
                        "no": 1,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 0,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 564015,
                        "mv": 0,
                        "publishTime": 1449158400000,
                        "privilege": {
                            "id": 38019092,
                            "fee": 8,
                            "payed": 0,
                            "st": 0,
                            "pl": 128000,
                            "dl": 0,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 320000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 66,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "4EB02BF19D882A92FD649378C300EA94",
                "durationms": 313600,
                "playTime": 1561546,
                "praisedCount": 11320,
                "praised": false,
                "subscribed": false
            }
        },
        {
            "type": 1,
            "displayed": false,
            "alg": "onlineHotGroup",
            "extAlg": null,
            "data": {
                "alg": "onlineHotGroup",
                "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
                "threadId": "R_VI_62_CAE48E2B3DB1F2517B25B4C1089B4EF3",
                "coverUrl": "https://p2.music.126.net/HVrcfp41e73ZL4XfVytfAQ==/109951164912861612.jpg",
                "height": 1080,
                "width": 1920,
                "title": "Max Oazo & Camishe - Set Me Free",
                "description": "Set Me Free \r\n专辑：Set Me Free\r\n歌手：Max Oazo / Cami\r\n（视频源于网络）\r\n喜欢非华语音乐歌单或视频，可以【关注】我网易云\r\n：）\r\n",
                "commentCount": 7,
                "shareCount": 42,
                "resolutions": [
                    {
                        "resolution": 240,
                        "size": 14313447
                    },
                    {
                        "resolution": 480,
                        "size": 23047195
                    },
                    {
                        "resolution": 720,
                        "size": 32630225
                    },
                    {
                        "resolution": 1080,
                        "size": 53388546
                    }
                ],
                "creator": {
                    "defaultAvatar": false,
                    "province": 130000,
                    "authStatus": 0,
                    "followed": false,
                    "avatarUrl": "http://p1.music.126.net/NJa23VQGZqVbr9VcFloAhA==/109951164198088883.jpg",
                    "accountStatus": 0,
                    "gender": 1,
                    "city": 131000,
                    "birthday": 988387200000,
                    "userId": 606376808,
                    "userType": 200,
                    "nickname": "KSH的粟米",
                    "signature": "只收藏欧美、小语种、电音、无声BGM等非华语音乐，歌单不断更新，不定期上传视频或制作Mlog安利歌曲，欢迎大家关注我。\n:）",
                    "description": "",
                    "detailDescription": "",
                    "avatarImgId": 109951164198088880,
                    "backgroundImgId": 109951164741993820,
                    "backgroundUrl": "http://p1.music.126.net/fAeq_GPF1S93LAEnEzwWvQ==/109951164741993829.jpg",
                    "authority": 0,
                    "mutual": false,
                    "expertTags": null,
                    "experts": {
                        "1": "音乐视频达人"
                    },
                    "djStatus": 0,
                    "vipType": 11,
                    "remarkName": null,
                    "backgroundImgIdStr": "109951164741993829",
                    "avatarImgIdStr": "109951164198088883"
                },
                "urlInfo": {
                    "id": "CAE48E2B3DB1F2517B25B4C1089B4EF3",
                    "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/k7spqJi3_2947900700_uhd.mp4?ts=1629783291&rid=40CA8644C41B5246874A63A8380A0A3A&rl=3&rs=VPJnIchzHYZXXhYRUQJkFDBkPoddYKlP&sign=629b5975ec28ef52748e2e517e96bc97&ext=h7A1pNDY4L1WsBN9FRapMXK0PZDjbUrMSz8Q2Zo8hMnKnw%2Fsoh3ftOo4XAKWkgMzJnzTsHn32vsMRNou5mjSQ89%2FoUS7eBVnDv2quS7Dt20pr%2F52wZqpypQ5yk0BCBbkIiBNaQAL4PQlkpRmlsPkI3Yv7qLS1kDmOrl2iNINEKfrR2SyjB5Efxwq5hQ0Aqk8%2BEx2YIx2RwPjyymWaAizyroCyATw2iwNHCPndV9aN34RFiKz4HqmKmLbh3cWO3ZE",
                    "size": 53388546,
                    "validityTime": 1200,
                    "needPay": false,
                    "payInfo": null,
                    "r": 1080
                },
                "videoGroup": [
                    {
                        "id": 1000,
                        "name": "MV",
                        "alg": null
                    },
                    {
                        "id": 9104,
                        "name": "电子",
                        "alg": null
                    },
                    {
                        "id": 4104,
                        "name": "电音",
                        "alg": null
                    },
                    {
                        "id": 5100,
                        "name": "音乐",
                        "alg": null
                    },
                    {
                        "id": 14212,
                        "name": "欧美音乐",
                        "alg": null
                    },
                    {
                        "id": 23116,
                        "name": "音乐推荐",
                        "alg": null
                    }
                ],
                "previewUrl": null,
                "previewDurationms": 0,
                "hasRelatedGameAd": false,
                "markTypes": null,
                "relateSong": [
                    {
                        "name": "Set Me Free",
                        "id": 1311826934,
                        "pst": 0,
                        "t": 0,
                        "ar": [
                            {
                                "id": 13159084,
                                "name": "Max Oazo",
                                "tns": [],
                                "alias": []
                            },
                            {
                                "id": 283909,
                                "name": "Cami",
                                "tns": [],
                                "alias": []
                            }
                        ],
                        "alia": [],
                        "pop": 100,
                        "st": 0,
                        "rt": null,
                        "fee": 8,
                        "v": 8,
                        "crbt": null,
                        "cf": "",
                        "al": {
                            "id": 73535928,
                            "name": "Set Me Free",
                            "picUrl": "http://p3.music.126.net/SkpDeiZCviviY8pAz8L2zg==/109951164967069758.jpg",
                            "tns": [],
                            "pic_str": "109951164967069758",
                            "pic": 109951164967069760
                        },
                        "dt": 180000,
                        "h": {
                            "br": 320000,
                            "fid": 0,
                            "size": 7202525,
                            "vd": -1
                        },
                        "m": {
                            "br": 192000,
                            "fid": 0,
                            "size": 4321533,
                            "vd": -1
                        },
                        "l": {
                            "br": 128000,
                            "fid": 0,
                            "size": 2881036,
                            "vd": -1
                        },
                        "a": null,
                        "cd": "1",
                        "no": 1,
                        "rtUrl": null,
                        "ftype": 0,
                        "rtUrls": [],
                        "djId": 0,
                        "copyright": 1,
                        "s_id": 0,
                        "rtype": 0,
                        "rurl": null,
                        "mst": 9,
                        "cp": 1416692,
                        "mv": 0,
                        "publishTime": 1539792000007,
                        "privilege": {
                            "id": 1311826934,
                            "fee": 8,
                            "payed": 0,
                            "st": 0,
                            "pl": 128000,
                            "dl": 0,
                            "sp": 7,
                            "cp": 1,
                            "subp": 1,
                            "cs": false,
                            "maxbr": 999000,
                            "fl": 128000,
                            "toast": false,
                            "flag": 6,
                            "preSell": false
                        }
                    }
                ],
                "relatedInfo": null,
                "videoUserLiveInfo": null,
                "vid": "CAE48E2B3DB1F2517B25B4C1089B4EF3",
                "durationms": 225977,
                "playTime": 27166,
                "praisedCount": 181,
                "praised": false,
                "subscribed": false
            }
        }
    ]
    let videoList = this.data.videoList
    videoList.push(...newVideoList)
    this.setData({
      videoList
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
    this.getVideoList(this.data.navId)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({from}) {
    return{
      title: '自定义',
      page: '/pages/video/video',
      imageUrl:''
    }
  }
})