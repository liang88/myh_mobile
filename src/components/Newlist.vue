<template>
    <div id="newlist">
      <nav class="clear">
        <div class="banner">
          <a href="###"><img src="../assets/images/fangxun/banner.jpg" alt=""></a>
        </div>
        <div class="tuijian">
          <div class="tj-middle">
            <p>推荐</p>
          </div>
        </div>
        <router-link class="tuijian-x" v-for="hot in newsdata"  tag="a" :to="'/Newsay/'+ hot.id" >
          <div class="tj-x-dan" >
            <div class="tj-x-dan-middle clear">
              <div class="tj-tu">
                <img :src="hot.imgUrl" alt="">
              </div>
              <div class="tj-zi" >
                <p>{{hot.floorTitle}}</p>
                <p>{{hot.floorPreview}}</p>
                <div class="tj-zi-zuo">
                  <p>作者：{{hot.floorWriter}}</p>
                </div>
              </div>
            </div>
          </div>
        </router-link>
        <!-- <div class="fangxun-mail">
          <p>打开资讯，看更多精彩推荐>> </p>
        </div> -->

      </nav>

    </div>
</template>

<script>
export default {
  name: 'newlist',
  data () {
    return {
      newsdata: {}
    }
  },
  mounted () {
    this.newhot()
  },
  methods: {
    newhot () {
      var newinfos = {
        'pageNum': 1,
        'pageSize':10
      }
      this.$http.post(myHost+ 'myh_web/selectMyhFloor', newinfos).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        data = data.list
        this.newsdata = data
        // console.log(that.newsdata)
      })
    }
  }
}
</script>

<style scoped>
@import "../assets/css/fangxun.css";
</style>
