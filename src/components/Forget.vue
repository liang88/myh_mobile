<template>
    <div id="forget">
      <!-- 内容 -->
      <nav class="clear">
        <form action="" method="post">
          <div class="zh clear">
            <p>手机号</p>
            <span v-if='sendMsgDisabled' type="relet" value="reset">{{time+'s重新获取'}}</span>
            <span v-if='!sendMsgDisabled' type="relet" value="reset" @click="clkyzm">获取验证码</span>
            <input type="text" placeholder="请输入手机号" v-model="phone">
          </div>
          <!-- <span class="y-sj">231</span> -->
          <div class="yzm clear">
            <p>验证码</p>
            <input type="text" placeholder="请输入验证码" v-model="yzm">
          </div>
          <div class="mm clear">
            <p>新密码</p>
            <input  type="password" placeholder="请输入新密码 6-12位字母、数字" v-model="pass">
          </div>
          <!-- <p class="xieyi"><input type="checkbox" checked="true" value="1" name="sProblem">我已阅读并接受 <a href="">用户服务协议</a></p> -->
          <div class="but" @click="clksub">重置密码</div>
          <p class="err">{{msage}}</p>
        </form>
      </nav>
    </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'forget',
  data () {
    return {
      phone : '',
      msage : '',
      yzm : '',
      pass : '',
      sendMsgDisabled : '',
      time : 60,
      timeval : null
    }
  },
  mounted () {
  },
  methods : {
    clkyzm () {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone == '') {
        this.msage = '手机号不能为空'
        this.clearRegMessage ()
        return
      }
      if (!reg.test(this.phone)) {
        this.msage = '手机号码格式不正确'
        this.clearRegMessage ()
        return
      }
      var addfrom = {
        mobile: this.phone,
        type: 'revamp'
      }
      this.$http.post(myHost + 'myh_web/getValiCode',addfrom).then((response) => {
        var data = response.data
        data = data.resultBean
        var yzm = data.code
        if (yzm == '1') {
          this.msage = data.message
        }else if (yzm == '0') {
          let that = this
          that.sendMsgDisabled = true
          this.timeval = window.setInterval(function () {
            if ((that.time--) <= 0) {
              that.time = 60
              that.sendMsgDisabled = false
              window.clearInterval(this.timeval)
            }
          },1000)
        }
      })
    },
    clksub () {
      var reg2 = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone == '') {
        this.msage = '手机号不能为空'
        this.clearRegMessage ()
        return
      }
      if (!reg2.test(this.phone)) {
        this.msage = '手机号码格式不正确'
        this.clearRegMessage ()
        return
      }
      if (this.pass == '') {
        this.msage = '密码不能为空'
        this.clearRegMessage ()
        return
      }
      if (this.pass.length < 6 || this.pass.length > 12) {
        this.msage = '密码格式不正确'
        this.clearRegMessage ()
        return
      }
      if (this.yzm == '') {
        this.msage = '验证码不能为空'
        this.clearRegMessage ()
        return
      }
      var addfrom = {
        mobile: this.phone,
        password: md5(this.pass),
        valiCode: this.yzm
      }
      this.$http.post(myHost + 'myh_web/updatePass',addfrom).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        let yzm = data.code
        if (yzm == '1') {
          this.msage = data.message
        } else if (yzm == '0') {
          var that = this
          var t;
          this.msage = '修改成功'
          clearTimeout(t)
          t = setTimeout(function (){
            that.$router.push('/Login')
          }, 1000);
        }
      })
    },
    clearRegMessage () {
      var that = this
      setTimeout(function () {
        that.msage = ''
      }, 2000)
    },
  }

};
</script>

<style scoped>
@import "../assets/css/wangji.css";
  nav form .but{
    margin-bottom: 1rem;
    background: #66cc00;
    color: #fff;
  }
  .err{
    width: 100%;
    margin-top: -30px;
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
    color: #ff0000;
  }
</style>
