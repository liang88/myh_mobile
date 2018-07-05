<template>
    <div id="footers">
      <!-- 底部导航 -->
      <footer v-show="footer">
        <div class="f-top">
          满易何房产
        </div>
        <div class="xiangmu">
          <p>项目介绍</p>
          <ul>
            <li v-for="ftobj in ftobject">
              <router-link tag="a" :to="'/Housesay/'+ftobj.id">{{ftobj.title}}</router-link>
            </li>
          </ul>
        </div>
        <div class="shangbiao">
          <p>版权所有@2018北京满易何房地产经纪有限公司　京ICP备18008272号-1</p>
        </div>
      </footer>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'footers',
  data () {
    return {
      ftobject: [
        {
          id: 1,
          title: '御道庄园'
        },
        {
          id: 15,
          title: '荣盛阿尔卡迪亚'
        },
        {
          id: 28,
          title: '兴隆融创城'
        },
        {
          id: 18,
          title: '兴隆碧桂园'
        }
      ]
    }
  },
  computed:mapGetters([
    'footer'
  ]),
  mounted () {
    this.loadfooter()
  },
  methods: {
    loadfooter () {
      var footname = this.$route.name
      this.$store.dispatch('footername', footname)
    }
  },
  watch: {
    $route (r) {
      var footname = r.name
      this.$store.dispatch('footername', footname)
    }
  }
}
</script>

<style scoped>
#footers{
  display: none;
}
</style>
