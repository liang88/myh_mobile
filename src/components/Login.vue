<template>
    <div id="login">
      <nav class="clear">
        <form action="" method="post">
          <div class="zh clear">
            <p>账&nbsp;&nbsp;&nbsp;&nbsp;号</p>
            <input type="text" v-model="phone" placeholder="请输入手机号">
          </div>
          <div class="mm clear">
            <p>密&nbsp;&nbsp;&nbsp;&nbsp;码</p>
            <input type="password" v-model="paswd" placeholder="请输入密码">
          </div>
          <router-link tag="a" to="/Forget" class="wangji clear">
            忘记密码
          </router-link>
          <router-link tag="a" to="/Loginmiddleman" class="qiehuan clear">
            经纪人登录
          </router-link>
          <button class="but" type="button" @click="lgbtn()" value="submit" >立即登录</button>
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
      paswd: '',
      lgshow: '',
      lgnumber: ''
    }
  },
  mounted () {
  },
  methods: {
    lgbtn () {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!this.phone) {
        this.lgshow = '请输入手机号码'
        this.clearmessage()
        return
      }
      if (!reg.test(this.phone)) {
        this.lgshow = '手机号码格式不正确'
        return
      }
      if (!this.paswd) {
        this.lgshow = '密码不能为空'
        return
      }
      if (this.paswd.length > 12 || this.paswd.length < 6) {
        this.lgshow = '密码输入不正确'
        return
      }
      var infos = {
        mobile: this. phone,
        password: md5(this.paswd)
      }
      this.$http.post(myHost+ 'myh_web/login', infos).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var obj = data.object
        var datanow = data.code
        if (datanow == '1') {
          this.lgshow = data.message
        } else if (datanow == '0') {
          this.lgnumber = 1
          setCookie('sessionId', data.sessionId, 5)
          setCookie('userId', obj.id, 5)
          setCookie('myPhone', this.phone, 5)
          setCookie('ifuser', this.lgnumber, 5)
          this.$store.dispatch('loginSave', {'sessionId':data.sessionId,myhPhone:this.phone,userId:obj.id,ifuser:this.lgnumber})
          this.$router.push('/')
        }
      })
    },
    clearmessage () {
      var thats = this
      setTimeout(function () {
        thats.lgshow = ''
      }, 3000)
    }
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
</style>
