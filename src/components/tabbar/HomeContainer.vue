<template>
    <div>
        <!-- <h1>HomeContainer</h1> -->
        <mt-swipe :auto="2000">
            <mt-swipe-item>
                <img src="https://img10.360buyimg.com/n1/s450x450_jfs/t1/88690/35/10735/141036/5e22b34dEa6f8c9a9/cdb5a7d1dfbeca8d.jpg" alt="" class="src">
            </mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>

        <!-- 轮播图区域 -->
       <!-- <swiper :lunbotuList="lunbotuList" :isfull="true"></swipter> -->
        
       <!-- 或 -->
       
       <!-- <mt-swipe :auto="2000">
           //在组件中，使用v-for循环的话，一定要使用key 
            <mt-swipe-item v-for="item in lunboList" :key="item.url">
                <img :src="item.img" alt="">
            </mt-swipe-item>
            
        </mt-swipe> -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <span class="mui-icon mui-icon-home"></span>
                    <!-- <img src="" alt=""> 这里可以使用img引入图片的方式替换背景--> 
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul> 
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'
export default{
    data(){
        return {
            lunboList: [] //保存轮播图数组
        };
    },
    created(){
        //this.getLunbotu();
    },
    methods:{
        getLunbotu(){
            this.$http.get('api/getlunbo').then(result=>{
                console.log(result.body);
                if(result.body.status === 0){
                    this.lunboList = result.body.message;
                }else{
                    //获取失败
                    Toast("加载轮播图失败");
                }
            })
        }
    },
    components:{
        swiper
    },
 
}
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item {
            &:nth-child(1){
                background-color: red;
            }
            &:nth-child(2){
                background-color: blueviolet;
            }
            &:nth-child(3){
                background-color: cadetblue
            }
            img{
                width: 100%;
                height: 100%;
            }
        }   
    }

    .mui-grid-view.mui-grid-9 {
        background-color: #ffffff;
        border: none
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
         border: 0;
         .mui-media-body{
            font-size: 13px;
         }
         img{
             width: 60px;
             height: 60px;
         }
    }
    
</style>