import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/page/NotFound'
import Login from '@/components/page/Login'
import Idiom from '@/components/page/Idiom'
import NoIdiom from '@/components/page/NoIdiom'
import wrongWord from '@/components/page/wrongWord'
import NowrongWord from '@/components/page/NoWrongword'
import pinyin from '@/components/page/pinyin'
import allstar from '@/components/page/allstar'
import Noallstar from '@/components/page/NoStar'
import Manager from '@/components/page/Manager'
import Order from '@/components/page/Order'
import RefillCard from '@/components/page/RefillCard'
import Money from '@/components/page/Money'
import User from '@/components/page/User'
import Main from '@/components/common/Main'
import Nopinyin from '@/components/page/Nopinyin'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/main',
      component: Main,
      children:[
        {
          path: '/',
          component: Idiom
        },
        {
          path: '/idiom',
          component: Idiom
        },
        {
          path: '/Noidiom',
          component: NoIdiom
        },
        {
          path: '/pinyin',
          component: pinyin
        },
        {
          path: '/pinyin_Nomean',
          component: Nopinyin
        },
        {
          path: '/wrongword',
          component: wrongWord
        },
        {
          path: '/wrongWord_Nomean',
          component: NowrongWord
        },
        {
          path: '/allstar',
          component: allstar
        },
        {
          path: '/allstar_Nomean',
          component: Noallstar
        },
        {
          path: '/manager',
          component: Manager
        },
        {
          path: '/order',
          component: Order
        },
        {
          path: '/refillCard',
          component: RefillCard
        },
        {
          path: '/money',
          component: Money
        },
        {
          path: '/user',
          component: User
        },
      ]
    },
  ]
})
