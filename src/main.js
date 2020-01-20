// 入口文件
import Vue from 'vue';

import app from './App.vue';

// 导入vue-router包
import VueRouter from 'vue-router'
// 手动安装VueRouter
Vue.use(VueRouter)

// 导入vue-router
import VueResource from 'vue-resource'
Vue.use(VueResource)

import router from './router.js'

import { Header,Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入mui的样式表，好导入bootstrap一样
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';




var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router: router //挂载路由对象到vm实例上
});