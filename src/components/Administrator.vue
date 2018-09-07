<template>
    <div id="administrator">
      <!-- 头部 -->
      <header class="guanli-header">
        <div class="bottom">
          <a href="javascript:history.go(-1)"><img src="../assets/images/jiantou.png" alt=""></a>
          <div class="sosu">
            <p>房源管理</p>
          </div>
          <a @clidk="submithouseagent" href="#" class="zhuce" ><p>完成</p></a>
        </div>
      </header>
      <div class="xinxi-kong"></div>
      <div class="tishi1">{{msg}}</div>
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
          <div class="con-n-dan clear" v-for="info in housedata" >
            <div class="dan-left">
              <img :src="info.mainImg" alt="">
            </div>
            <div class="dan-right">
              <p>{{info.subTitle}} <span class="da">{{ info.price }}<span>万</span></span></p>
              <p>{{info.address}}</p>
              <p>{{info.layout}}{{info.averagePrice}}/m2</p>
            </div>
            <mt-checklist
              class="page-part"
              :max="5"
              align="right"
              v-model="checkList"
              :options="options3">
            </mt-checklist>
        <!--     <div class="dan-xuan">
              <div class="nav-k">
                <img src="../assets/images/my/dui.png" alt="">
              </div>
            </div> -->
          </div>
          <!-- 单个房源 -->
        </div>
        <div class="xinxi-kong"></div>
      </nav>
    </div>
</template>

<script>
import { Cell } from 'mint-ui';
import { Checklist } from 'mint-ui'
import {getCookie} from '../util/cookie'
export default {
  name: 'administrator',
  data () {
    return {
      checkList: [],
      options3: [],
      qiehuan: 0,
      housedata: '',
      msg:'',
    }
  },
  components: {
    'mt-checklist': Checklist
  },
  mounted () {
    this.options3 = [''];
    this.loadhouselist ()
  },
  methods : {
    loadhouselist () {
      this.checkList = []
      var houseinfo = {
        type : this.qiehuan,
        page : {
          pageNum : 1,
          pageSize : 10
        }
      }
      this.$http.post(myHost + 'myh_web/viewHouseInfo',houseinfo).then ((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.housedata = data
        console.log(data)
      })
    },
    submithouseagent () {
      var choise = {
        agentId: getCookie('userId'),
        houseIdList: this.checkList,
        type: 3,
      }
      this.$http.post(myHost + 'myh_web/saveTheHouseThatAgentChoise',choise).then ((response) => {
        var data = response.data
        data = data.resultBean
        var code = data.code
        if (code == 1) {
          this.msg = data.message
        } else if (code == 0) {
          this.msg = '提交成功'
          console.log('ok')
          tishi.style.display = block
        }
      })
    },
    clearTsmessage () {
      var that = this
      var tishi = document.getElementsByClassName('tishi1')
      setTimeout(function () {
        that.msg = ''
        tishi.style.display = none
      }, 3000)
    }
  }
};
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
  .guanli-content .con-nav .con-n-dan .dan-right p:nth-child(2){
    width: 60%;
  }
  .guanli-content .con-nav .con-n-dan .dan-right p:nth-child(1){
    position: relative;
  }
  .guanli-content .con-nav .con-n-dan .dan-right p:nth-child(1) .da{
    position: absolute;
    right: 0;
    top: 0.65rem;
  }
  .tishi1{
    width: 50%;
    height: 1rem;
    background: #eee;
    font-size: 0.4rem;
    text-align: center;
    line-height: 1rem;
    color: #000;
    border-radius: 0.5rem;
    position: fixed;
    top: 1.6rem;
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }
</style>
