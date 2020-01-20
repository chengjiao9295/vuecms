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

// 设置请求的根路径
Vue.http.options.root = 'http://vue.studyit.io/';
// 设置post时候表单数据的格式组织形式application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;
import router from './router.js'

import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

// 导入mui的样式表，好导入bootstrap一样
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

// 导入时间插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
})


var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router: router //挂载路由对象到vm实例上
});