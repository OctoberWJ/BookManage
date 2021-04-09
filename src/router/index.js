import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import bookstore from '@/pages/user/book_store'
import bookDetail from '@/pages/user/book_detail'
import readerInfo from '@/pages/user/reader_info'
import bookList from '@/pages/admin/book_list'

import userBase from '@/pages/user/user_base'
import adminBase from '@/pages/admin/admin_base'
import register from '@/pages/register'
import bookAdd from '@/pages/admin/book_add'
import nevigater from '@/pages/nevigater'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/user/bookstore',
      name: 'bookstore',
      component: bookstore
    },
    {
      path: '/user/bookDetail',
      name: 'bookDetail',
      component: bookDetail
    },
    {
      path: '/admin/bookList',
      name: 'bookList',
      component: bookList
    },
    {
      path: '/user/userBase',
      name: 'userBase',
      component: userBase
    },
    {
      path: '/user/readerInfo',
      name: 'readerInfo',
      component: readerInfo
    },
    {
      path: '/admin/adminBase',
      name: 'adminBase',
      component: adminBase
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/admin/bookAdd',
      name: 'bookAdd',
      component: bookAdd
    },
    {
      path: '/nevigater',
      name: 'nevigater',
      component: nevigater
    }
  ]
})
