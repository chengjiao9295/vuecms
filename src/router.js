import Vue from 'vue'

// 导入vue-router包
import VueRouter from 'vue-router'
// 手动安装VueRouter
Vue.use(VueRouter)

// 导入自定义组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopContainer from './components/tabbar/ShopCarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

// 创建路由对象
var router = new VueRouter({
    routes: [//配置路由规则
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/member', component: MemberContainer},
        {path: '/shopcar', component: ShopContainer},
        {path: '/search', component: SearchContainer}

    ],
    linkActiveClass: 'mui-active'// 覆盖默认的路由高亮的类，默认的类叫做router-link-active
});

export default router