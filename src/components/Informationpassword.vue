<template>
    <div id="login">
      <nav class="clear">
        <form action="" method="post">
          <div class="zh clear">
            <p>旧&nbsp;密&nbsp;码</p>
            <input type="password" v-model="pass01" placeholder="请输入旧密码">
          </div>
          <div class="mm clear">
            <p>新&nbsp;密&nbsp;码</p>
            <input type="password" v-model="pass02" placeholder="请输入新密码">
          </div>
          <div class="mm clear">
            <p>确认密码</p>
            <input type="password" v-model="pass03" placeholder="请确认新密码">
          </div>
          <button class="but" type="button" @click="pwdconserve" value="submit" >确认修改</button>
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
      lgshow:'',
      pass01: '',
      pass02: '',
      pass03: '',

    }
  },
  mounted () {
  },
  methods: {
    pwdconserve(){
      if(!this.pass01){
        this.lgshow = '请输入旧密码!'
        this.clearmessage ()
        return
      }
      if(!this.pass02){
        this.lgshow = '请输入新密码!'
        this.clearmessage ()
        return
      }
      if(!this.pass03){
        this.lgshow = '请输入确认密码!'
        this.clearmessage ()
        return
      }
      if(!this.pass02.length == this.pass03.length){
        this.lgshow = '两次密码不一致!'
        this.clearmessage ()
        return
      }
      this.usermy = getCookie ('userId')
      var pwdinfo= {
        userId : this.usermy,
        oldPass: md5(this.pass01),
        newPass: md5(this.pass02),
        confirmNewPass: md5(this.pass03)
      }
      // console.log(pwdinfo)
      this.$http.post(myHost+'myh_web/editPass', pwdinfo).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var dc = data.code
        if(dc== '1'){
          this.lgshow = data.message
        this.clearmessage ()
        }else if(dc== '0'){
          this.lgshow = '修改成功'
          this.clearmessage ()
          var thats = this
          setTimeout(function () {
            thats.$router.push('/Information')
            thats.pass01 = ''
            thats.pass02 = ''
            thats.pass03 = ''
          }, 3000)
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
