<template>
    <div class="goods-container">
        <!-- 小球 -->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!-- 商品轮播图区域 -->                      
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                        <mt-swipe :auto="2000">
                            <mt-swipe-item>
                                <img src="https://img10.360buyimg.com/n1/s450x450_jfs/t1/88690/35/10735/141036/5e22b34dEa6f8c9a9/cdb5a7d1dfbeca8d.jpg" alt="" class="src">
                            </mt-swipe-item>
                            <mt-swipe-item>
                                <img src="https://img10.360buyimg.com/n1/s450x450_jfs/t1/88690/35/10735/141036/5e22b34dEa6f8c9a9/cdb5a7d1dfbeca8d.jpg" alt="" class="src">
                            </mt-swipe-item>
                            <mt-swipe-item>
                                <img src="https://img10.360buyimg.com/n1/s450x450_jfs/t1/88690/35/10735/141036/5e22b34dEa6f8c9a9/cdb5a7d1dfbeca8d.jpg" alt="" class="src">
                            </mt-swipe-item>
                        </mt-swipe>
                    <!-- <swiper :lunbotuList="lunbotu" :isfull="false"></swiper> -->
                </div>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品的名称标题</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥2399</del>&nbsp;&nbsp;销售价：<span class="now_price">￥2199</span>

                    </p>
                  
                        <p>购买数量：<numbox @getcount="getSelectedCount"
                            :max="goodsinfo.stock_quantity"></numbox></p>
                                
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
                        <!-- 分析：如何实现加入购物车的时候，拿到选择的数量 -->
                        <!-- 1. 经过分析发现，按钮属于goodsinfo页面，数字属于numberbox组件 -->
                        <!-- 2. 由于涉及到了父子组件的嵌套了，所以无法直接在goodsinfo页面中获取到选中的商品数量值 -->
                        <!-- 3. 怎么解决这个问题，涉及到了子组件向父组件传值了（事件调用机制） -->
                        <!-- 4. 事件调用的本质：父向子传递方法，子调用这个方法，同时把数据作为参数传递给这个方法 -->
                    </p>
                </div>
            </div>
            
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：</p>
                    <P>库存情况：</P>
                    <p>上架时间：</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default{
    data(){
        return {
            id: this.$route.params.id, // 将路由参数对象中的id挂载到data，方便后期调用
            lunbotu: [], //轮播图的数据
            goodsinfo: {}, //获取到的商品信息
            ballFlag: false, // 控制小球隐藏和显示标识符
            selectedCount:1, // 保存用户选中的商品数量，默认 认为用户买1个
        }
    },
    created(){
        //this.getLunbotu();
        // this.getGoodsInfo();
    },
    methods:{
        getLunbotu(){
            this.$http.get('api/getthumimages/' + this.id).then(result=>{
                if(result.body.status === 0){
                    // 先循环轮播图数组的每一项，为item添加img属性，
                    // 因为轮播图组件中，只认识item.img, 不认识item.src
                    result.body.message.forEach(item=>{
                        item.img = item.src;
                    });
                    this.lunbotu = result.body.message;
                }
            })
        },
        getGoodsInfo(){
            //获取商品信息
            this.$http.get("api/goods/getinfo/" + this.id).then(result=>{
                if(result.body.status === 0){
                    this.goodsinfo = result.body.message[0];
                }
            })
        },
        goDesc(id){
            // 点击使用编程式导跳转到图文介绍页面
            this.$router.push({name: "goodsdesc", params:{id}});
        },
        goComment(id){
            // 点击跳转到评论页面
            this.$router.push({name: "goodscomment", params:{id}});

        },
        addToShopCar(){
            this.ballFlag = !this.ballFlag;
            // {id: 商品的id, count: 要购买的数量, price: 商品的单价, selected: false}
            var goodsinfo = {
                id: this.id,
                count: this.selectedCount,
                price: this.goodsinfo.sell_price,
                selected: true
            };

            this.$store.commit("addToCar", goodsinfo);
        
        },
        beforeEnter(el){
           el.style.transform = "translate(0, 0)";
        },
        enter(el, done){
            el.offsetWidth;

            // 小球动画优化思路：
            // 1. 先分析导致动画不准确的本质原因：我们把小球最终位移到的位置 已经局限在了某一分辨率下的滚动条未滚动的情况下：
            // 2. 只要分辨率和测试的时候不一样， 或者滚动条有一定的滚动距离之后，问题就出现了
            // 3. 因此， 我们经过分析，得出结论：不能把位置的横纵坐标直接写死了，而是应该根据不同的情况，动态计算这个坐标值
            // 4. 经过分析，得出解题思路：先得到徽标的横纵坐标，再得到小球的横纵坐标，然后，让y值求差， x值也求差，得到的结果，
            // 就是横纵坐标要位移的距离
            // 5. 如何获取徽标和小球的位置？？ domObject.getBoundingClientRect()

            // 获取小球的在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取徽标在页面中的位置
            const badgePosition = document.getElementById("badge").getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;  
            
            el.style.transform =`translate(${xDist}px, ${yDist}px)` ;//"translate(89px, 421px)";
            el.style.transition = "all 2s cubic-bezier(.4, -0.3, 1, .68)";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count){
            // 当子组件把选中的数量传递给父组件的时候，把选中的值保存在data上
            this.selectedCount = count; 
            console.log("父组件拿到的数量值为："+ this.selectedCount);
        }


    },
    components:{
        swiper,
        numbox
    },
   
}
</script>

<style lang="scss" scoped>
.goods-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .purchase{
        display: flex;
        text-align: center;    
    }

    .mui-card-footer{
        display: block;
        button{
            margin:15px 0;
        }
    }

    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        left: 148px;
        top: 390px;
        z-index:99;
        /* transform: translate(89px, 421px); */
    }
     
}

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
</style>