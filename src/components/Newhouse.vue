<template>
    <div id="newhouse">
      <div id="top">
        <!-- 头部 -->
        <header>
          <div class="bottom">
            <a href="javascript:history.go(-1)"><img src="../assets/images/jiantou.png" alt=""></a>
            <div id="tabs">
              <a href="javascript:;" @click="tabsclick(1)" :id="this.types==1?'tabs_a':''">最新一手房</a>
              <a href="javascript:;" @click="tabsclick(0)" :id="this.types==0?'tabs_a':''">全部楼盘</a>
            </div>
            <router-link class="sousearch" reg="div" to="/Search"><img src="../assets/images/sousuo.png" /> </router-link>
          </div>
        </header>
      </div>
      <nav class="clear">
        <div class="banner">
          <router-link tag="a" :to="'/Housesay/'+33+'/'+1"><img src="../assets/images/fangxun/xinfang.jpg" alt=""></router-link>
        </div>
        <!-- -----------筛选------------- -->
        <div class="housescreen">
          <div class="screen_menu">
            <!-- ----区域------ -->
            <a class="screen_wid" @click="scrcitys" href="#">区域<span v-if="ctsjiao"></span><span v-else class="nbian"></span></a>
            <!------户型-------->
            <a class="screen_wid" @click="scrhuxing"   href="#">户型<span v-if="ctsjiao1"></span><span v-else class="nbian"></span></a>
            <!------均价-------->
            <a class="screen_wid" @click="scraverage"   href="#">均价<span v-if="ctsjiao2"></span><span v-else class="nbian"></span></a>
            <!-- ------二级区域------- -->
            <div v-show="twocitys" class="twolevelcity">
              <table cellpadding="0" cellspacing="0" width="100%" border="0">
                <tr>
                  <td class="twolevelcity1">
                    <a href="#" @click="twocityon('')" :class="ncity==''?'twohvr':''">全部</a>
                    <a href="#" @click="twocityon(twocitys)" v-for="twocitys in citydatalist" :class="ncity==twocitys?'twohvr':''">{{twocitys}}</a>
                  </td>
                  <td class="twolevelcity2">
                    <a href="#" @click="twoareas(twoshi)" :class="twoarea==twoshi?'twohvr':''" v-for="twoshi in twoshidate">{{twoshi}}</a>
                  </td>
                  <td class="twolevelcity3">
                    <a href="#" @click="twocountys(twoct)" :class="twocts==twoct?'twohvr':''" v-for="twoct in twocountydate">{{twoct}}</a>
                  </td>
                </tr>
              </table>
               <!--<div class="levelbtn"><a class="levelno" href="#">重置</a><a @click="citys_ok()" class="levelyes" href="#">确定</a></div>-->
            </div>
            <!-- ------二级户型------- -->
            <div v-show="huxing2"   class="twolevelcity">
              <div class="twohuxing">
                <a href="#" @click="twohuxing('')" :class="twohx==''?'twohvr':''">全部</a>
                <a href="#" @click="twohuxing('一室')" :class="twohx=='一室'?'twohvr':''">一室</a>
                <a href="#" @click="twohuxing('两室')" :class="twohx=='两室'?'twohvr':''">两室</a>
                <a href="#" @click="twohuxing('三室')" :class="twohx=='三室'?'twohvr':''">三室</a>
                <a href="#" @click="twohuxing('四室')" :class="twohx=='四室'?'twohvr':''">四室</a>
                <a href="#" @click="twohuxing('其他')" :class="twohx=='其他'?'twohvr':''">5室及以上</a>
              </div>
            </div>
            <!-- ------二级均价------- -->
            <div v-show="prices3"   class="twolevelcity">
              <table cellpadding="0" cellspacing="0" width="100%" border="0">
                <tr>
                  <td class="twolevelcity1">
                    <a href="#" @click="pricetop(1)" :class="a==1?'twohvr':''">价格从高到低</a>
                    <a href="#"  @click="pricetop(0)" :class="a==0?'twohvr':''">价格从低到高</a>
                  </td>
                  <td class="twolevelcity2">
                    <a href="#" @click="twoprice(0)" :class="twoprs=='0'?'twohvr':''">不限</a>
                    <a href="#" @click="twoprice(1)" :class="twoprs=='1'?'twohvr':''">5千以下</a>
                    <a href="#" @click="twoprice(2)" :class="twoprs=='2'?'twohvr':''">5千至1万</a>
                    <a href="#" @click="twoprice(3)" :class="twoprs=='3'?'twohvr':''">1万至2万</a>
                    <a href="#" @click="twoprice(4)" :class="twoprs=='4'?'twohvr':''">2万以上</a>
                  </td>
                </tr>
              </table>
            </div>
            <!----------遮罩层---------->
            <div class="twopjceng" @click="ppcengclick" v-show="ppceng"></div>
          </div>
        </div>
        <!-- -----------筛选------------- -->
        <div class="jieshao">
          <div class="js-dan"  v-show="housedatashow" v-for="hous in housedata">
            <router-link tag="a" :to="'/Housesay/'+hous.id+'/'+hous.type">
            <div class="js-dan-middle">
              <div class="js-tu">
                <img :src="hous.mainImg">
              </div>
              <div class="js-zi">
                <div class="d1">{{hous.subTitle}}<p><span>{{hous.averagePrice}}</span>元/㎡</p></div>
                <div class="d2"><span class="hadress">{{hous.address}}</span><p><img src="../assets/images/fangxun/dianhua.png" alt="">400-068-1359</p></div>
                <div class="d3">户型：{{hous.layout}}</div>
                <div class="d4">建筑面积：{{hous.measure}}㎡</div>
                <div class="d5">
                  <span v-for="myfea in hous.housefeature">{{myfea}}</span>
                </div>
              </div>
            </div>
            </router-link>
          </div>
          <div class="jieshomessage" v-show="jieshaomessage">{{jieshomessage}}</div>
          <div class="gengduo" v-show="this.housedata.length>=10">
          <a href="javascript:;" v-show="housedata.length==10" @click="hotlp" >
            加载更多
          </a>
          </div>
        </div>

      </nav>
    </div>
