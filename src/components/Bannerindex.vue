<template>
    <div id="banners">
      <mt-swipe :auto="3000" id="mtswipe">
        <mt-swipe-item v-for="hot in bannerdata"><router-link tag="a" :to="'/Houseban/'+ hot.id"><img :src="hot.imgUrl" /></router-link></mt-swipe-item>
      </mt-swipe>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
export default {
  name: 'banners',
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem
  },
  data () {
    return {
      bannerdata: {}
    }
  },
  mounted () {
    this.banner()
  },
  methods: {
    banner () {
      var that = this
      this.$http.post(myHost+ 'myh_web/bannerImg').then((response) => {
        console.log(response)
        var data = response.data
        data = data.resultBean
        data = data.object
        that.bannerdata = data
      })
    }
  }
}
</script>

<style scoped>
#mtswipe{
  height: 210px;
  width: 100%;
}
#mtswipe img{
  height: 210px;
  border: none;
  width: 100%;
}
</style>
