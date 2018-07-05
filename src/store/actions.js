export default {
  // lgchou: ({commit}) => {
  //   // console.log('zhu')
  //   commit('lgchou')
  // },
  // loginSave:({commit},data)=>{
  //   commit('loginSave',data)
  // }
  titname: ({commit}, data) => {
    commit('titname', data)
  },
  footername: ({commit}, data) => {
    commit ('footername', data)
  },
  loginSave: ({commit}, data) => {
    commit ('lognsave', data)
  }
}
