import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '../components/Login'
import Loginmiddleman from '../components/Loginmiddleman'
import Register from '../components/Register'
import Housesay from '../components/Housesay'
import Newlist from '../components/Newlist'
import Newsay from '../components/Newsay'
import Newhouse from '../components/Newhouse'
import Top from '../components/Top'
import Counter from '../components/Counter'
import Houseban from '../components/Houseban'
import Search from '../components/Search'
import Housearch from '../components/Housearch'
import Middlemanall from '../components/Middlemanall'
import Middleman from '../components/Middleman'
import Forget from '../components/Forget'
import My from '../components/My'
import Set from '../components/Set'
import Information from '../components/Information'
import Record from '../components/Record'
import Administrator from '../components/Administrator'
import Mymiddleman from '../components/Mymiddleman'
import Feedback from '../components/Feedback'
import Apply from '../components/Apply'
import Mycomment from  '../components/Mycomment'
import Slide from '../components/Slide'
import Slidetwo from '../components/Slidetwo'
import Informationupload from '../components/Informationupload'
import Informationname from '../components/Informationname'
import Informationpassword from '../components/Informationpassword'
import Collectionhouse from '../components/Collectionhouse'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Housesay/:id/:pid',
      name: 'Housesay',
      component: Housesay
    },
    {
      path: '/Housesay/:id',
      name: 'Housesay',
      component: Housesay
    },
    {
      path: '/Houseban/:id',
      name: 'Houseban',
      component: Houseban
    },
    {
      path: '/Housearch/:id/:pid',
      name: 'Housearch',
      component: Housearch
    },
    {
      path: '/Housearch/:id',
      name: 'Housearch',
      component: Housearch
    },
    {
      path: '/Newlist',
      name: 'Newlist',
      component: Newlist
    },
    {
      path: '/Newsay/:id',
      name: 'Newsay',
      component: Newsay
    },
    {
      path: '/Newhouse',
      name: 'Newhouse',
      component: Newhouse
    },
    {
      path: '/Top',
      name: 'Top',
      component: Top
    },
    {
      path: '/Counter',
      name: 'Counter',
      component: Counter
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Middlemanall',
      name: 'Middlemanall',
      component: Middlemanall
    },
    {
      path: '/Middleman/:id',
      name: 'Middleman',
      component: Middleman
    },
    {
      path: '/Forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/My',
      name: 'My',
      component: My
    },
    {
      path: '/Set',
      name: 'Set',
      component: Set
    },
    {
      path: '/Information',
      name: 'Information',
      component: Information
    },
    {
      path: '/Record',
      name: 'Record',
      component: Record
    },
    {
      path: '/Administrator',
      name: 'Administrator',
      component: Administrator
    },
    {
      path: '/Mymiddleman',
      name: 'Mymiddleman',
      component: Mymiddleman
    },
    {
      path: '/Feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/Apply',
      name: 'Apply',
      component: Apply
    },
    {
      path: '/Loginmiddleman',
      name: 'Loginmiddleman',
      component: Loginmiddleman
    },
    {
      path: '/Mycomment',
      name: 'Mycomment',
      component: Mycomment
    },
    {
      path: '/Slide',
      name: 'Slide',
      component: Slide
    },
    {
      path: '/Slidetwo',
      name: 'Slidetwo',
      component: Slidetwo
    },
    {
      path: '/Informationupload',
      name: 'Informationupload',
      component: Informationupload
    },
    {
      path: '/Informationname',
      name: 'Informationname',
      component: Informationname
    },
    {
      path: '/Informationpassword',
      name: 'Informationpassword',
      component: Informationpassword
    },
    {
      path: '/Collectionhouse',
      name: 'Collectionhouse',
      component: Collectionhouse
    }
  ],
  scrollBehavior: () => ({ y: 0 })
})
