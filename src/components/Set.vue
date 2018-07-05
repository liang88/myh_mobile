<template>
  <div id="set">
    <div class="xinxi-kong"></div>
    <!-- 内容 -->
    <nav class="set-content clear">
      <div class="set-quan">
        <div class="con-one clear">
          <p>新消息通知</p>
          <img src="images/my/you.png" alt="">
        </div>
      </div>
      <div class="set-quan">
        <div class="con-one clear">
          <p>关于满易何</p>
          <img src="images/my/you.png" alt="">
        </div>
      </div>
      <div class="set-quan">
        <div class="con-one clear">
          <p>推荐二维码</p>
          <img src="images/my/you.png" alt="">
        </div>
      </div>
      <div class="set-quan">
        <div class="con-one clear">
          <p>版权声明</p>
          <img src="images/my/you.png" alt="">
        </div>
      </div>
      <form action="">
        <div class="tuichu" type="text" @click="open">退出登录</div>
      </form>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {MessageBox} from 'mint-ui'
import {getCookie,delCookie} from '../util/cookie'
export default {
  name: 'set',
  data () {
    return {
      isLogin:false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    open() {
      MessageBox.confirm('确定执行此操作?').then(action => {
        delCookie('sessionId')
        delCookie('phone')
        delCookie('userId')
        this.isLogin = false
        this.$router.go(0)
        this.$router.push('/')
      });
    },
  }
};
</script>

<style scoped>
  .tuichu{
    border: none;
    display: inline-block;
    background: #f1f1f1;
    width: 100%;
    padding: 0.4rem 0;
    font-size: 0.4rem;
    color: #000;
    text-align: center;
  }
</style>
