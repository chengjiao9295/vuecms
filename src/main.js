// 入口文件
import Vue from 'vue';

import app from './App.vue';

// 导入vue-router包
import VueRouter from 'vue-router'
// 手动安装VueRouter
Vue.use(VueRouter)

// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刚进入网站，肯定会调用main.js， 在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car'));
var store = new Vuex.Store({
    state: {// this.$store.state.***
        car : car || [] //将购物车中的商品的数据，用一个数组存储起来，在car数组中，存储一些商品的对象，
        // 咱们可以暂时将这个商品对象，设计成这个样子
        // {id: "商品的id", count: "要购买的数量", price: "商品的单价", selected: false}
    },
    mutations: {// this.$store.commit("方法的名称", "按需传递唯一的参数")
        addToCar(state, goodsinfo){
            // 点击加入购物车，把商品信息，保存到store中的car上
            // 分析：
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
            // 2. 如果没有，则直接把商品数据push 到car中即可

            // 假设 在购物车中，没有找到对应的商品
            var flag = false;
            state.car.some(item=> {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            });

            // 如果最终，循环完毕，要得到的flag依旧为false，说明为找到对应的商品，则push新的商品
            if(!flag){
                state.car.push(goodsinfo);
            }

            // 当更新car之后，把car数据存储到本地的localStorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsinfo(state, goodsinfo){
            // 修改购物车商品的数量
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count);
                    return true;

                }
            });
            // 当修改完商品的数量，把最新的购物车数据保存到本地
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id){
            state.car.some(item=>{
                if(item.id == id){
                    state.car.splice(i, 1);
                    return true;

                }
            });
            // 当删除完毕后的商品的数量，把最新的购物车数据保存到本地
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info){
            state.car.some(item=>{
                if(item.id == id){

                item.selected = info.selected;

                }
            });
            // 把最新的所有购物车商品的状态保存到store中去
            localStorage.setItem('car', JSON.stringify(state.car))

        }
    },
    getters: {// this.$store.getters.***
        // 相当于计算属性，也相当于filters
        getAllCount(state){
            var c = 0;
            state.car.forEach(item=>{
                c += item.count; 
            });
            return c;

        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id] = item.count
            });
            return o;
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id] = item.selected;
            })
            return o;
        },
        getGoodsCountAndAmount(state){
            var o = {
                count: 0, //勾选的数量
                amount: 0 // 勾选的总价
            };
            state.car.forEach(item=>{
                if(item.selected){
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            });
        }
    }
})



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
    router: router, //挂载路由对象到vm实例上
    store// 挂载store
});