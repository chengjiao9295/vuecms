<template>

    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media">
                <router-link to="/home/newsinfo">
                    <img class="mui-media-object mui-pull-left" src="../../lib/mui/images/shuijiao.jpg">
                    <div class="mui-media-body">
                        <h1>幸福</h1>
                        <p class='mui-ellipsis'><span>发表评论：2020年1月20日 17:56:30</span><span>点击：0次</span></p>
                    </div>
                </router-link>
            </li>
            
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newslist' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表评论：{{item.add_time | dateFormat}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default{
    data(){
        return {
            newslist:[] //新闻列表
        }
    },
    created() {
        this.getNewsList(); 
    },
    methods: {
        getNewsList(){//由于该请求url目前失效，故先注释掉
            this.$http.get('api/getnewslist').then(result=>{
                if(result.body.status ===0){
                    // 如果没有失败，应该把数据保存到data上
                    this.newslist = result.body.message;
                }else{
                    Toast("失败");
                }
            })
        }

    },
    
}
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                font-size: 14px;
            }

            .mui-ellipsis{
                font-size: 12px;
                color: #2266ff;
                display: flex;
                justify-content: space-between;

            }

        }
        
    }
</style>