<template>
    <div id="my-comment">
      <div class="comment_title">
        <a @click="tabcomm(1)" :class="this.tabcons==1?'comment_a':''" href="javascript:return 0">一手房</a>
        <a @click="tabcomm(0)" :class="this.tabcons==0?'comment_a':''" href="javascript:return 0">楼盘</a>
        <a @click="tabcomm(2)" :class="this.tabcons==2?'comment_a':''" href="javascript:return 0">经纪人</a>
      </div>
      <nav v-if="this.tabcons==1">
        <div class="mycomment" v-for="mcs in datacomment">
          <div class="jieshao">
          <div class="js-dan">
              <div class="js-dan-middle">
                <div class="js-tu">
                  <img :src="mcs.mainImg">
                </div>
                <div class="js-zi">
                  <div class="d1">{{mcs.subTitle}}<p><span>{{mcs.averagePrice}}</span>元/㎡</p></div>
                  <div class="d2"><span class="hadress">地址：{{mcs.address}}</span><p><img src="../assets/images/fangxun/dianhua.png" alt="">400-1133-233</p></div>
                  <div class="d3">户型：{{mcs.layout}}</div>
                  <div class="d4">建筑面积：{{mcs.measure}}㎡</div>
                  <div class="d5">
                    <span v-for="mfan in mcs.myfeaures">{{mfan}}</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
          <div class="plcons"  v-for="mcpl in mcs.commList">
            <div class="plcons_lf">{{mcpl.hcCommentTime | timeFormat}}</div>
            <div class="plcons_rg">
              <p>{{mcpl.hcComment}}</p>
            </div>
          </div>
        </div>
      </nav>
      <nav v-if="this.tabcons==0">
        <div class="mycomment" v-for="mcs in datacomment">
          <div class="jieshao">
            <div class="js-dan">
              <div class="js-dan-middle">
                <div class="js-tu">
                  <img :src="mcs.mainImg">
                </div>
                <div class="js-zi">
                  <div class="d1">{{mcs.subTitle}}<p><span>{{mcs.averagePrice}}</span>元/㎡</p></div>
                  <div class="d2"><span class="hadress">地址：{{mcs.address}}</span><p><img src="../assets/images/fangxun/dianhua.png" alt="">400-1133-233</p></div>
                  <div class="d3">户型：{{mcs.layout}}</div>
                  <div class="d4">建筑面积：{{mcs.measure}}㎡</div>
                  <div class="d5">
                    <span v-for="mfan in mcs.myfeaures">{{mfan}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="plcons"  v-for="mcpl in mcs.commList">
            <div class="plcons_lf">{{mcpl.hcCommentTime | timeFormat}}</div>
            <div class="plcons_rg">
              <p>{{mcpl.hcComment}}</p>
            </div>
          </div>
        </div>
      </nav>
      <nav v-if="this.tabcons==2">
        <div class="wap"  v-for="pljingji in pinglundatabase1">
          <div class="list">
            <div class="list-middle clear">
              <div class="list-pic">
                <div class="list-pic-wap">
                  <img :src="pljingji.agentImg" alt="">
                </div>
              </div>
              <div class="list-tit">
                <p>{{pljingji.name}}</p>
                <p>手机号：{{pljingji.mobile}}</p>
                <p>最新更新时间： <span>{{pljingji.createTime}}</span></p>
                <p>北京 : <span> {{pljingji.detailArea}} </span></p>
              </div>
              <a :href="'tel:'+pljingji.mobile" class="list-tel" >
                <img src="../assets/images/tel.png" alt="">
              </a>
            </div>
            <div v-for="jingjicom in pljingji.commList" class="plcons">
              <div class="plcons_lf"> {{jingjicom.timeStr}}</div>
              <div class="plcons_rg">
                <p>{{jingjicom.comment}}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div v-show="messages" class="tabmessages">{{tabmessages}}</div>
    </div>
</template>

<script>
import {getCookie} from "../util/cookie";
export default {
  name: 'my-comment',
  data () {
    return {
      tabcons: 1,
      tabmessages: '',
      messages: false,
      datacomment: {},
      pinglundatabase1: {}
    }
  },
  mounted () {
    this.tabcomm(1)
  },
  methods: {
    tabcomm(e){
      this.tabcons = e
      if(this.tabcons==2){
        this.sctranclick()
        return
      }
      var cominfo = {
        userId: getCookie('userId'),
        houseType: this.tabcons,
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      console.log(cominfo)
      this.$http.post(myHost+'myh_web/viewAllMyComm', cominfo).then((response)=>{
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var codeye = data.code
        if(codeye==1){
          this.messages = true
          this.tabmessages= data.message
        }else if(codeye==0){
          this.messages = false
          data = data.object
          data = data.list
          for(var i=0;i<data.length;i++){
            data[i].myfeaures = data[i].feature.split(',')
          }
          this.datacomment = data
          // console.log(this.datacomment)
        }
      })
    },
    sctranclick(){
      var pltrans = {
        userId: getCookie('userId'),
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
      this.$http.post(myHost+'myh_web/viewMyCommOfAgent', pltrans).then((response)=> {
        console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.pinglundatabase1 = data
      })
    }
  }
};
</script>

<style scoped>
  @import "../assets/css/xinfang.css";
  @import "../assets/css/jingji-t.css";
  .comment_title{
    display: block;
    line-height: 40px;
    font-size: 14px;
    color: #000000;
    border-top: 1px solid #f5f5f5;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: center;
  }
  .comment_title a{
    display: inline-block;
    text-decoration: none;
    width: 32.3%;
    text-align: center;
    line-height: 40px;
    color: #666;
  }
  .comment_a{
    color: #66cc00;
    font-weight: bold;
    border-bottom: 2px solid #66cc00;
  }
  .plcons{
    display: block;
    clear: both;
    overflow: hidden;
    padding:10px 10px;
    border-bottom: 1px dotted #f5f5f5;
  }
  .plcons_lf{
    display: block;
    float: left;
    width: 30%;
  }
  .plcons_rg{
    display: block;
    float: left;
    width: 70%;
  }
  nav .list{
    height: auto;
  }
  nav .wap .list .list-middle .list-pic .list-pic-wap img{
    max-height: 100px;
  }
  .mycomment{
    display: block;
    width: 100%;
    overflow: hidden;
  }
</style>
