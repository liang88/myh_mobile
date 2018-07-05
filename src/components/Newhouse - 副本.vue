<template>
    <div id="newhouse">
      <div id="top">
        <!-- 头部 -->
        <router-link class="hearouter" reg="div" to="/Search">
        <header>
          <div class="bottom">
            <a href="javascript:history.go(-1)"><img src="../assets/images/jiantou.png" alt=""></a>
            <input type="text"  class="sosu2"   placeholder="找新房，搜满易"/>
            <input type="button" class="soubtn" value="搜索" />
          </div>
        </header>
        </router-link>
      </div>
      <nav class="clear">
        <div class="tabs">
          <a href="javascript:;" @click="tabsclick(1)" :id="this.types==1?'tabs_a':''">最新一手房</a>
          <a href="javascript:;" @click="tabsclick(0)" :id="this.types==0?'tabs_a':''">全部楼盘</a>
        </div>
        <div class="banner">
          <router-link tag="a" :to="'/Housesay/'+33+'/'+1"><img src="../assets/images/fangxun/xinfang.jpg" alt=""></router-link>
        </div>
        <!-------------筛选--------------->
        <div class="housescreen">
          <div class="screen_menu">
            <!------区域-------->
            <a class="screen_wid" @click="scrcitys" href="#">区域<span v-if="ctsjiao"></span><span v-else class="nbian"></span></a>
            <!------户型-------->
            <a class="screen_wid" @click="scrhuxing"   href="#">户型<span v-if="ctsjiao"></span><span v-else class="nbian"></span></a>
            <!------均价-------->
            <a class="screen_wid" @click="scraverage"   href="#">均价<span v-if="ctsjiao"></span><span v-else class="nbian"></span></a>
          </div>
        </div>
        <!-------------筛选--------------->
        <!--<div class="sousuohouse">-->
          <!--<form>-->
            <!--<input type="text"  v-model="souhouse"   placeholder="请输入关键字或经纪人姓名、电话">-->
          <!--</form>-->
          <!--<div @click="souhouseon" class="sousuo_btn">搜索</div>-->
        <!--</div>-->
        <!--<div class="soumessage" v-show="xianshishow">{{soumessage}}</div>-->
        <!--<div class="list">-->
          <!--<ul>-->
            <!--<li class="qie" :style="c==true?'color:#ff6600':''" @click="mydefault(a)">默认排序</li>-->
            <!--<li class="sanjiao" :style="c==false?'color:#ff6600':''"  @click="myprice(a)">价格<span class="" v-if="sjiao"></span><span v-else class="bian"></span></li>-->
          <!--</ul>-->
        <!--</div>-->
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
          <a href="javascript:;" @click="hotlp" >
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
      sjiao: true,
      a: '1',
      c: true,
      green: {
        'color': '#66cc00'
      },
      types: 1,
      souhouse: '',
      soumessage: '',
      jieshomessage: '',
      housedatashow: true,
      jieshaomessage: false,
      xianshishow: true,
      ctsjiao: true
    }
  },
  mounted () {
    this.houseall()
  },
  methods: {
    mydefault () {
      this.a = 1
      this.c = true
      this.houseall()
    },
    myprice () {
      this.sjiao = !this.sjiao
      this.c = false
      if (this.a == 1) {
        this.a = 0
      } else {
        this.a = 1
      }
      this.houseall()
    },
    tabsclick(e){
      this.types = e
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
      console.log( this.types)
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
    souhouseon(){
      if(!this.souhouse){
        this.soumessage = '亲，请输入搜索内容！'
        this.clearmessage()
        return
      }
      var souinfos = {
        subTitle: this.souhouse,
        page:{
          pageNum: 1,
          pageSize: 100
        }
      }
      this.$http.post(myHost+'/myh_web/likeMyhHouse', souinfos).then((response)=>{
        var data = response.data
        data = data.resultBean
        var mycods = data.code
        if(mycods== '1'){
          this.housedatashow = false
          this.jieshaomessage= true
          this.jieshomessage =data.message
        }else{
          this.housedatashow = true
          this.jieshaomessage= false
          data = data.object
          data = data.list
          this.housedata = data
        }

      })
    },
    clearmessage () {
      var that = this
      setTimeout(function () {
        that.xianshishow = ''
      }, 3000)
    },
    scrcitys(){
      this.ctsjiao = !this.ctsjiao
    },
    scrhuxing(){
      this.ctsjiao = !this.ctsjiao
    },
    scraverage(){
      this.ctsjiao = !this.ctsjiao
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
.tabs{
  border-bottom: 2px solid #cccccc;
  border-top: 1px solid #f5f5f5;
  line-height: 45px;
  display: block;
  text-align: center;
}
#tabs_a{
  text-decoration: none;
  font-size:20px;
  background: #ffffff;
  color:#66cc00 ;
  border-bottom: 2px solid #66cc00;
}
.tabs a{
  text-decoration: none;
  font-size:18px;
  line-height: 60px;
  display: inline-table;
  padding: 0px 20px;
  font-weight: bold;
  color: #000000;
  margin-bottom: -2px;
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
    padding: 5px 10px;
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
    overflow: hidden;
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
    top:25px;
  }
.screen_wid .nbian{
    border: 5px solid #333333;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    position: absolute;
    right: 20%;
    top:10px;
  }
</style>
