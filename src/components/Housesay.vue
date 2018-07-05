<template>
    <div id="housesay">
      <nav class="clear">
        <div class="housesay_banner">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="mts in mtdata"><img :src="mts" /> </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="big-tit">
          <div class="big-tit-nav">
            <div class="tit">
              <h1>{{housedatelist.subTitle}} </h1>
              <p>{{stateshow}}</p>
            </div>
            <div class="zi-kuang clear">
              <span>五证齐全</span>
              <span>车位充足</span>
            </div>
            <p class="zhuzhai">住宅：<span>{{housedatelist.measure}}／㎡</span><span>23小时前更新</span></p>
            <p class="mianji">户型：{{housedatelist.layout}}</p>
            <p class="dizhi">地址：{{housedatelist.address}}</p>
          </div>
        </div>

        <div class="gaikuang">
          <div class="gk-top">
            <h2>楼盘概况</h2>
          </div>
          <div class="house_basic clear">
            <ul>
              <li><p>优惠房价:   </p>{{housedatelist.averagePrice}}元／㎡</li>
              <li><p>电梯情况: </p>{{housedatelist.elevator}}</li>
              <li><p>房屋类型: </p> {{housedatelist.houseType}}</li>
              <li><p>楼层:</p>{{housedatelist.floor}}</li>
              <li><p>朝向:  </p>{{housedatelist.towards}}</li>
              <li v-show="huxinggo"><p>户型:</p>{{housedatelist.layout}}</li>
              <li><p>面积:</p>{{housedatelist.measure}}/㎡ </li>
              <li><p>绿化率:</p>{{housedatelist.afforest}}</li>
              <li><p>产权:</p>{{housedatelist.equity}}</li>
              <li><p>装修情况:</p>{{housedatelist.fitment}}</li>
              <li><p>建筑年代:</p>{{housedatelist.houseTimes}}年</li>
            </ul>
          </div>
        </div>

        <div class="huxing">
          <div class="hx-top">
            <h2>户型介绍</h2>
          </div>
          <div class="hx-q clear">
            <div class="hx-q-d clear"  v-for="hx in hxing" >
              <div class="hx-middle clear">
                <div class="hx-img">
                  <img @click="hximgbtn(hx.imgA)" :src="hx.imgA">
                </div>
                <!---------浮层----------->
                <div class="maximg" v-show="maximgshow">
                  <a href="javascript:;" @click="maximgclose"><img src="../assets/images/closes.png" /> </a>
                  <img :src="newmaximg">
                </div>
                <!---------浮层----------->
                <div class="hx-zi">
                  <p>{{hx.layout}} 建筑面积 {{hx.measure}}㎡<span>（{{hx.towards}}）</span></p>
                  <p>均价 <span>{{hx.avgPrice}}</span> 万／套</p>
                  <p>最近更新时间：{{hx.createTime}}</p>
                  <div>
                    <span v-for="hxtese in hxingfeature">{{hxtese}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="zhoubian">
          <div class="zb-top">
            <h2>周边配套</h2>
          </div>
          <!-------百度地图------->
          <div id="allmap"></div>
        </div>
        <counterview></counterview>
        <!----------评论-------------->
        <div class="pj">
          <div class="pj-middle">
            <p>用户评论</p>
          </div>
        </div>
        <div class="pingjia-wap">
          <div class="pingjia" v-for="pjan in pingjiadate">
            <div class="pingjia-middle clear" >
              <div class="pingjia-pic">
                <div class="pic-kap">
                  <img src="../assets/images/head.jpg" alt="">
                </div>
              </div>
              <div class="pingjia-xing">
                <div class="name clear">
                  <p>{{pjan.mobile}}</p>
                  <div v-html="tranxingstart(pjan.score)">
                  </div>
                </div>
                <div class="day">
                  <p>{{pjan.comment}}</p>
                  <p>{{pjan.commentTime|timeFormat}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="pingmore"><a @click="pjshowmore()" href="javascript:;">更多评论>></a> </div>
        </div>
        <div class="pj">
          <div class="pj-middle">
            <p>我要评论</p>
          </div>
        </div>
        <div class="pingjia-wap plpadding">
          <div class="pjstars">评分：
            <div class="pjstar_this">
              <a href="###" @click="currentclick(1)"  :id="currentIndex>=1?'xuanzhong':''" ></a>
              <a href="###" @click="currentclick(2)"  :id="currentIndex>=2?'xuanzhong':''" ></a>
              <a href="###" @click="currentclick(3)" :id="currentIndex>=3?'xuanzhong':''" ></a>
              <a href="###" @click="currentclick(4)" :id="currentIndex>=4?'xuanzhong':''" ></a>
              <a href="###" @click="currentclick(5)" :id="currentIndex>=5?'xuanzhong':''" ></a>
            </div>
          </div>
          <textarea class="textarea" v-model="textcon" placeholder="您最满意经纪人什么！跟大有分享一下吧"></textarea>
          <div>{{tishimessage}}</div>
          <input type="button" class="pjbtns" @click="tijiao_pf" value="提交"/>
        </div>
        <!----------评论------------------>
        <div class="remen">
          <div class="rm-top">
            <h2>更多推荐</h2>
          </div>
          <div class="rm-nav">
            <div v-for="typs in tujiandate"  class="rm-nav-d clear">
              <router-link reg="a" :to="'/Housearch/'+ typs.id">
              <div class="rm-tu">
                <a href="#"><img src="../assets/images/" </a>
                <img :src="typs.mainImg" alt="">
              </div>
              <div class="rm-zi">
                <p>{{typs.subTitle}}</p>
                <p>{{typs.address}}</p>
                <p>{{typs.layout}} <span>{{typs.measure}}／㎡</span> </p>
                <p class="clear">
                  <span v-for="myan in featurdate">{{myan}}</span>
                </p>
              </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="kongbai">

        </div>
      </nav>
      <div class="bind clear">
        <div class="guanzhu">
          <!--<img src="../assets/images/xiangqing/bind1.png" alt="">-->
          <!--<p>收藏</p>-->
        </div>
        <!--<div class="quan">-->
          <!--<img src="../assets/images/xiangqing/bind2.png" alt="">-->
          <!--<p>领取优惠券</p>-->
        <!--</div>-->
        <a href="tel:400-1133233" class="jjr" >
          免费咨询经纪人
        </a>
      </div>
    </div>
</template>

<script>
import counterview from './Counter'
import { Swipe, SwipeItem } from 'mint-ui'
import {getCookie} from "../util/cookie"
import 'mint-ui/lib/style.css'
export default {
  name: 'housesay',
  data () {
    return {
      mtdata: {},
      housedatelist: {},
      stateshow: '',
      hxing: {},
      myads: '',
      myname: '',
      tujiandate: [],
      featurdate: [],
      hxingfeature: [],
      maximgshow:false,
      newmaximg: '',
      pingjiadate: [],
      tishimessage: '',
      textcon: '',
      currentIndex: '',
      annum: 10,
      currentpj: 1,
      huxinggo: true
    }
  },
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem,
    counterview
  },
  mounted () {
    this.mhsload()
    this.loadpingjia()
  },
  methods: {
    mhsload () {
      var myid = this.$route.params.id
      var mypid = this.$route.params.pid
      if(mypid=='1'){
        this.huxinggo = true
      }else if(mypid=='0'){
        this.huxinggo = false
      }
      var typeinfo = {
        houseId: myid
      }
      this.$http.post(myHost+ 'myh_web/viewHouseInfo',typeinfo).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        data = data[0]
        this.myads = data.address
        this.myname = data.subTitle
        var sees = data.state
        this.housedatelist = data
        if (sees == '2') {
          this.stateshow = '楼盘在售'
        } else if (sees == '1') {
          this.stateshow = '已售馨'
        }
        this.loadmap()
        var imglist = data.imgId
        this.mtdata = imglist.split(',')
      })
      this.$http.post(myHost+ 'myh_web/viewLayInfo',typeinfo).then((res) => {
        // console.log(res)
        var data = res.data
        data = data.resultBean
        data = data.object
        this.hxing = data
        for(var i=0;i<this.hxing.length; i++){
          var myfeature2 = this.hxing[i].feature
          this.hxingfeature = myfeature2.split(',').slice(0,4)
        }
      })
      var typeifs = {
        type: '1',
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      this.$http.post(myHost+ 'myh_web/viewHouseInfo', typeifs).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.tujiandate = data.slice(0,5)
        for(var i=0;i<this.tujiandate.length; i++){
          var myfeature = this.tujiandate[i].feature
          this.featurdate = myfeature.split(',').slice(0,3)
        }

      })
    },
    loadmap () {
      var map = new BMap.Map('allmap')
      map.centerAndZoom ('承德', 12) // 这里是初始地图所显示的城市
      // map.enableScrollWheelZoom()   //启用滚轮放大缩小，默认禁用
      map.enableContinuousZoom()  //启用地图惯性拖拽，默认禁用
      this.searchByStationName()
    },
    searchByStationName () {
      var map = new BMap.Map('allmap')
      var localSearch = new BMap.LocalSearch(map)
      localSearch.enableAutoViewport() //允许自动调节窗体大小
      var keyword
      var mynames
      map.clearOverlays();//清空原来的标注
      keyword = this.myads
      // var keyword = document.getElementById("text_").value;
      var that = this
      localSearch.setSearchCompleteCallback(function (searchResult) {
        var sContent =
          "<div>" + "<h4 style='margin:0 0 5px 0;font-weight:bold; font-size:20px;padding:0.2em 0'>"+that.myname+"</h4>" +
          "<img style='float:right;margin:4px' id='imgDemo' src="+that.mtdata[0]+" width='139' height='104'/>" +
          "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>地址："+searchResult.keyword+"</p>" +
          "</div>"
        var poi = searchResult.getPoi(0)
        map.centerAndZoom(poi.point, 16)
        var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)) // 创建标注，为要查询的地方对应的经纬度
        map.addOverlay(marker)
        var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + sContent + "</p>")
        //marker.addEventListener("click", function () { this.openInfoWindow(infoWindow) })
        marker.openInfoWindow(infoWindow); //开启信息窗口
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      })
      localSearch.search(keyword)
    },
    hximgbtn(e){
      this.newmaximg = e
      this.maximgshow = true
    },
    maximgclose() {
      this.maximgshow = false
    },
    loadpingjia(){
      var pj = {
        houseId: this.$route.params.id,
        page: {
          'pageNum': 1,
          'pageSize': this.annum
        }
      }
      this.$http.post(myHost+ 'myh_web/viewHouseComm', pj).then((response) => {
        var data =response.data
        data = data.resultBean
        var anmessage = data.code
        if(anmessage=='1'){
          this.anmessage2 = data.message
        }else{
          data = data.object
          this.totals = data.total
          data = data.list
          this.pingjiadate = data
        }
      })
    },
    currentclick(r){
      this.currentIndex = r
      this.currentStar = r* 20
    },
    tijiao_pf(){
      var getuid = getCookie ('userId')
      if(!this.textcon){
        this.tishimessage = '亲 请输入评论内容!'
        this.clearthmessage()
        return
      }
      if(getuid == null){
        this.tishimessage = '亲 请登录网站在评论!'
        this.clearthmessage()
        return
      }
      var userIds =  {
        userId: getuid,
        houseId: this.$route.params.id,
        'comment': this.textcon,
        score: this.currentStar,
        page:{
          'pageNum': 1,
          'pageSize': this.annum
        }
      }
      console.log(userIds)
      this.$http.post(myHost+ 'myh_web/insertHouseComm', userIds).then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        var ticode = data.code
        if(ticode == '0'){
          this.tishimessage = '提交成功!'
          this.textcon = ''
          this.clearthmessage()
          this.loadpingjia()
        }
      })
    },
    clearthmessage(){
      var that= this
      setTimeout(function(){
        that.tishimessage = ''
      },3000)
    },
    fyclick(r){
      this.currentpage = r,
      this.loadpingjia()
    },
    pjshowmore(){
      this.currentpj = this.currentpj +1
      this.annum = this.currentpj * 10
      console.log(this.annum)
      var pj = {
        houseId: this.$route.params.id,
        page: {
          'pageNum': 1,
          'pageSize': this.annum
        }
      }
      this.loadpingjia()
    }
  }
}
</script>

<style scoped>
@import "../assets/css/xiangqing.css";
@import "../assets/css/jingji.css";
  .housesay_banner{
    height: 200px;
  }
.housesay_banner img{
  border: none;
  width: 100%;
  height: 200px;
}
 .house_basic{
   display: block;
   padding: 10px;
 }
.house_basic li{
  display: block;
  width: 50%;
  float: left;
  text-align: left;
  line-height: 30px;
  color: #333333;
  font-size:14px;
}
.house_basic li p{
display: inline-table;
  color: #666666;
  margin-right:10px
}
  #allmap{
    width: 100%;
    height: 200px;
  }

</style>
