<template>
    <div id="my">
      <!-- 头部 -->
      <header class="my-header clear">
        <router-link tag="div" to="/Information" class="head-pic">
          <img :src="houseobj.headUrl" alt="">
        </router-link>
        <router-link tag="div" to="/Information" class="head-name">
          <p>{{houseobj.mobile}}</p>
        </router-link>
        <router-link tag="div" to="/Set" class="head-set">
          <img src="../assets/images/my/sz.png" alt="">
        </router-link>
        <div class="head-huodong">
          我的活动
        </div>
      </header>
      <!-- 内容 -->
      <nav class="my-content">
        <div class="n-wap">
          <div class="n-cls clear">
            <router-link v-show="myfun01"  tag="div"  to="/Information">
              <img src="../assets/images/my/wo.png" alt="">
              <p>个人信息</p>
            </router-link>
            <router-link v-show="myfun02"   tag="div" to="/Record">
              <img src="../assets/images/my/kan.png" alt="">
              <p>浏览纪录</p>
            </router-link>
            <router-link v-show="myfun03" v-if="this.elsemen == 1"   tag="div" to="/Administrator">
              <img src="../assets/images/my/guanli.png" alt="">
              <p>房源管理</p>
            </router-link>
            <router-link v-show="myfun03" v-else   tag="div" to="/Administrator">
              <img src="../assets/images/my/guanli.png" alt="">
              <p>房源收藏</p>
            </router-link>
            <router-link v-show="myfun04" tag="div" to="/Mycomment" >
              <img src="../assets/images/my/pinglun.png" alt="">
              <p>我的评论</p>
            </router-link>
            <router-link v-show="myfun05"  tag="div" to="/Mymiddleman">
              <img src="../assets/images/my/jingji.png" alt="">
              <p>我的经纪人</p>
            </router-link>
            <router-link v-show="myfun06"  tag="div" to="/Counter">
              <img src="../assets/images/my/jisuan.png" alt="">
              <p>房贷计算器</p>
            </router-link>
            <router-link v-show="myfun07"  tag="div" to="/Feedback">
              <img src="../assets/images/my/fankui.png" alt="">
              <p>用户反馈</p>
            </router-link>
            <router-link v-show="myfun08"  tag="div" to="/Apply">
              <img src="../assets/images/my/baoming.png" alt="">
              <p>我的报名</p>
            </router-link>
          </div>
        </div>
        <div class="n-pic">
          <img src="../assets/images/my/guanggao.png" alt="">
        </div>
        <div class="n-zi clear">
          <p onclick="window.location.href = 'tel://4001133233'">客服咨询<img src="../assets/images/my/you.png" alt=""></p>
          <p>关注我们<img src="../assets/images/my/you.png" alt=""></p>
        </div>
        <div class="n-fang clear">
          <div class="fang-tit clear">
            推荐房源
            <router-link tag="p" to="/Newhouse" >更多</router-link>
          </div>
          <div class="fang-right swiper-container clear">
            <div class="f-tao swiper-wrapper">
              <router-link class="fang-xin swiper-slide" v-for="fy in fangy" tag="div" :to="'/Housesay/'+ fy.id+'/'+fy.type" >
                <div class="f-pic">
                  <img :src="fy.mainImg" alt="">
                  <div class="jiage">
                    {{fy.price}}<span>万</span>
                  </div>
                </div>
                <div class="f-mall-tit clear">
                  <p>{{fy.subTitle}}</p>
                  <p>{{fy.address}}</p>
                </div>
                <div class="f-shi">
                  {{fy.layout}}{{fy.averagePrice}}／㎡
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="bian"></div>
        <div class="kongbai"></div>
      </nav>
    </div>
</template>

<script>
import {getCookie} from '../util/cookie'
export default {
  name: 'my',
  data () {
    return {
      elsemen: getCookie('ifuser'),
      houseobj: {},
      fangy: {},
      myfun01: true,
      myfun02: true,
      myfun03: true,
      myfun04: true,
      myfun05: true,
      myfun06: true,
      myfun07: true,
      myfun08: true
    }
  },
  mounted () {
    this.myhouse()
    this.fangyuan()
  },
  methods: {
    myhouse () {
      var elsemen = getCookie('ifuser')
      if(elsemen==1){
        this.myfun01 = true
        this.myfun02 = true
        this.myfun03 = true
        this.myfun04 = true
        this.myfun05 = true
        this.myfun06 = true
        this.myfun07 = true
        this.myfun08 = true
      }else if(elsemen==0){
        this.myfun01 = false
        this.myfun02 = false
        this.myfun03 = true
        this.myfun04 = true
        this.myfun05 = true
        this.myfun06 = true
        this.myfun07 = true
        this.myfun08 = false
      }
      console.log(elsemen)
      var infos = {
        id: getCookie('userId')
      }
      this.$http.post(myHost + 'myh_web/selectUser',infos).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        this.houseobj = data
        // console.log(data)
      })
    },
    fangyuan () {
      var info = {
        type : null,
        pageNum : 1,
        pageSize : 10
      }
      this.$http.post (myHost + 'myh_web/recommendHouses',info).then ((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.fangy = data
        console.log(data)
        var swiper = new Swiper('.swiper-container', {
          // autoplay:true,
          // loop: true,
          slidesPerView: 'auto',
          loopedSlides: 10,
          freeMode: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          observer:true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
        });
      })
    },
  }
};
</script>

<style scoped>
  .my-header .head-pic{
    position: relative;
  }
  .my-header .head-pic img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .my-content .n-fang .fang-right{
    width: 100%;
    float: none;
  }
  .my-content .n-fang .fang-right .f-tao .fang-xin{
    margin: 0.16666rem;
  }
  .my-content .n-fang .fang-right .f-tao .fang-xin .f-mall-tit p:nth-child(2){
    width: 3.5rem;
  }
</style>
