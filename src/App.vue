<template>
  <div id="app">
    <Topview></Topview>
    <router-view/>
    <Footerview></Footerview>
  </div>
</template>

<script>
import Topview from './components/Top'
import Footerview from './components/Footer'
export default {
  name: 'App',
  components: {
    Topview,
    Footerview
  },
  data (){
    return{
    }
  },
  mounted(){
    //this.loadpanduan()
  },
  methods:{
    loadpanduan(){
      var sUserAgent = navigator.userAgent.toLowerCase()
      var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
      var bIsMidp = sUserAgent.match(/midp/i) == 'midp'
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
      var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
      var bIsAndroid = sUserAgent.match(/android/i) == 'android'
      var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
      var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        // 跳转移动端页面
        window.location.href = 'http://m.manyihefc.com/#//'
      } else {
        // 跳转pc端页面
        window.location.href = 'http://www.manyihefc.com/#/'
      }
    }
  }
}
</script>

<style>
  #app{
    background: #ffffff;
    height: 100%
  }
</style>
