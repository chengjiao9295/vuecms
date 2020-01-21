<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
                        推荐
                    </a>
                    <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
                        热点
                    </a>
                    <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
                        北京
                    </a>
                    <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
                        社会
                    </a>
                    <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
                        娱乐
                    </a>
                    <a class="mui-control-item" href="#item6mobile" data-wid="tab-top-subpage-6.html">
                        科技
                    </a>
                    <!-- <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for = "item in cates" :key="item.id"
                        @tap = "getPhotoListByCateId(item.id)">
                           {{item.title}}
                    </a> -->
                </div>
            </div>
            <!-- 图片列表区域 -->
            <ul class="photo-list">
                <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo' + item.id" tag="li">
                    <img v-lazy="item.img_url">
                    <div class="info">
                        <h1 class="info-title">{{item.title}}</h1>
                        <div class="info-body">{{item.zhaiyao}}</div>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.js';

export default {
    data(){
        return {
            cates : [], //所有分类的列表数组
            list: [] //图片数组
        }
    },
    created(){
        this.getAllCategory();
        this.getPhotoListByCateId(0);
    },
    mounted(){//当组件中的dom结构被渲染好并放到页面中后，会执行这个钩子函数
        // 如果要操作元素了，最好再mouted里面，因为这里的dom元素是最新的
        // 初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getAllCategory(){
            this.$http.get('api/getimgcategory').then(result=>{
                if(result.body.status === 0){
                    // 手动拼接一个最完整的分类列表
                    result.body.message.unshift({title: "全部", id: 0});
                    this.cates = result.body.message;
                }
            })
        },
        getPhotoListByCateId(cateId){
            this.$http.get('api/getimage/' + cateId).then(result=>{
                if(result.body.status ===0){
                    this.list = result.body.message;
                }
            })
        }

    }

}
</script>

<style lang="scss" scoped>
*{
    /*touch-action 用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作（比如浏览器自带的滑动缩放等，
    它是谷歌为了提高浏览器滑动效果而衍生出来的东西） */
    /* pan-y 启用单指垂直平移手势，可以与pan-x, pan-left, pan-right,/, pinch-zoom组合使用 */
    /* pan-x 启用单指水平平移手势，可以与pan-y, pan-up, pan-down,/, pinch-zoom组合使用 */
    touch-action: pan-y; 
}
.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li {   
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
        }

        .info{
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0,0 ,0,0.4);
            max-height: 84px;
            .info-title{
                font-size: 14px;
            }
            .info-body{
                font-size: 13px;
            }
        }
    }
}


</style>