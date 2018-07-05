// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axio from 'axios'
import * as filters from './filters/'
import global from  './global'
var axios = axio.create()
Vue.prototype.$http = axios
Vue.config.productionTip = false
Object.keys(filters).forEach((key)=>Vue.filter(key,filters[key]))
/* eslint-disable no-new */
// Object.keys(filters).forEach((key)=>Vue.filter(key,filters[key]))
Vue.prototype.tranxingstart= function (score) {
  var yellowxing = ''
  var allxing = ''
  yellowxing = score/20
  yellowxing = Math.floor(yellowxing)
  for(var s=0; s<yellowxing; s++){
    allxing = allxing + '<img  src="/static/images/xing.png"/>'
  }
  var hxx = 5-yellowxing
  if(score%20 > 0){
    allxing = allxing + '<img src="/static/images/xinghui.gif"/>'
    hxx = hxx-1
  }
  for(var h=0; h<hxx; h++){
    allxing = allxing + '<img src="/static/images/xinghui.gif"/>'
  }

  return allxing
}
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
