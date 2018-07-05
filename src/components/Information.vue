<template>
    <div id="information">
      <div class="xinxi-kong"></div>
      <!-- 内容 -->
      <nav class="xinxi-content clear">
        <!-- 头像 -->
        <div class="con-head clear">
          <div class="head-zi">
            头像
          </div>
          <div class="head-pic">
            <img src="../assets/images/my/tou.png" alt="">
          </div>
          <div class="head-you">
            <img src="../assets/images/my/you.png" alt="">
          </div>
          <div class="head-xiu">
            修改
          </div>
        </div>
        <!-- 昵称 -->
        <div class="con-name clear">
          <div class="name-zi">
            昵称
          </div>
          <div class="name-pic">
            杨阳洋
          </div>
          <div class="name-you">
            <img src="../assets/images/my/you.png" alt="">
          </div>
          <div class="name-xiu">
            修改
          </div>
        </div>
        <!-- 手机 -->
        <div class="con-pone clear">
          <div class="pone-zi">
            手机
          </div>
          <div class="pone-pic">
            17610276866
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
        <div class="con-pass clear">
          <div class="pass-zi">
            密码
          </div>
          <div class="pass-you">
            <img src="../assets/images/my/you.png" alt="">
          </div>
          <div class="pass-xiu">
            修改密码
          </div>
        </div>
      </nav>

    </div>
</template>

<script>
export default {
  name: 'information',
  // data () {
  //   houselist: {}
  // },
  // mounted () {
  //   this.myhouse()
  // },
  // methods: {
  //   myhouse  () {
  //     var infos = {
  //       type: 1
  //     }
  //     this.$http.post(myHost + 'myh_web/viewHouseInfo',infos).then((response) => {
  //       var data = response.data
  //       data = data.resultBean
  //       data = data.object
  //       data = data.list
  //       this.houselist = data
  //     })
  //   }
  // }
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
