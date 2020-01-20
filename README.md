# 这是一个vue实践项目
# 简单demo

#### 制作首页组件
1. 完成Header 区域，使用的时mint-ui中的header组件
2. 制作底部的tabbar 区域，使用的时mui的Tabbar.html
   + 在制作购物车小图标的时候，操作会相对多一些;
   + 先把扩展图标的css样式（icons-extra.css），拷贝到项目中 
   + 拷贝扩展字体库ttf文件（mui-icons-extra.ttf）到项目中
   + 为购物车小图标，添加如下样式：mui-icon mui-icon-extra mui-icon-extra-cart
3. 要在中间区域放置一个router-view来展示路由匹配到的组件


## 改造tabbar为router-link

## 设置路由高亮

## 点击tabbar中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，如何获取呢，使用vue-resource
2. 使用vue-resource 的this.$http.get获取数据
3. 获取到的数据，要保存到data上
4. 使用v-for循环渲染每个item项

## 改造九宫格区域样式


## 改造新闻资讯 路由链接

## 新闻资讯页面制作
1. 绘制界面
2. 使用vue-resource 获取数据
3. 渲染真实数据