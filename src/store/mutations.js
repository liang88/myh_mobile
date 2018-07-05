import getters from './getters'

const state = {
  // 'lgben': false,
  'tabtop': true,
  'youname': '登录',
  'topall': true,
  'footer': true,
  'sessionId': '',
  'phone': '',
  'userId': '',
  'isLog': false,
  'ifuser': ''
}

const mutations = {
  // lgchou (state) {
  //   state.lgben = !state.lgben
  // },
  // loginSave (state,data) {
  //   state.sessionId = data.sessionId
  //   state.myhPhone = data.myhPhone
  //   state.isLogin = true
  // }
  titname (state, data) {
    if (data == 'Login') {
      state.tabtop = false
      state.youname = '登录'
      state.topall = true
      return
    }
    if (data == 'Counter') {
      state.tabtop = false
      state.youname = '房贷'
      state.topall = true
      return
    }
    if (data == 'Index') {
      state.tabtop = true
      state.topall = true
      return
    }
    if (data == 'Register') {
      state.tabtop = false
      state.youname = '注册'
      state.topall = true
      return
    }
    if (data == 'Housesay'){
      state.tabtop = false
      state.youname = '房源详情'
      state.topall = true
      return
    }
    if (data == 'Newlist'){
      state.tabtop = false
      state.youname = '房讯'
      state.topall = true
      return
    }
    if (data == 'Newsay'){
      state.tabtop = false
      state.youname = '房讯'
      state.topall = true
      return
    }
    if (data == 'Housearch'){
      state.tabtop = false
      state.youname = '房源详情'
      state.topall = true
      return
    }
    if (data == 'Newhouse'){
      state.tabtop = false
      state.topall = false
      return
    }
    if (data == 'Search') {
      state.tabtop = false
      state.topall = false
      return
    }
    if (data == 'Houseban') {
      state.tabtop = false
      state.topall = true
      state.youname = '房源详情'
      return
    }
    if (data == 'Middlemanall') {
      state.tabtop = false
      state.topall = true
      state.youname = '经纪人列表'
      return
    }
    if (data == 'Middleman') {
      state.tabtop = false
      state.topall = true
      state.youname = '经纪人查看'
      return
    }
    if (data == 'Forget') {
      state.tabtop = false
      state.topall = true
      state.youname = '忘记密码'
      return
    }
    if (data == 'My') {
      state.tabtop = false
      state.topall = true
      state.youname = '我的'
      return
    }
    if (data == 'Mymiddleman') {
      state.tabtop = false
      state.topall = true
      state.youname = '经纪人'
      return
    }
    if (data == 'Set') {
      state.tabtop = false
      state.topall = true
      state.youname = '设置'
      return
    }
    if (data == 'Information') {
      state.tabtop = false
      state.topall = true
      state.youname = '个人中心'
      return
    }
    if (data == 'Record') {
      state.tabtop = false
      state.topall = true
      state.youname = '浏览记录'
      return
    }
    if (data == 'Administrator') {
      state.tabtop = false
      state.topall = false
      state.youname = '房源管理'
      return
    }
    if (data == 'Feedback') {
      state.tabtop = false
      state.topall = true
      state.youname = '帮帮小管家'
      return
    }
    if (data == 'Apply') {
      state.tabtop = false
      state.topall = true
      state.youname = '我的报名'
      return
    }
    if (data == 'Loginmiddleman') {
      state.tabtop = false
      state.topall = true
      state.youname = '经纪人登录'
      return
    }
    if (data == 'Slide') {
      state.tabtop = false
      state.topall = false
      state.youname = '123'
      return
    }
  },
  footername (state, data) {
    if(data == 'Login'){
      state.footer = false
    }else if(data == 'Register'){
      state.footer = false
    }else{
      state.footer = true
    }
  },
  lognsave (state, data) {
    state.sessionId = data.sessionId
    state.userId = data.userId
    state.phone = data.phone
    state.isLog = true
    state.ifuser = data.ifuser
  }
}

export default {
  state,
  mutations,
  getters
}
