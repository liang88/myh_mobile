<template>
    <div id="middleman">
      <!-- 内容 -->
      <nav class="clear">
        <div class="tit">
          <div class="tit-middle clear">
            <div class="pic">
              <img :src="housedata.agentImg" alt="">
            </div>
            <div class="message">
              <p> {{housedata.name}} </p>
              <p>所属门店 : {{housedata.store}}</p>
              <p>{{housedata.project}}</p>
              <div class="message-tag">
                <span>{{housedata.tag}}</span>
              </div>
            </div>
            <div v-show="dengji==1" class="medal">
              <img src="../assets/images/jin.png" alt="">
            </div>
            <div v-show="dengji==2" class="medal">
              <img src="../assets/images/yin.png" alt="">
            </div>
            <div v-show="dengji==3" class="medal">
              <img src="../assets/images/tong.png" alt="">
            </div>
          </div>
        </div>
        <div class="number-t">
          <div class="number">
            <div>
              <p>{{housedata.dealCount}}</p>
              <p>历史成交量(套)</p>
            </div>
            <div>
              <p>{{housedata.watchTimes}}</p>
              <p>带看次数(次)</p>
            </div>
            <div>
              <p>{{housedata.score}}</p>
              <p>综合评价(分)</p>
            </div>
          </div>
        </div>
        <div class="kongbai"></div>
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
                  <img :src="pjan.headImg" alt="">
                </div>
              </div>
              <div class="pingjia-xing">
                <div class="name clear">
                  <p v-if="pjan.name == ''">{{pjan.mobile}}</p>
                  <p v-else>{{pjan.name}}</p>
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
      </nav>
    </div>
</template>

<script>
import {getCookie} from "../util/cookie"
export default {
  name: 'middleman',
  data () {
    return {
      dengji: '',
      housedata: {},
      pingjiadate: [],
      tishimessage: '',
      textcon: '',
      currentIndex: ''
    }
  },
  mounted () {
    this.uid()
    this.loadpingjia()
    this.agentId ()
  },
  methods: {
    // 点击记录联系客户
    agentId () {
      var postid = {
        userId: getCookie ('userId'),
        agentId: this.$route.params.id
      }
      this.$http.post(myHost + 'myh/saveCalledAgent',postid).then ((response) => {
        var data = data.resultBean
        var code = data.code
        if (code == '0') {
          console.log('ok')
        } else {
          console.log('no')
        }
      })
    },
    uid () {
      var typeinfo = {
        agentId: this.$route.params.id
      }
      this.$http.post(myHost+ 'myh_web/viewAgentDetail', typeinfo).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        this.housedata = data
        this.dengji = data.agentLevel
        console.log(this.housedata)
      })
    },
    loadpingjia(){
      var pj = {
        id: this.$route.params.id,
        page: {
          'pageNum': this.currentpage,
          'pageSize': this.pageSize
        }
      }
      this.$http.post(myHost+ 'myh_web/viewAgentComm', pj).then((response) => {
        // console.log(response)
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
        agentId: this.$route.params.id,
        'comment': this.textcon,
        score: this.currentStar,
        page:{
          'pageNum': this.currentpage,
          'pageSize': this.pageSize
        }
      }
      this.$http.post(myHost+ 'myh_web/insertAgentComm', userIds).then((response) => {
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
    }
  }
}
</script>

<style scoped>
@import "../assets/css/jingji.css";
.assmessage{
  display: block;
  overflow: hidden;
  width: 100%;
  padding: 30px 0px;
  text-align: center;
  font-size:20px;
  line-height: 40px;
  color: #000000;
}
.pjstar_this{
  display: inline-table;
}
.el-pagination{
  text-align: center;
}

</style>
