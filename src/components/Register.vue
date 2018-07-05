<template>
    <div id="register">
      <nav class="clear">
        <form action="" method="post">
          <div class="yzm clear">
            <p>手机号</p>
            <input type="text" v-model="phone"  placeholder="请输入手机号">
          </div>
          <!-- <span class="y-sj">231</span> -->
          <div class="yzm clear" style="position: relative">
            <p>验证码</p>
            <input type="text" v-model="yzm"  placeholder="请输入验证码">
            <a class="from_mm"  @click="yzmbtn" href="#">
              <span v-if="sendMsgDisabled">{{time+'s重新获取'}}</span>
              <span v-if="!sendMsgDisabled">发送验证码</span>
            </a>
          </div>
          <div class="mm clear">
            <p>密&nbsp;&nbsp;&nbsp;&nbsp;码</p>
            <input  type="password" v-model="regpwd" @blur="hapy" placeholder="请输入6-12位字母、数字">
          </div>
          <!-- <p class="xieyi"><input type="checkbox" checked="true" value="1" name="sProblem">我已阅读并接受 <a href="">用户服务协议</a></p> -->
          <button v-if="reg" class="but" type="button" @click="regbtn" value="submit" >注册</button>
          <button v-else class="but greens" type="button" @click="regbtn" value="submit" >注册</button>
          <div class="regshow">{{showmessage}}</div>
        </form>
        <!------------成功提示------------>
        <div class="success" v-show="succ">注册成功！</div>
      </nav>
    </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'register',
  data () {
    return {
      phone: '',
      yzm: '',
      regpwd: '',
      showmessage: '',
      time: 60,
      sendMsgDisabled: false,
      succ: false,
      timeval: null,
      reg: true
    }
  },
  mounted () {
  },
  methods: {
    hapy () {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (this.phone == '') {
        this.showmessage = '手机号不能为空！'
        this.clearRegMessage()
        return
      }
      if (!reg.test(this.phone)){
        this.showmessage = '手机号码格式不正确!'
        this.clearRegMessage()
        return
      }
      if (this.yzm == '') {
        this.showmessage = '验证码不能为空!'
        this.clearRegMessage()
        return
      }
      if (this.yzm == '') {
        this.showmessage = '验证码不能为空!'
        this.clearRegMessage()
        return
      }
      if (this.regpwd.length < 6 || this.regpwd.length > 12){
        this.showmessage = '密码输入不正确!'
        this.clearRegMessage()
      }
      this.reg = false
    },
    yzmbtn () {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (this.phone == '') {
        this.showmessage = '手机号不能为空！'
        this.clearRegMessage()
        return
      }
      if (!reg.test(this.phone)){
        this.showmessage = '手机号码格式不正确!'
        this.clearRegMessage()
        return
      }
      // if (this.yzm == ''){
      //   this.showmessage = '验证码不能为空!'
      //   this.clearRegMessage()
      //   return
      // }
      if (this.sendMsgDisabled) {
        return
      }
      var yzminfos = {
        mobile: this.phone,
        type: 'regist'
      }
      let me = this
      me.sendMsgDisabled = true
      this.$http.post(myHost+ 'myh_web/getValiCode', yzminfos).then((response) => {
        var data = response.data
        data = data.resultBean
        var yzm = data.code
        if (yzm == '1') {
          this.regmessage = data.message
        } else if (yzm == '0') {
          let me = this
          me.sendMsgDisabled = true

          this.timeval = window.setInterval(function () {
            if ((me.time--) <= 0) {
              me.time = 60
              me.sendMsgDisabled = false
              window.clearInterval(me.timeval)
            }
          }, 1000)
        }
      })
    },
    regbtn () {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (this.phone == '') {
        this.showmessage = '手机号不能为空！'
        this.clearRegMessage()
        return
      }
      if (!reg.test(this.phone)){
        this.showmessage = '手机号码格式不正确!'
        this.clearRegMessage()
        return
      }
      if (this.yzm == ''){
        this.showmessage = '验证码不能为空!'
        this.clearRegMessage()
        return
      }
      if (this.regpwd.length < 6 || this.regpwd.length > 12){
        this.showmessage = '密码输入不正确!'
        this.clearRegMessage()
        return
      }
      var reginfos = {
        mobile: this.phone,
        valiCode: this.yzm,
        password: md5(this.regpwd),
        password2: md5(this.regpwd)
      }
      this.$http.post(myHost+ 'myh_web/register', reginfos).then((response) => {
        var regdata = response.data
        regdata = regdata.resultBean
        var  rcs = regdata.code
        if (rcs == '1') {
          console.log(regdata.message)
          this.showmessage = regdata.message
        } else if (rcs == '0') {
          var that = this
          that.succ = true
          setTimeout(function () {
            that.$router.push('/')
          }, 2000)
        }
      })
    },
    clearRegMessage () {
      var that = this
      setTimeout(function () {
        that.showmessage = ''
      }, 3000)
    }
  }
}
</script>

<style scoped>
@import "../assets/css/zhuce.css";
  .regshow{
    display: block;
    padding: 10px 0px;
    text-align: center;
    font-size:16px;
    color: #ff0000;
  }
  .from_mm{
    position: absolute;
    border: 1px solid #dcdcdc;
    line-height: 40px;
    padding: 0px 5px;
    right: 0px;
    border-radius: 5px;
    font-size: 16px;
    top: 0.3rem;
  }
  .success{
    display: block;
    position: fixed;
    background: #000000;
    opacity: 0.6;
    color: #ffffff;
    font-size: 20px;
    border-radius: 15px;
    line-height: 60px;
    padding: 10px 20px;
    left: 45%;
    top: 20%;
  }

</style>
