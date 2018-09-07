<template>
    <div id="information">
      <div class="xinxi-kong"></div>
      <!-- 内容 -->
      <nav class="xinxi-content clear">
        <!-- 头像 -->
        <router-link tag="div" to="/Informationupload" class="con-head clear">
          <div class="head-zi">
            头像
          </div>
          <div class="head-pic">
            <img :src="houseobj.headUrl" alt="">
          </div>
          <div class="head-you">
            <img src="../assets/images/my/you.png" alt="">
          </div>
          <div class="head-xiu">
            修改
          </div>
        </router-link>
        <!-- 昵称 -->
        <router-link tag="div" to="/Informationname" class="con-name clear">
          <div class="name-zi">
            昵称
          </div>
          <div class="name-pic">
            {{houseobj.name}}
          </div>
          <div class="name-you">
            <img src="../assets/images/my/you.png" alt="">
          </div>
          <div class="name-xiu">
            修改
          </div>
        </router-link>
        <!-- 手机 -->
        <div class="con-pone clear">
          <div class="pone-zi">
            手机
          </div>
          <div class="pone-pic">
            {{houseobj.mobile}}
          </div>
        </div>
        <!-- 邮箱绑定 -->
        <div class="con-email clear">
          <div class="email-zi">
            邮箱
          </div>
          <div class="email-you">
            <img src="../assets/images/my/you.png" alt="">
          </div>
          <div class="email-xiu">
            立即绑定
          </div>
        </div>
        <!-- 密码修改 -->
        <router-link tag="div" to="/Informationpassword" class="con-pass clear">
          <div class="pass-zi">
            密码
          </div>
          <div class="pass-you">
            <img src="../assets/images/my/you.png" alt="">
          </div>
          <div class="pass-xiu">
            修改密码
          </div>
        </router-link>
      </nav>

    </div>
</template>

<script>
import { getCookie } from '../util/cookie'
export default {
  name: 'information',
  data () {
    return {
      houseobj: {}
    }
  },
  mounted () {
    this.myhouse()
  },
  methods: {
    myhouse  () {
      var infos = {
        id: getCookie('userId')
      }
      this.$http.post(myHost + 'myh_web/selectUser',infos).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        this.houseobj = data
        if (this.houseobj.name == '') {
          this.houseobj.name = this.houseobj.mobile
        }
        if (this.houseobj.headUrl == '') {
          this.houseobj.headUrl = 'static/images/logo.png'
        }
        // console.log(data)
      })
    }
  }
};
</script>

<style scoped>
  .xinxi-content .con-name .name-you{
    margin-top: 0;
  }
  .xinxi-content .con-email .email-you{
    margin-top: 0;
  }
  .xinxi-content .con-pass .pass-you{
    margin-top: 0;
  }
</style>