</template>
<script>
export default {
  name: 'newhouse',
  data () {
    return {
      stateshow: '',
      housedata: {},
      a: '1',
      c: true,
      green: {
        'color': '#66cc00'
      },
      types: 1,
      jieshomessage: '',
      housedatashow: true,
      jieshaomessage: false,
      ctsjiao: true,
      ctsjiao1: true,
      ctsjiao2: true,
      twocitys: false,
      huxing2: false,
      prices3: false,
      citydatalist: [],
      ncity: '',
      twoshidate: [],
      twoarea: '',
      twocountydate: [],
      twocts: '',
      twohx: '',
      twoprs: '',
      fromprs: '',
      toprs: '',
      ppceng: false,
      pritop: 0
    }
  },
  mounted () {
    this.houseall()
    this.loadcitys()
    this.loadscreenall()
    this.twocityon('')
  },
  methods: {
    tabsclick(e){
      this.types = e
      this.houseall()
    },
    pricetop(j){
      this.a = j
      this.houseall()
    },
    houseall () {
      var ty = {
        type: this.types,
        priceSort: this.a
      }
      this.$http.post(myHost+ 'myh_web/viewHouseInfo', ty).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        for(var i=0; i< data.length; i++){
          data[i].housefeature = data[i].feature.split(',').slice(0, 2)
        }
        this.housedata = data
      })
    },
    hotlp () {
      var pages = {
        priceSort: this.a,
        pageNum: 1,
        pageSize: 100
      }
      this.$http.post(myHost+ 'myh_web/viewHouseInfo', pages).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        for(var i=0; i< data.length; i++){
          data[i].housefeature = data[i].feature.split(',').slice(0, 2)
        }
        this.housedata = data
      })
    },
    clearmessage () {
      var that = this
      setTimeout(function () {
        that.xianshishow = ''
      }, 3000)
    },
    scrcitys (){
      this.ctsjiao = !this.ctsjiao
      this.twocitys = !this.twocitys
      this.ppceng = true
      this.huxing2 = false
      this.prices3 = false
    },
    scrhuxing(){
      this.ctsjiao1 = !this.ctsjiao1
      this.twocitys = false
      this.huxing2 = !this.huxing2
      this.prices3 = false
      this.ppceng = true
    },
    scraverage(){
      this.ctsjiao2 = !this.ctsjiao2
      this.twocitys = false
      this.huxing2 = false
      this.prices3 = !this.prices3
      this.ppceng = true
    },
    twoareas(s){
      this.twoarea = s
      var areainfos = {
        'city': this.twoarea,
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      this.$http.post(myHost+'/myh_web/viewTheAreas', areainfos).then((response)=>{
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.areaList
        this.twocountydate = data
      })
      this.loadscreenall()
    },
    twocountys(a){
      this.twocts =a
      this.loadscreenall()
    },
    twohuxing(m){
      this.twohx = m
      this.loadscreenall()
    },
    twoprice(x){
      this.twoprs = x
      if(this.twoprs == 0){
        this.fromprs = 0
        this.toprs = 0
      }else if(this.twoprs == 1){
        this.fromprs = 0
        this.toprs = 5000
      }else if(this.twoprs == 2){
        this.fromprs = 5000
        this.toprs = 10000
      }else if(this.twoprs == 3){
        this.fromprs = 10000
        this.toprs = 20000
      }else if(this.twoprs == 4){
        this.fromprs = 20000
        this.toprs = 0
      }
      this.loadscreenall()
    },
    loadcitys(){
      this.$http.post(myHost+'myh_web/viewAllProvinces').then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        this.citydatalist = data
      })
      this.loadscreenall()
    },
    twocityon(e){
      this.twocts = ''
      this.twoarea = ''
      this.ncity = e
      var cityinfos = {
        'province': this.ncity,
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      this.$http.post(myHost+'myh_web/viewTheCities', cityinfos).then((response)=>{
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.cityList
        this.twoshidate = data
      })
      this.loadscreenall()
    },
    loadscreenall(){
      var screensinfo = {
        'province': this.ncity,
        'city': this.twoarea,
        'area': this.twocts,
        'type': this.types,
        'layout': this.twohx,
        'fromPrice': this.fromprs,
        'toPrice': this.toprs,
        'priceSort': '1',
        'page': {
          'pageNum': 1,
          'pageSize': 10
        }
      }
      console.log(screensinfo)
      this.$http.post(myHost+'myh_web/filterHouses', screensinfo).then((response)=>{
        var data = response.data
        data = data.resultBean
        var showcode = data.code
        if(showcode == '1'){
          this.housedatashow = false
          this.jieshaomessage = true
          this.jieshomessage = data.message
          return
        }else if(showcode == '0'){
          this.housedatashow = true
          this.jieshaomessage = false
          data = data.object
          data = data.list
          for(var i=0; i< data.length; i++){
            data[i].housefeature = data[i].feature.split(',').slice(0, 2)
          }
          this.housedata = data
        }

      })
    },
    ppcengclick(){
      this.twocitys = false
      this.huxing2 = false
      this.prices3 = false
      this.ppceng = false
    }
  }
}
</script>

