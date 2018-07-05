<template>
    <div id="middleman">
      <!-- 内容 -->
      <nav class="clear">
        <div class="hunt">
          <div class="hunt-bg">
            <form action="" method="post">
              <input type="text" v-model="middsou"   placeholder="请输入关键字或经纪人姓名、电话">
            </form>
            <div @click="middsoutj">
              搜索
            </div>
          </div>
          <div class="middmessage">{{middmessage}}</div>
        </div>
        <div class="classify" v-show="false">
          <div @click="shows" class="fen">
            <p>区域</p>
          </div>
          <transition name="slide-fade">
            <div v-if="show1"  class="quyu clear">
              <a href="">北京</a>
              <a href="">河北</a>
            </div>
          </transition>
        </div>
        <div class="wap" v-show="middlemanshow">
          <div v-for="midd in middle" class="list">
            <div class="list-middle clear">
              <router-link class="list-pic" tag="div" to="/Middleman">
                <div class="list-pic-wap">
                  <img :src=" midd.agentImg " alt="">
                </div>
              </router-link>
              <router-link class="list-tit" tag="div" :to="'/Middleman/'+midd.id">
                <p>{{midd.name}}</p>
                <p>手机号 : <span>{{midd.mobile}}</span></p>
                <p>{{midd.area}} : <span> {{midd.project}} </span></p>
                <div class="spa">
                  <span v-for="mi in midd.tag">{{mi}}</span>
                </div>
                <img v-show="midd.agentLevel == 1" src="../assets/images/tong.png" alt="">
                <img v-show="midd.agentLevel == 2"  src="../assets/images/yin.png" alt="">
                <img v-show="midd.agentLevel == 3"  src="../assets/images/jin.png" alt="">
              </router-link>
              <a class="list-tel" :href="'tel:'+midd.mobile">
                <img src="../assets/images/tel.png" alt="">
              </a>
            </div>
          </div>
          <a href="javascript:;" @click="middlemore()"   class="gengd">
            更多推荐
          </a>
        </div>
        <div class="messages" v-show="errormiddle">{{errormessages}}</div>
        <div class="kongbai"></div>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'middleman',
  data () {
    return {
      middle: [],
      show1: false,
      show2: false,
      pagenumber: 10,
      curentpage: 1,
      middsou: '',
      middmessage: '',
      dengji: '',
      middlemanshow: true,
      errormessages: '',
      errormiddle: false
    }
  },
  mounted () {
    this.houseall()
  },
  methods: {
    shows () {
      this.show1 = !this.show1
    },
    showss () {
      this.show2 = !this.show2
    },
    db1 () {
      this.show2 = false
    },
    houseall () {
      var pages = {
        page: {
          pageNum: this.curentpage,
          pageSize: this.pagenumber
        }
      }
      this.$http.post(myHost+ 'myh_web/selectAgent', pages).then((response) => {
        //  console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.middle = data
      })
    },
    middlemore() {
      this.pagenumber = this.pagenumber + 10
      this.houseall()
    },
    middsoutj(){
      if(!this.middsou){
        this.middmessage = '请您输入要搜索的内容'
      }
      var soumidd = {
        'mobile': this.middsou,
        'page': {
          pageNum: this.curentpage,
          pageSize: this.pagenumber
        }
      }
      this.$http.post(myHost+ 'myh_web/selectLikeAgent', soumidd).then((response) => {
        var data = response.data
        data = data.resultBean
        var mecode = data.code
        if(mecode == '1'){
          this.errormiddle = true
          this.errormessages = data.message
          this.middlemanshow= false
        }else{
          this.errormiddle = false
          this.middlemanshow= true
          data = data.object
          data = data.list
          this.middle = data
        }

      })
    }
  }
}
</script>

<style scoped>
@import "../assets/css/jingji-t.css";
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateY(-15px);
  opacity: 0;
}
.middmessage{
  display: block;
  text-align: center;
  font-size:14px;
  padding: 10px 0px;
}
 .messages{
   display: block;
   text-align: center;
   font-size:14px;
   padding: 20px 0px;
 }
</style>
