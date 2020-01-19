// 入口文件
import Vue from 'vue';

import app from './App.vue';


import { Header } from 'mint-ui';
// 导入mui的样式表，好导入bootstrap一样
import './lib/mui/css/mui.min.css'

Vue.component(Header.name, Header);


var vm = new Vue({
    el: "#app",
    render: c => c(app)
});