<template>
  <div class="hello">
    <nav class="clear">
    <Bannerview></Bannerview>
    <Classblock></Classblock>
    <div class="re">
      <a href="" class="tit">
        <div class="kuai"></div>
        <div class="zhong">
          <p>热门楼盘</p>
        </div>
      </a>
      <router-link  class="nei" tag="a" v-for="inan in indexdate" :to="'/Housesay/'+ inan.id+'/'+inan.type">
        <div class="nei-z">
          <div class="nei-z-l">
            <img :src="inan.mainImg" alt="">
          </div>
          <div class="nei-z-r">
            <div class="x-tit">
              <p>{{inan.subTitle}}</p>
              <p><span>{{inan.averagePrice}}</span>元／㎡</p>
            </div>

            <p class="p1">面积：{{inan.measure}}平方米</p>
            <p class="p2">{{inan.address}}</p>
            <div class="kuai-zi">
              <span v-for="tese in inan.featureName">{{tese}}</span>
            </div>
          </div>
        </div>
      </router-link>
      <a href="###" @click="hotlp"   class="gengd">
        更多推荐
      </a>
    </div>
    <div class="yishou">
      <a href="" class="tit">
        <div class="kuai"></div>
        <div class="zhong">
          <p>最新一手房</p>
        </div>
      </a>
      <router-link v-for="han in housedatalist"  class="nei"  tag="a" :to="'/Housesay/'+ han.id+'/'+han.type">
        <div class="nei-z">
          <div class="nei-z-l">
            <img :src="han.mainImg" alt="">
          </div>
          <div class="nei-z-r">
            <div class="x-tit">
              <p>{{han.subTitle}}</p>
            </div>

            <p class="p1">{{han.layout}}</p>
            <p class="p2">{{han.address}}</p>
            <div class="kuai-zi">
              <span v-for="housef in han.housemafeaure">{{housef}}</span>
            </div>
            <p class="ding">{{han.price}}万</p>

          </div>
        </div>
      </router-link>
      <router-link tag="a" class="gengd" to="/Newhouse">
        更多房源
      </router-link>
    </div>
    </nav>
  </div>
</template>feature

<script>
import Bannerview from './Bannerindex'
import Classblock from './Classblock'
export default {
  name: 'hello',
  data () {
    return {
      indexdate: {},
      housedatalist: {}
    }
  },
  components: {
    Bannerview,
    Classblock
  },
  mounted () {
    this.homebtn()
    this.is_weixn()
  },
  methods: {
    homebtn () {
      var infos = {
        type: 1
      }
      this.$http.post(myHost+ 'myh_web/viewHouseInfo', infos).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        for(var i=0; i< data.length; i++){
          data[i].housemafeaure = data[i].feature.split(',').slice(0, 2)
        }
        this.housedatalist = data.slice(0, 10)
      })
      var pages = {
        pageNum: 1,
        pageSize: 2
      }
      this.$http.post(myHost+ 'myh_web/viewHotImg', pages).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        for(var i=0; i< data.length; i++){
          data[i].featureName = data[i].feature.split(',').slice(0, 3)
        }
        this.indexdate = data
      })
    },
    hotlp () {
      var pages = {
        pageNum: 1,
        pageSize: 10
      }
      this.$http.post(myHost+ 'myh_web/viewHotImg', pages).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        for(var i=0; i< data.length; i++){
          data[i].featureName = data[i].feature.split(',').slice(0, 3)
        }
        this.indexdate = data
      })
    },
    is_weixn(){ 
      var ua = navigator.userAgent.toLowerCase();
      var that = this
      if(ua.match(/MicroMessenger/i)=="micromessenger") { 
        that.$router.push('/Slide')
      } else { 
        that.$router.push('/')
      } 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
