<template>
    <div id="newsay">
      <nav class="clear">
      <div class="banner">
        <img src="../assets/images/fangxun/fx-xiangqing.jpg" alt="">
      </div>
      <p class="tit">{{newsays.floorTitle}}</p>
      <div class="zuozhe clear">
        <p>
          <span>日期 : {{newsays.floorDate|timeFormat}}</span>
          <span>作者 : {{newsays.floorWriter}}</span>
          <span>类型 : {{newsays.floorType}}</span>
        </p>
      </div>
      <div  class="xq-nav" v-html="newsays.content"></div>
      <p class="shengming">此信息系转载自其他媒体，版权归属于原作者，满易何转载此文出于传递更多信息之目的，并不意味着赞同其观点或证实其描述。文章内容仅供参考。如本网站转载的作品涉及版权问题，请原作者持相应版权证明与本网站联系。</p>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'newsay',
  data () {
    return {
      newsays: []
    }
  },
  mounted () {
    this.newsay()
  },
  methods: {
    newsay () {
      var newinfo = {
        floorId: this.$route.params.id
      }
      this.$http.post(myHost+ 'myh_web/viewFloorDetail', newinfo).then((response) => {
        var data = response.data
        data = data.resultBean
        data = data.object
        var typename = data.floorType
        if(typename == 1){
          data.floorType = '推荐'
        }else if(typename == 2){
          data.floorType = '热门'
        }
        this.newsays = data
      })
    }
  }
};
</script>

<style scoped>
  @import "../assets/css/fx-xiangqing.css";
  .xq-nav{
    padding: 20px 0px;
  }
  .zuozhe{
    text-align: center
  }
  .shengming{
    font-size: 12px;
    color: #666;
    width: 90%;
    margin: 0 auto;
    text-align: left;
    line-height: 16px;
    padding: 20px 0;
    border-top: 1px solid #eee;
  }
</style>
