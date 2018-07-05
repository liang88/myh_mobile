<template>
    <div id="feedback">
      <div class="xinxi-kong"></div>
      <!-- 内容 -->
      <nav class="guanjia-content clear">
        <div class="con-wap">
       <!--    <div class="con-day">
            2016年05月02日 20:43:23
          </div> -->
          <div v-show="tishitwo" class="con-bang clear">
            <img src="../assets/images/my/jiqi.png" alt="">
            <p>亲~您好！很高兴为您服务，有什么可以帮您的呢？我们收到后会以邮件形式发给您哦！</p>
          </div>
          <div id="dialogue_box" v-for="items in inpmessagetwo" >
            <div class="con-user clear">
              <div class="user-pic">
                <img src="../assets/images/my/head.png" alt="">
              </div>
              <p>{{items}}</p>
            </div>
            <div class="con-bang clear">
              <img src="../assets/images/my/jiqi.png" alt="">
              <p>亲~稍后我们会以邮件形式回复给您哦！</p>
            </div>
          </div>
          <div class="fxtop" v-show="tishi" >
            {{inpmessage}}
          </div>
          <form action="">
            <div class="clear">
              <input type="text" v-model="inp" >
              <input @click="mybutton" type="button" value="发送">
            </div>
          </form>
        </div>
      </nav>
    </div>
</template>

<script>
import { getCookie } from '../util/cookie';
export default {
  name: 'feedback',
  data () {
    return {
      inp : '',
      inpmessagetwo : [],
      inpmessage : '',
      tishi : false,
      tishitwo : false,
    }
  },
  mounted () {
    this.xianshitwo ()
  },
  methods: {
    mybutton () {
      if (!this.inp) {
        this.tishi = true
        this.inpmessage = '亲，请输入想要咨询内容！'
        this.xianshi ()
        return
      }
      var infos = {
        adUid : getCookie ('userId'),
        advise : this.inp
      }
      this.$http.post (myHost + 'myh_web/insertAdvise',infos).then ((response) => {
        var data = response.data
        data = data.resultBean
        var code = data.code
        if (code == 1) {
          this.inpmessage = data.message
        } else if (code == 0) {
          this.inpmessage = '反馈提交成功! 我们会尽快给您回复!'
          this.inpmessagetwo.push (this.inp)
          this.inp = ''
          this.tishi = true
          this.xianshi ()
          this.$nextTick(function() {
              setTimeout(function() {
                  document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight;
              }, 100);
          });
        }
      })
    },
    xianshi () {
      var that = this
      setTimeout (function () {
        that.tishi = false
      },3000)
    },
    xianshitwo () {
      var that = this
      setTimeout (function () {
        that.tishitwo = true
      },1000)
    },
  }
};
</script>
<style scoped>
  .guanjia-content{
    margin-top: 0;
  }
  .fxtop{
    width: 90%;
    height: 1rem;
    background: #f1eff0;
    position: fixed;
    bottom: 1.4rem;
    border-radius: 0.5rem;
    color: #66cc00;
    text-align: center;
    line-height: 1rem;
    font-size: 0.32rem;
  }
  .guanjia-content .con-wap{
    margin-bottom: 2.7333rem;
  }
</style>
