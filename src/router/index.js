import Vue from 'vue'
import Router from 'vue-router'
import indexItem from '@/components/index-item'
import itemdetail from '@/components/itemdetail'
import order from '@/components/order'
import payout from '@/components/payout'
import alipay from '@/components/alipay'
import myinfo from '@/components/myinfo'
import myorder from '@/components/myinfo-order'
import myaddress from '@/components/myinfo-address'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: indexItem
    },
    {
      path: '/item',
      name: 'item',
      component: itemdetail
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/payout',
      name: 'payout',
      component: payout
    },
    {
      path: '/alipay',
      name: 'alipay',
      component: alipay
    },
    {
      path: '/myinfo',
      component: myinfo,
      children: [
        {
          path: '',
          name: 'myorder',
          component: myorder
        },
        {
          path: '/myaddress',
          name: 'myaddress',
          component: myaddress
        }
      ]
    }
  ]
})
