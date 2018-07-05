<template>
    <div id="searchw">
      <div id="top">
        <!-- 头部 -->
        <header>
          <div class="bottom">
            <a href="javascript:history.go(-2)"><img src="../assets/images/jiantou.png" alt=""></a>
            <input type="text"  class="sosu2" v-model="soutext"  placeholder="找新房，搜满易"/>
            <input type="button" class="soubtn" @click="soubtn" value="搜索" />
          </div>
        </header>
      </div>
      <nav class="clear">
        <!--<div class="lishi">-->
          <!--<p>搜索历史</p>-->
        <!--</div>-->
        <div class="tuijian">
          <p>搜索结果</p>
        </div>
        <nav class="clear">
          <div class="jieshao">
        <div class="js-dan" >
          <div class="tishisay" v-show="showtishi">{{tishisay}}</div>
            <div class="js-dan-middle" v-for="hous in searchdata">
              <router-link tag="a" :to="'/Housearch/'+hous.id+'/'+hous.type">
              <div class="js-tu">
                <img :src="hous.mainImg">
              </div>
              <div class="js-zi">
                <div class="d1">{{hous.subTitle}}<p><span>{{hous.averagePrice}}</span>元/㎡</p></div>
                <div class="d2"><span class="hadress">{{hous.address}}</span><p><img src="../assets/images/fangxun/dianhua.png" alt="">400-1133-233</p></div>
                <div class="d3">户型：{{hous.layout}}</div>
                <div class="d4">建筑面积：{{hous.measure}}㎡</div>
                <div class="d5">
                  <span>{{hous.houseType}}</span>
                </div>
              </div>
              </router-link>
            </div>
        </div>
          </div>
        </nav>
        <div class="tuijian">
          <p>推荐小区</p>
        </div>

        <div class="tj-con">
          <p><a href="###" @click="soubtn4">{{seacon4}}</a><a href="###" @click="soubtn2">{{seacon}}</a><a href="###" @click="soubtn3">{{seacon2}}</a></p>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'searchw',
  data () {
    return {
      soutext: '',
      searchdata: {},
      seacon: '御道庄园',
      seacon2: '阿尔卡迪亚',
      tishisay: '',
      showtishi: false,
      seacon4: '北京一号院'
    }
  },
  mounted () {
    // this.sousuo()
  },
  methods: {
    soubtn () {
      var mycon = this.soutext
      var soutitle = {
        'subTitle': mycon,
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      this.$http.post(myHost+ 'myh_web/likeMyhHouse', soutitle).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var mycodes = data.code
        var objdata = data.object
        if (mycodes == '1') {
          this.showtishi = true
          this.tishisay = data.message
          return
        } else {
          this.showtishi = false
          objdata = objdata.list
          this.searchdata = objdata
        }
      })
    },
    soubtn2 () {
      var mycon = this.seacon
      var soutitle = {
        'subTitle': mycon,
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      console.log(soutitle)
      this.$http.post(myHost+ 'myh_web/likeMyhHouse', soutitle).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        var mycodes = data.code
        var objdata = data.object
        if (mycodes == '1') {
          this.showtishi = true
          this.tishisay = data.message
          return
        } else {
          this.showtishi = false
          objdata = objdata.list
          this.searchdata = objdata
        }
      })
    },
    soubtn3 () {
      var mycon = this.seacon2
      var soutitle = {
        'subTitle': mycon,
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      this.$http.post(myHost+ 'myh_web/likeMyhHouse', soutitle).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var mycodes = data.code
        var objdata = data.object
        if (mycodes == '1') {
          this.showtishi = true
          this.tishisay = data.message
          return
        } else {
          this.showtishi = false
          objdata = objdata.list
          this.searchdata = objdata
        }
      })
    },
    soubtn4 () {
      var mycon = this.seacon4
      var soutitle = {
        'subTitle': mycon,
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      this.$http.post(myHost+ 'myh_web/likeMyhHouse', soutitle).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var mycodes = data.code
        var objdata = data.object
        if (mycodes == '1') {
          this.showtishi = true
          this.tishisay = data.message
          return
        } else {
          this.showtishi = false
          objdata = objdata.list
          this.searchdata = objdata
        }
      })
    }
  }
}
</script>

<style scoped>
@import "../assets/css/sousuo.css";
@import "../assets/css/index.css";
@import "../assets/css/xinfang.css";
  .tishisay{
    display: block;
    text-align: center;
    padding: 0.3rem  0px;
    font-size:0.5rem;
    color: #66cc00;
  }
</style>
