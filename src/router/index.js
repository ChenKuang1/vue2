import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Add from '@/views/Add'
import Article from '@/views/Article'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'add',
        name: 'add',
        component: Add
      },
      {
        path: 'article',
        name: 'article',
        component: Article
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  // mode:'history',
  routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    next()
  }
  var token = window.sessionStorage.getItem('token')
  console.log(token)
  if(!token || token == '' || token == null || token == undefined){
    next('/login')
  }
  next()
})


export default router
