<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="https://img10.360buyimg.com/n1/s450x450_jfs/t1/88690/35/10735/141036/5e22b34dEa6f8c9a9/cdb5a7d1dfbeca8d.jpg" alt="">
            <h1 class="title">华为荣耀20s华为荣耀20s华为荣耀20s华为荣耀20s</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥899</span>
                    <span class="old">￥999</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>

                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://img10.360buyimg.com/n1/s450x450_jfs/t1/88690/35/10735/141036/5e22b34dEa6f8c9a9/cdb5a7d1dfbeca8d.jpg" alt="">
            <h1 class="title">华为荣耀20s</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥899</span>
                    <span class="old">￥999</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>

                </p>
            </div>
        </div>
        <div class="goods-item">
            <img src="https://img10.360buyimg.com/n1/s450x450_jfs/t1/88690/35/10735/141036/5e22b34dEa6f8c9a9/cdb5a7d1dfbeca8d.jpg" alt="">
            <h1 class="title">华为荣耀20s</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥899</span>
                    <span class="old">￥999</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>

                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default{

}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width:100%
        }
        .title{
            font-size: 14px;
        }

        .info{
            background-color: #eee;
            p{
                margin:0;
                padding: 5px;
            }
            .price{
                .now{
                    color:red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style>