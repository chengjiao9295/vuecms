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

// 按需加载
// import { Header, Swipe, SwipeItem, Button,Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

// Vue.use(Lazyload);//使用按需加载那个加载图标显示不了，需要使用全部加载的方式

// 全部加载,
import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';

// 导入mui的样式表，好导入bootstrap一样
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

import VuePreview from 'vue-preview'
Vue.use(VuePreview);

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