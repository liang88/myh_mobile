<template>
  <div id="slidetwo">
    <!-- 内容 -->
    <nav class="kanfang-content clear">
      <div class="kf-bg">
        <p>御道庄园   免费预约看房</p>
        <input type="text" placeholder="输入您的姓名" v-model="username" >
        <input type="text" placeholder="输入您的手机号" v-model="userphone" >
        <input type="button" value="提交" @click="open" >
        <p>{{usermessage}}</p>
      </div>
    </nav>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'slidetwo',
  data () {
    return {
      username: '',
      userphone: '',
      usermessage: ''
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    open() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!this.username) {
        this.usermessage = '亲 用户名不能为空！'
        this.clearRegMessage ()
        return
      }
      if (!this.userphone) {
        this.usermessage = '亲 手机号不能为空！'
        this.clearRegMessage ()
        return
      }
      if (!reg.test(this.userphone)){
        this.usermessage = '手机号码格式不正确!'
        this.clearRegMessage ()
        return
      }
      var userinfos = {
        'activityId': 1,
        'pName': this.username,
        'pMobile': this.userphone
      }
      this.$http.post(myHost+'myh_web/insertPartyInfo', userinfos).then((response)=>{
        var data = response.data
        data = data.resultBean
        var mycode = data.code
        console.log(mycode)
        if(mycode == '0'){
          MessageBox.alert('提交成功！我们会尽快联系您！').then(action => {
            this.usermessage = ''
            this.clearRegMessage ()
            this.username = ''
            this.userphone = ''
          });
        }else{
          this.usermessage = '提交失败，请重试'
          this.clearRegMessage ()
        }
      })
    },
    clearRegMessage () {
      var that = this
      setTimeout(function () {
        that.usermessage = ''
      }, 3000)
    }
  }
};
</script>

<style scoped>
  #app,#slidetwo{
    height: 100% !important;
  }
  .kanfang-content{
    background-image: url('../../static/images/yuyuekfy.jpg') !important;
  }
</style>
