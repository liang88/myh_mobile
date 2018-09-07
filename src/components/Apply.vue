<template>
    <div id="apply">
      <div class="xinxi-kong"></div>
      <!-- 内容 -->
      <nav class="yuyue-content clear">
        <!-- 切换 -->
        <!--<div class="con-head">-->
          <!--<div class="con-wap">-->
            <!--<div><span>进行中的活动</span></div>-->
            <!--<div><span>已结束的活动</span></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="con-del">-->
          <!--<div class="del-middle clear">-->
            <!--<p>取消</p>-->
            <!--<p>删除</p>-->
            <!--<p>全选</p>-->
          <!--</div>-->
        <!--</div>-->
        <!-- 浏览结果 -->
        <div class="con-nav clear">
          <div v-for="loohouse in mbhousedata" class="nav-middle">
            <div class="nav-top clear">
              <p>{{loohouse.title}}</p>
              <!--<p>已报名110人</p>-->
            </div>
            <div class="nav-bottom clear">
              <div class="bot-pic">
                <img style="width: 218px; height: 137px;" :src="loohouse.imgUrl"/>
              </div>
              <div class="bot-zi">
                <p>集合地址：<span>{{loohouse.address}}</span></p>
                <p>看房电话：{{loohouse.pMobile}}</p>
                <p>预约时间：{{loohouse.startTime|timeFormat}}</p>
                <p>集合时间：{{loohouse.endTime|timeFormat}}</p>
              </div>
            </div>
          </div>
        </div>
        <p class="wu">{{msg}}</p>
      </nav>
    </div>
</template>

<script>
import {getCookie} from "../util/cookie";
export default {
  name: 'apply',
  data(){
    return {
      mbhousedata: {},
      msg: ''
    }
  },
  mounted(){
    this.loadmbfd()
  },
  methods: {
    loadmbfd(){
      var mbfdinfo = {
        id: getCookie('userId')
      }
      this.$http.post(myHost+'myh_web/selectActivityByUser', mbfdinfo).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        var code = data.code
        if (code == 1) {
          this.msg = data.message
        } else {
          this. msg = ''
        }
        data = data.object
        this.mbhousedata = data
      })
    }
  }
};
</script>

<style scoped>
  .yuyue-content{
    margin-top: 0;
  }
  .wu{
    font-size: 0.4rem;
    background: #fff;
    color: #999;
    text-align: center;
  }
</style>
