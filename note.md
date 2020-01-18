#### 静态资源分类  
+ JS
+ CSS
+ IMAGES
+ 字体文件（fonts）
+ 模板文件  
  
  .vue(这是webpack中定义组件的方式，推荐) .ejs .jade
#### 网页中引入的静态资源多了以后会有什么问题  
+ 网页加载速度慢， 需要发起多次二次请求
+ 要处理错综复杂的依赖关系

#### 解决上述问题  
+ 合并， 压缩， 精灵图（雪碧图）、图片的base64编码
+ 可以使用requireJS,也可以使用webpack解决各个包之间复杂的依赖关系  

#### 什么是webpack
+ webpack是前端项目的构建工具，它基于node.js的前端工具  

#### 如何完美实现上述的解决方案
+ 使用GULP， 基于task任务，适合小项目
+ 使用webpack， 基于整个项目进行构建
+ 借助于webpack前端自动化构建工具，可以实现资源的合并，打包，压缩，混淆等诸多功能

#### webpack安装方式
+ 运行npm i webpack -g 全局安装，可以使用全局使用webpack命令

#### 新版用法：
+ bug1   
> ERROR in multi ./src/main.js ./dist/bundle.js
Module not found: Error: Can't resolve './dist/bundle.js' in 'D:\vsproject\webpack'
 @ multi ./src/main.js ./dist/bundle.js main[1]

> 解决方法：webpack ./src/main.js -o ./dist/bundle.js





