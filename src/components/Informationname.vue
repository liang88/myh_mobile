<template>
    <div id="informationname">
      <nav class="clear">
        <form action="" method="post">
          <div class="zh clear">
            <p>昵&nbsp;&nbsp;&nbsp;&nbsp;称</p>
            <input type="text" v-model="myname" placeholder="请输入昵称">
          </div>
          <button class="but" type="button" @click="lgbtn()" value="submit" >确认修改</button>
          <div class="lgshow">{{lgshow}}</div>
        </form>
      </nav>
    </div>
</template>

<script>
import md5 from 'js-md5'
import {setCookie,getCookie} from '../util/cookie'
export default {
  name: 'informationname',
  data () {
    return {
      myname: '',
      lgshow: '',
      obj: {}
    }
  },
  mounted () {
  },
  methods: {
    lgbtn () {
      if (!this.myname) {
        this.lgshow = '修改不能为空'
        this.clearmessage ()
        return
      }
      var infos = {
        id: getCookie ('userId'),
        name: this. myname
      }
      this.$http.post(myHost+ 'myh_web/updateUser', infos).then((response) => {
        // console.log(response)
        var data = response.data
        data = data.resultBean
        var obj = data.object
        var code = data.code
        if (code == '0') {
          this.obj = this.myname
          this.lgshow = '修改成功'
          this.clearmessage ()
        } else {
          this.lgshow = data.message
          this.clearmessage ()
        }
      })
    },
    clearmessage () {
      var thats = this
      setTimeout(function () {
        thats.lgshow = ''
      }, 3000)
    }
  }
};
</script>
<style scoped>
@import "../assets/css/denglu.css";
  .lgshow{
    display: block;
    padding: 10px 0px;
    text-align: center;
    color: #ff0000;
    font-size: 0.4rem;
  }
  .qiehuan{
    float: left;
    margin: 0.54688rem 0;
    color: #66cc33;
    font-size: 0.375rem;
  }
</style>
