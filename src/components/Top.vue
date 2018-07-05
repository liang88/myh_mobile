<template>
  <div id="top" v-show="topall">
    <!-- 头部 -->
    <header v-if="tabtop">
      <div class="bottom">
        <router-link tag="a" to="/"><img src="../assets/images/index/logo.png" alt=""></router-link>
        <router-link  class="sosu" tag="a" to="/Search">
          <div>
            <img src="../assets/images/index/sousuo.png" alt="">
            <p>找新房,搜满易</p>
          </div>
        </router-link>
        <!-- -----------登录后的状态----------- -->
        <router-link v-if="!isLogin" tag="a" to="/Login"><img src="../assets/images/index/wode.png" alt=""></router-link>
        <router-link v-else tag="a" to="/My">
          <img src="../assets/images/index/wode.png" alt="">
          <!-- 我的
          <div class="baibai" v-show="mypopshow"><a href="#" @click="logout()">退出</a> </div> -->
        </router-link>
      </div>
    </header>
    <header v-else>
      <div class="bottom1">
        <a href="javascript:history.go(-1)"><img src="../assets/images/jiantou.png" alt=""></a>
        <div class="sosu">
          <p>{{youname}}</p>
        </div>
        <router-link  class="zhuce" tag="a" to="/Register" ><p>注册</p></router-link>
      </div>
    </header>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getCookie,delCookie} from '../util/cookie'
export default {
  name: 'top',
  data () {
    return {
      mypopshow: false,
      nowphone: '',
      isLogin:false
    }
  },
  computed: {
    ...mapGetters([
      'youname',
      'tabtop',
      'topall'
    ]),
    isLog () {
      console.log(this.$store.getters)
      return this.$store.getters.isLog
    }
  },
  mounted () {
    this.loadFun()
    this.loadfunt()
  },
  methods: {
    loadfunt () {
      var phone =  getCookie ('phone')
      var sessionId =  getCookie ('sessionId')
      var userId =  getCookie ('userId')
      console.log(phone)
      console.log(sessionId)
      console.log(userId)
      if (sessionId) {
        this.isLogin = true
      }
    },
    logout () {
      delCookie('sessionId')
      delCookie('phone')
      delCookie('userId')
      this.isLogin = false
    },
    loadFun () {
      var myname = this.$route.name
      this.$store.dispatch('titname', myname)
    },
    mypop (){
      this.mypopshow = !this.mypopshow
    }
  },
  watch: {
    $route (r) {
      var myname = r.name
      this.$store.dispatch('titname', myname)
    },
    isLog(val){
      var sessionId =  getCookie ('sessionId')
      if(sessionId){
        this.isLogin = true
      }
      this.isLogin = val?true:this.isLog
      //  this.nowphone = this.$store.getters.phone
    }
  }
}
</script>

<style scoped>
  @import "../assets/css/denglu.css";
  .myclass{
    line-height: 40px;
    padding:5px 0px;
    font-size:16px;
    color: #333333;
    text-align: center;
    position: relative;
  }
  .baibai{
    position: fixed;
    top: 40px;
    right: 0px;
    background: #ffffff;
    line-height: 35px;
    font-size:14px;
    width: 30%;
    text-align: center;
    z-index: 99999999999;
    box-shadow: 2px 2px 2px 2px #ccc;
  }
  .baibai a{
    display: block;
    width: 100%;
    text-decoration: none;
    color: #333333;
    line-height: 35px;
    font-size:14px;
    height: 35px;
  }
</style>
