<template>
    <div id="administrator">
      <!-- 头部 -->
      <header class="guanli-header">
        <div class="bottom">
          <a href="javascript:history.go(-1)"><img src="../assets/images/jiantou.png" alt=""></a>
          <div class="sosu">
            <p>房源管理</p>
          </div>
          <a href="#" class="zhuce"><p>完成</p></a>
        </div>
      </header>
      <div class="xinxi-kong"></div>
      <!-- 内容 -->
      <nav class="guanli-content clear">
        <!-- 切换 -->
        <div class="con-head">
          <!-- <div><span>一手房源</span></div> -->
          <div><span>最新楼盘</span></div>
        </div>
        <div class="tishi">
          选择你所需要的房源不得超过5个
        </div>
        <!-- 浏览结果 -->
        <div class="con-nav">
          <!-- 单个房源 -->
          <div class="con-n-dan clear">
            <mt-checklist
              :max="2"
              v-model="data.selected.name"
              :options="选择">
            </mt-checklist>
            <div class="dan-left">
              <img src="../assets/images/my/fangyuan1.png" alt="">
            </div>
            <div class="dan-right">
              <p>御道庄园 <span class="da">320<span>万</span></span></p>
              <p>承德市围场满族蒙古族自治县承德市围场满族蒙古族自治县</p>
              <p>2室1厅1卫100/m2</p>
            </div>
            <div class="dan-xuan">
              <div class="nav-k">
                <img src="../assets/images/my/dui.png" alt="">
              </div>
            </div>
          </div>
          <!-- 单个房源 -->
        </div>
        <div class="xinxi-kong"></div>
      </nav>
    </div>
</template>

<script>
import {Checklist} from 'mint-ui'
export default {
  name: 'administrator',
  data () {
    return {
    }
  },
  computed: {
    'mt-checklist': Checklist
  }
}
</script>

<style scoped>
  header .bottom .sosu{
    border: none;
  }
  header .bottom a{
    text-align: center;
    line-height: 1.17333rem;
    font-size: 0.4rem;
    color: #333;
  }
  .guanli-header .bottom{
    background: #eee;
  }
</style>
