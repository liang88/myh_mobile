<template>
    <div id="login">
      <nav class="clear">
        <form action="" method="post">
          <div class="zh clear">
            <p>手 机 号</p>
            <input type="text" v-model="phone" placeholder="请输入手机号">
          </div>
          <div class="mm clear">
            <p>验 证 码</p>
            <input class="inp2" type="button" id="" value="发送验证码" v-if="dataDisabled" @click="lgbtn" >
            <input class="inp3" type="button" :value="time + 's重新获取' " v-if="!dataDisabled" >
            <input class="inp1" type="text" v-model="yzm" placeholder="请输入验证码">
          </div>
         <!--  <router-link tag="a" to="/Forget" class="wangji clear">
            忘记密码
          </router-link> -->
          <router-link tag="a" to="/Login" class="qiehuan clear">
            用户登录
          </router-link>
          <button class="but" type="button" @click="buil" >立即登录</button>
          <div class="lgshow">{{lgshow}}</div>
        </form>
      </nav>
    </div>
</template>

<script>
import md5 from 'js-md5'
import {setCookie,getCookie} from '../util/cookie'
export default {
  name: 'login',
  data () {
    return {
      phone: '',
      yzm: '',
      lgshow: '',
      time: 60,
      timeval: null,
      dataDisabled: true,
      lgnumber: ''
    }
  },
  mounted () {
  },
  methods: {
    //发送验证码
    lgbtn () {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!this.phone) {
        this.lgshow = '请输入手机号码'
        this.clearmessage()
        return
      }
      if (!reg.test(this.phone)) {
        this.lgshow = '手机号码格式不正确'
        this.clearmessage()
        return
      }
      var infos = {
        mobile: this.phone,
        type: 'logAgent'
      }
      this.$http.post(myHost+ 'myh_web/getValiCode', infos).then((response) => {
        var data = response.data
        data = data.resultBean
        var code = data.code
        if (code == '1') {
          this.lgshow = data.message
        } else if (code == '0') {
          let that = this
          this.dataDisabled = false
          this.timeval = window.setInterval(function () {
            if ((that.time--) <= 0) {
              that.time = 60
              that.dataDisabled = true
            }
          },1000)
        }
      })
    },
    //提交登录申请
    buil () {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!this.phone) {
        this.lgshow = '请输入手机号码'
        this.clearmessage()
        return
      }
      if (!reg.test(this.phone)) {
        this.lgshow = '手机号码格式不正确'
        this.clearmessage()
        return
      }
      if (!this.yzm) {
        this.lgshow = '验证码不能为空'
        this.clearmessage()
        return
      }
      if (this.yzm.length != 6) {
        this.lgshow = '请输入6位验证码'
        this.clearmessage()
        return
      }
      var info = {
        mobile : this.phone,
        type : 'logAgent',
        code : this.yzm
      }
      this.$http.post (myHost + 'myh_web/seleloginAgent',info).then ((response) => {
        let data = response.data
        data = data.resultBean
        // console.log(data)
        var code = data.code
        var obj = data.object
        var lgs = this.lgshow
        if (code == '1') {
          lgs = data.message
          if (lgs == '请稍后重试') {
            this.lgshow = '您不是满易何经纪人'
          }
          this.clearmessage ()
        } else if (code == '0') {
          this.lgnumber = 0
          setCookie('myhPhone',obj.mobile,5)
          setCookie('ifuser', this.lgnumber, 5)
          this.$store.dispatch('loginSave',{myhPhone:obj.moblie,ifuser:this.lgnumber})
          this.$router.push('/')
        }
      })
    },
    clearmessage () {
      var thats = this
      setTimeout(function () {
        thats.lgshow = ''
      }, 3000)
    },
  }
};
</script>
<style scoped>
@import "../assets/css/denglu.css";
  .lgshow{
    display: block;
    padding: 10px 0px;
    text-align: center;
    color: #ff0000;
    font-size: 16px;
  }
  .qiehuan{
    float: left;
    margin: 0.54688rem 0;
    color: #66cc33;
    font-size: 0.375rem;
  }
  nav form .mm .inp1{
    width: 40%;
    margin-right: 5%;
  }
  nav form .mm .inp2{
    width: 30%;
    background: #66cc33;
    color: #fff;
    font-size: 0.39063rem;
    float: right;
  }
  nav form .mm .inp3{
    width: 30%;
    background: #eee;
    color: #333;
    font-size: 0.39063rem;
    float: right;
  }
</style>