<style scoped>
@import "../assets/css/xinfang.css";
  .hadress{
    width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    height: 20px;
  }
.newtitle{
    display: inline-table;
    font-size:18px;
    background: #66cc00;
    line-height: 30px;
    padding: 5px 10px;
    color: #ffffff;
    margin-top:15px;
    margin-left:0.6rem;
  }
#tabs{
  line-height: 45px;
  display: block;
  overflow: hidden;
  text-align: center;
  width: 70%;
  float: left;
}
#tabs  a{
  text-decoration: none;
  font-size:16px;
  display: inline-table;
  padding: 0px 0px;
  font-weight: bold;
  color: #000000;
  width: 50%;
  text-align: center;
  line-height: 50px;
}
#tabs #tabs_a{
  text-decoration: none;
  font-size:16px;
  background: #ffffff;
  color:#66cc00 ;
  line-height: 50px;
  border-bottom: 2px solid #66cc00;
}
.sousuohouse{
  display: block;
  overflow: hidden;
  width: 88%;
  height: 0.9375rem;
  margin: 10px auto;
  border: 1px solid #66cc33;
  border-radius: 5px;
}
.sousuohouse form{
  width: 85%;
  height: 100%;
  float: left;
}
.sousuohouse form input{
  width: 95%;
  height: 100%;
  background: transparent;
  border: none;
  font-size: 0.40625rem;
  padding-left: 5%;
}
.sousuo_btn{
  width: 15%;
  float: right;
  display: block;
  height: 0.9375rem;
  line-height: 0.9375rem;
  background: #66cc33;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
  .soumessage{
    display: block;
    overflow: hidden;
    padding: 5px 10px;
    font-size:16px;
    text-align: center;
    color: #666666;
    margin-bottom: 10px;
  }
  .jieshomessage{
    display: block;
    overflow: hidden;
    padding: 30px 10px;
    font-size:16px;
    text-align: center;
    color: #666666;
    margin: 20px 0px;
  }
  .hearouter{
    display: block;
  }
  .housescreen{
    display: block;
    position: relative;
    width: 100%;
  }
  .screen_menu{
    display: block;
    position: relative;
  }
  .screen_wid{
    border-top: 1px solid #f5f5f5;
    display: inline-table;
    text-decoration: none;
    width: 32.5%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 0.375rem;
    font-weight: 800;
    color: #000000;
    position: relative;
  }
  .screen_wid span{
    border: 5px solid #333333;
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    position: absolute;
    right: 20%;
    top:15px;
  }
.screen_wid .nbian{
    border: 5px solid #333333;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    position: absolute;
    right: 20%;
    top:20px;
  }
.twopjceng{
  display: block;
  overflow: hidden;
  position: fixed;
  z-index: 9;
  left:0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: #ffffff;
  opacity: 0.1;
}
  .twolevelcity{
    display: block;
    position: absolute;
    z-index: 999999;
    left:0px;
    top: 48px;
    width: 100%;
    background: #ffffff;
    text-align: center;
  }
  .twolevelcity table tr td a{
    text-decoration: none;
    color: #000000;
    display: block;
    font-size: 14px;
    line-height: 35px;
  }
  .twolevelcity1{
    width: 33.3%;
    padding: 10px 0px;
  }
  .twolevelcity2{
    width: 33.3%;
    background: #fafafa;
    padding: 10px 0px;
  }
  .twolevelcity3{
    width: 33.3%;
    background: #f5f5f5;
    padding: 10px 0px;
  }
  .twolevelcity .twohvr{
    color: #66cc00;
  }
  .levelbtn{
    border-top: 1px solid #f5f5f5;
    display: block;
    overflow: hidden;
    padding: 15px 5%;
  }
  .levelno{
    display: block;
    float: left;
    background: #cccccc;
    color: #ffffff;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
    width: 25%;
    line-height: 45px;
  }
  .levelyes{
    display: block;
    float: right;
    background: #66cc00;
    color: #ffffff;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
    width: 65%;
    line-height: 45px;
  }
  .twohuxing{
    display: block;
    overflow: hidden;
    padding: 20px 10px;
  }
  .twohuxing a{
    color: #000000;
    text-decoration: none;
    border: 1px solid #dcdcdc;
    display: inline-block;
    line-height: 30px;
    padding: 0px 15px;
    border-radius: 5px;
    margin: 10px 15px;
    font-size: 14px;
  }
  .sousearch{
    display: block;
    width: 15%;
    height: 1.375rem;
    float: left;
    text-align: center;
    font-size:16px;
    color: #333333;
    line-height: 1.375rem;
  }
</style>
