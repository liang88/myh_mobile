<template>
    <div id="record">
      <div class="xinxi-kong"></div>
      <!-- 内容 -->
      <nav class="liulan-content clear">
        <!-- 切换 -->
        <div class="con-head">
          <div @click="record_title (1)"><span :class="recordshow == true ? 'bg' : '' ">一手房源</span></div>
          <div @click="record_title (0)"><span :class="recordshow != true ? 'bg' : '' ">最新楼盘</span></div>
        </div>
        <!-- 浏览结果 -->
        <div v-if="recordshow" class="con-nav">
          <!-- 单个房源 -->
          <div class="con-n-dan clear" v-for="insdata in resdata">
            <router-link tag="a" :to="'/Housesay/'+insdata.id+'/'+insdata.type">
              <div class="dan-left">
                <img :src="insdata.mainImg" alt="">
              </div>
              <div class="dan-right">
                <p>{{insdata.subTitle}} <span class="da">{{insdata.price}}<span>万</span></span></p>
                <p>{{insdata.address}}</p>
                <p>{{insdata.layout}} {{insdata.averagePrice}}/m2</p>
                <p>
                  <span v-for="myfea in insdata.merfearure">{{myfea}}</span>
                </p>
              </div>
            </router-link>
          </div>
          <!-- 无浏览结果-无 -->
          <div class="con-nav-wu" v-show="db">
            <img src="../assets/images/my/logo.png" alt="">
            <p>暂无纪录</p>
            <router-link tag="p" to="/Newhouse">收藏一手房源</router-link>
          </div>
        </div>
        <!-- 浏览结果 -->
        <div v-else class="con-nav">
          <!-- 单个房源 -->
          <div class="con-n-dan clear" v-for="insdata in resdata">
            <router-link tag="a" :to="'/Housesay/'+insdata.id+'/'+insdata.type">
              <div class="dan-left">
                <img :src="insdata.mainImg" alt="">
              </div>
              <div class="dan-right">
                <p>{{insdata.subTitle}} <span class="da">{{insdata.price}}<span>万</span></span></p>
                <p>{{insdata.address}}</p>
                <p>{{insdata.layout}} {{insdata.averagePrice}}/m2</p>
                <p>
                  <span v-for="myfea in insdata.merfearure">{{myfea}}</span>
                </p>
              </div>
            </router-link>
          </div>
          <!-- 无浏览结果-无 -->
          <div class="con-nav-wu" v-show="db">
            <img src="../assets/images/my/logo.png" alt="">
            <p>暂无纪录</p>
            <router-link tag="p" to="/Newhouse">收藏楼盘</router-link>
          </div>
        </div>
        <div class="xinxi-kong"></div>
        <div class="con-headt clear">
          <p>推荐一手房</p>
          <router-link tag="p" to="/Newhouse" >更多</router-link>
        </div>
        <div class="con-navt">
          <!-- 单个房源 -->
          <div class="con-n-dan clear" v-for="two in twodata">
            <router-link tag="a" :to="'/Housesay/'+two.id+'/'+two.type">
              <div class="dan-left">
                <img :src="two.mainImg" alt="">
              </div>
              <div class="dan-right">
                <p>{{two.subTitle}}</p>
                <p>{{two.address}}</p>
                <p>{{two.layout}} {{two.averagePrice}}/m2</p>
                <p>
                  <span v-for="myfea in two.merfearure">{{myfea}}</span>
                </p>
                <p><span class="da">{{two.price}}<span>万</span></span></p>
              </div>
            </router-link>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
import {getCookie} from '../util/cookie'
export default {
  name: 'record',
  data () {
    return {
      db : false,
      resdata : {},
      twodata : {},
      retype : 1,
      merfearure : '',
      recordshow : true
    }
  },
  mounted () {
    this.loadmall ()
    this.recommend ()
  },
  methods: {
    loadmall () {
      this.resdata = ''
      var userid = getCookie ('userId')
      var info = {
        type : this.retype,
        userId : userid,
        page : {
          pageNum : 1,
          pageSize : 10
        }
      }
      this.$http.post (myHost + 'myh_web/selectConllert',info).then ((response) => {
        var data = response.data
        data = data.resultBean
        var code = data.code
        // console.log(code)
        if (code == 1) {
          this.db = true
          console.log(data.message)
        } else if (code == 0) {
          data = data.object
          data = data.list
          this.resdata = data
          this.db = false
          for(let i = 0; i< data.length; i++){
            data[i].merfearure = data[i].feature.split(',').slice(0, 2)
          }
          // console.log(this.resdata)
        }
      })
    },
    record_title (e) {
      this.retype = e
      if (this.retype == 1) {
        this.recordshow = true
        this.loadmall ()
      } else if(this.retype == 0) {
        this.recordshow = false
        this.loadmall ()
      }
    },
    recommend () {
      var infos = {
        type : 1,
        pageNum : 1,
        pageSize : 3
      }
      this.$http.post (myHost + 'myh_web/viewHouseInfo',infos).then ((response) => {
        var data = response.data
        data = data.resultBean
        var code = data.code
        data = data.object
        data = data.list
        this.twodata = data
        for(let i = 0; i< data.length; i++){
          data[i].merfearure = data[i].feature.split(',').slice(0, 1)
        }
        // console.log(data)
      })
    }
  }
};
</script>

<style scoped>
  .dan-left img{
    height: 100%;
  }
</style>
