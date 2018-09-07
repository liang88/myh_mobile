<template>
    <div id="mymiddleman">
      <div class="xinxi-kong"></div>
      <!-- 内容 -->
      <nav class="jingji-content clear">
        <!-- 切换 -->
        <div class="con-head">
          <div @click="record_title (1)" ><span :class="recordshow == true ? 'bg' : '' ">联系过的经纪人</span></div>
          <div @click="record_title (0)" ><span :class="recordshow != true ? 'bg' : '' ">我收藏的经纪人</span></div>
        </div>
        <!-- 浏览结果 -->
        <div class="con-nav">
          <!-- 单个 -->
          <div v-show="shop1" class="list" v-for="house in houselist" >
            <div class="list-middle clear">
              <div class="list-pic">
                <div class="list-pic-wap">
                  <img :src="house.headUrl" alt="">
                </div>
              </div>
              <router-link class="list-tit" tag="div" :to="'/Middleman/'+house.id">
                <p>{{house.name}}</p>
                <p>手机号 : <span>{{house.mobile}}</span></p>
                <p>{{house.area}} : <span>{{house.project}}</span></p>
                <div class="spa">
                  <span v-for="mi in house.tag">{{mi}}</span>
                </div>
                <img v-show="house.agentLevel == 1" src="../assets/images/tong.png" alt="">
                <img v-show="house.agentLevel == 2"  src="../assets/images/yin.png" alt="">
                <img v-show="house.agentLevel == 3"  src="../assets/images/jin.png" alt="">
              </router-link>
              <div class="list-tel" :href="'tel:'+house.mobile">
                <img src="../assets/images/tel.png" alt="">
              </div>
            </div>
          </div>
          <!-- 单个 -->
          <div v-show="shop2" class="list" v-for="houses in houselisttwo" >
            <div class="list-middle clear">
              <div class="list-pic">
                <div class="list-pic-wap">
                  <img :src="houses.headUrl" alt="">
                </div>
              </div>
              <router-link class="list-tit" tag="div" :to="'/Middleman/'+houses.id">
                <p>{{houses.name}}</p>
                <p>手机号 : <span>{{houses.mobile}}</span></p>
                <p>{{houses.area}} : <span>{{houses.project}}</span></p>
                <div class="spa">
                  <span v-for="mi in houses.tag">{{mi}}</span>
                </div>
                <img v-show="houses.agentLevel == 1" src="../assets/images/tong.png" alt="">
                <img v-show="houses.agentLevel == 2"  src="../assets/images/yin.png" alt="">
                <img v-show="houses.agentLevel == 3"  src="../assets/images/jin.png" alt="">
              </router-link>
              <div class="list-tel" :href="'tel:'+houses.mobile">
                <img src="../assets/images/tel.png" alt="">
              </div>
            </div>
          </div>
          <p class="tishi"> {{tishi}} </p>
        </div>
        <div class="xinxi-kong"></div>
      </nav>
    </div>
</template>

<script>
import {getCookie} from '../util/cookie'
export default {
  name: 'mymiddleman',
  data () {
    return {
      houselist: [],
      houselisttwo: [],
      tishi:'',
      retype: 1,
      recordshow : true,
      shop1: true,
      shop2: false
    }
  },
  mounted () {
    // this.myhouse()
    // this.myhousetwo()
  },
  methods: {
    myhouse  () {
      console.log(this.retype)
      var infos = {
        userId: getCookie('userId'),
        page: {
          pageNum: 1,
          pageSize:10
        }
      }
      this.$http.post(myHost + 'myh_web/myCollectAgent',infos).then((response) => {
        var data = response.data
        data = data.resultBean
        console.log(data.code)
        var code =data.code
        if (code == '0') {
          data = data.object
          data = data.list
          this.houselist = data
        } else {
          this.tishi = data.message
        }
      })
    },
    myhousetwo  () {
      console.log(this.retype)
      var infoss = {
        userId: getCookie('userId'),
        page: {
          pageNum: 1,
          pageSize:10
        }
      }
      this.$http.post(myHost + 'myh/viewCalledAgent',infoss).then((response) => {
        var data = response.data
        data = data.resultBean
        console.log(data.code)
        var code =data.code
        if (code == '0') {
          data = data.object
          data = data.list
          this.houselisttwo = data
        } else {
          this.tishi = data.message
        }
      })
    },
    record_title (e) {
      this.retype = e
      if (this.retype == 1) {
        this.recordshow = true
        this.shop1 = false
        this.shop2 = true
        this.myhousetwo ()
      } else if(this.retype == 0) {
        this.recordshow = false
        this.shop1 = true
        this.shop2 = false
        this.myhouse ()
      }
    },
  }
};
</script>

<style scoped>
  .jingji-content{
    margin-top: 0;
  }
  .jingji-content .con-head{
    margin-top: 0;
  }
  .jingji-content .con-nav .tishi{
    font-size: 0.4rem;
    color: #999;
    text-align: center;
    line-height: 1rem;
  }
</style>
