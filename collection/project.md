# *Interview Collection For Project*
## 1、如何搭建一个新项目 （vue）
### 第一步npm安装
1. 安装nodejs
2. 打开cmd命令行 通过node -v和npm -v 分别查看node和npm版本。如果不是最新的npm，请使用命令`npm install -g npm`
3. 使用淘宝镜像。 `npm install -g cnpm --registry=https://registry.npm.taobao.org`
### 第二步项目初始化
1. 安装vue-cli `npm install vue-cli -g`。通过`vue list`查看vue-cli是否安装成功
2. 选择路径，新建vue项目。 `vue init webpack 项目名`
3. 安装项目所需依赖。`cnpm install`
### 项目结构剖析
![img text](https://images2018.cnblogs.com/blog/1389839/201805/1389839-20180502113321132-349982802.png)

1. build: 构建脚本目录

    文件|作用
    ----|----
    build.js|生产环境构建脚本
    check-versions.js | 检查npm，nodejs版本
    utils.js | 构建相关工具方法
    vue-loader.conf.js|配置了css加载器以及编译css之后自动添加前缀
    webpack.base.conf.js|webpack基本配置
    webpack.dev.conf.js|webpack开发环境配置
    webpackk.prod.conf.js|webpack生产环境配置

2. config: 项目配置（监听端口，打包输出）

    文件|作用
    ----|----
    dev.env.js|开发环境变量
    index.js|项目配置文件
    prod.env.js|生产环境变量

3. node_modules：npm加载的项目依赖模块
4. src：这六十我们要开发的目录，基本上要做的事情都在这个目录里。里面包含了几个目录及文件：

    文件（夹）|作用
    ----|----
    assets|资源目录，放置一些图片或者公共js，公共css。这里的资源会被webpack构建
    components|组件目录，我们写的组件就放在这个目录里面
    router|前端路由，我们需要配置的路由路径写在index.js里面
    App.vue|根组件
    main.js|入口js文件

5. static：静态资源目录，如图片，字体等。不会被webpack构建
6. index.html： 首页入口文件，可以添加一些meta信息等。
7. package.json：npm包配置文件，定义了项目的npm脚本，依赖包等信息。
8. README.md：项目的说明文档，markdown格式
9. .xxxx文件：这些是一些配置文件，包括语法配置，git配置等。

## 2、vue项目webpack配置
1. 配置热更新&自动打开浏览器
    * 方法一：修改package.json文件

    ![Image text](https://img-blog.csdn.net/20181009101452933?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9tYWppYTAyOQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

    * 方法二：修改webpack.config.js文件

    ![Image text](https://img-blog.csdn.net/20181009101916490?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9tYWppYTAyOQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

    Ps: 用vue init一键生成项目，以上变量的配置位置在config/index.js中

    ![Image text](https://img-blog.csdn.net/20181009102251747?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9tYWppYTAyOQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

2. npm run build生成map文件配置
我们在做vue项目打包时候，打包完成的js文件夹中，会自动生成一些map文件，那么这些map文件有什么作用呢？这些文件是否需要保留呢？
    * map文件的作用：项目打包之后的文件都是经过压缩和加密的，如果运行的时候报错的话，输入的错误信息我们是无法准确得知是哪一行或者哪一个方法有错误的。而map文件的作用正在于此，他可以帮助浏览器准确的输入是具体的哪个位置的代码报错。
    * 去掉map文件的方法：在config/index.js中修改配置：productionSourceMap: false
    ![Image text](https://img-blog.csdn.net/20181009105822808?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9tYWppYTAyOQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## 3、webpack的核心概念包含以下几个：
* entry - webpack打包的入口，并非代码执行的入口
* output - webpack打包后生成的静态资源文件，它是最终会被html引用的文件
* loader - 对于非js的模块（或说文件），转化成webpack能够处理的js文件，对于还要进一步处理的js文件进行加工处理。
* plugins - 参与到整个webpack打包的过程，可与loader结合使用，提供相应/辅助的功能

*Entey：* entry可以是单个入口，也可以是多个入口。
* 单个入口的写法： `entry: 'a.js' 或['a.js','b.js']`
* 多个入口的写法：`entry: {a: 'a.js', b: 'b.js'}`


webpack会以你给的entry为入口，根据dependency graph，挨个打包。结合其他相应的设置，最终输出成页面要引用的静态资源文件。注意了，这里提到的'结合其他相应的设置'，很可能是不止一处的设置。

*Output：* output里面的选项主要有（但远不止这些）：
* `filename: '[name].[hash].bundle.js'` //[name]和entry里面的name对应
* `path: path.resolve(_dirname, 'dist')` //指最终打包生成的目录
* publicPath: 可以是'./dist/'或者'/'或者cdn地址 //指访问静态资源文件的路径
* `chunkFilename:'[name].chunk.js'` //指用webpack.ensure或import().then()动态加载的文件

*Loader：* loader就是把模块转换成webpack能够处理的js文件（如css， scss，vue等非js模块），或者对js模块本身进行再加工（如编译es6语法等）
loader的写法有好几种，loader一般放在module这个对象里的rules里面，现总结一下四种

```
module: {
  rules: [
    { //第一种, 需要用到的loader简单的放在use数组里
      test: /\.(sa|sc|c)ss$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    },
    {// 第二种，use里面是一个个对象，这种方式可以给loader进行配置
      test: /\.css$/,
      use: [
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({
                  browsers: ['iOS >= 7', 'Android >= 4.1']
                }),
              ]
            }
          }
      ]
    },
    {//第三种，单个loader和对象loader一起放在use数组里
      test: /\.(png|jpg|jpeg|gif)$/i
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          optiosn: {
            pngquant: {
              quality: '65-80'
            }
          }
        }
      ]
    },
    {//简单使用loader，不用use
      test: /\.vue$/,
      loader: 'vue-loader'
    }
  ]
}
```

总结一下loader的常用四种写法：

```
use: [xxx, xxx]
use: [{loader: XXX}, {loader: XXX}]
use: [{
    loader: XXX,
    options: {}
}, 'XXX']
loader: [XXX, XXX]
loader的options配置项里面还可以放置loader，also plugins
```

常用loader有：
* 处理样式的：style-loader，css-loader， postcss-loader，sass-loader，less-loader
* 处理es6的：babel-loader（要连同babel-core，babel-preset-env）一起用
* 处理图片的：file-loader，url-loader，image-webpack-loader

*Plugins:* 常用的plugins有
* 压缩js：uglifyjs-webpack-plugin
* 合并&压缩css：mini-css-extract-plugin，optimize-css-assets-webpack-plugin
* 清除目录：clean-webpack-plugin
* 生成html：html-webpack-plugin
* postcss相关的：postcss-plugin-px2rem，postcss-preset-env，postcss-sprites，autoprefixer
* webpack自带的方法：webpack.ProvidePlugin等

## 4、封装vue组件
想要封装好一个组件，一定要熟练掌握这三个技能。
 * 父组件-子组件传值（props）
 * 子组件-父组件传值（$emit）
 * 插槽（slot）
对于一个独立的组件来说，props是用来为组件内部注入核心的内容，$emit用来使这个独立的组件通过一些逻辑来融入其他组件中。

1. 数据从父组件传入。为了解耦，子组件本身就不能生成数据。即使生成了，也只能在组件内部运作，不能传递下去，下面是在一些较复杂的场景中，对props传递的参数加一些验证，也是方便如果是数据类型不符合可以直接抛出异常。

    ```
    props: {
      tableData: {
        type: Array,
        required: true // 必传
      },
      titleName: String,
      needNum: [String, Number], // 两个类型都可以传
      isEdit: {
        type: Boolean,
        default: false // 默认false
      }
    }
    ```

    props传入参数，不建议对它进行操作，如果要操作，请现在子组件深拷贝。如果你是用JSON.stringify，JSON.parse方法深拷贝需注意：JSON.parse(JSON.stringify(obj))我们一般用来深拷贝，其过程说白了，就是利用JSON.stringify将js对象序列化（JSON字符串），再使用JSON.parse来反序列化（还原）js对象。如果使用JSON.parse(JSON.stringify(obj))拷贝应注意以下几点：
    * 如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象。
    * 如果obj里有RegExp，Error对象，则序列化的结果将只得到空对象。
    * 如果obj里有函数，undefined，则序列化的结果会把函数或undefined丢失
    * JSON.stringify()只能序列化对象的可枚举的自有属性，例如如果obj中的对象是有构造函数生成的，则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor
    * 如果对象中存在循环引用的情况也无法正确实现深拷贝

2. 在父组件处理事件。比如某些子组件的click事件，避免高耦合，逻辑最好放在父组件中，子组件只是一个承载体。

    ```
    // 子组件 proflist
    changeSort(sortObj){
      this.$emit('sortChange', sortObj)
    }
    ```

    ```
    // 父组件
    <proflist @handleSortChange='sortChange'></proflist>
    ```

    这样既降低耦合。保证子组件中数据和逻辑不会混乱。

3. slot的应用。现在有一个需求，在同一个子组件中，我在不同的场景需要用到不同的按钮，那么在封装组件的时候就不用去写按钮，只用在合适的位置留一个slot，把按钮的位置留出来，然后在父组件中写入：

    ```
    // 子组件
    <div class = 'public_btn'>
      <slot name = 'button'></slot>
    </div>
    ```

    ```
    // 父组件
    <child>
      <button slot="button">按钮1</button>
    </child>
    ```
    这样一个具名插槽灵活地解决了不同场景同一组件不同配置的问题。

4. 统一管理各个组件公共样式

## 5、vue axios的简单封装及全局调用方式
* 安装axios `npm install axios --save`
* 新建一个js文件任意取名，这里是http.js

  ```
  import axios from 'axios'
  import { Message } from 'element-ui'; // element库消息提示
  
  // 创建axios实例
  var service = axios.create({
    baseURL: 'http://www.xx.com/v1/',
    timeout: 5000,
    headers: {
      'content-type': 'application/json',
      'token': '1f154sgff14a1341ho'
    }
  })
  exprot default {
    // get请求， 其他类型请求复制粘贴。修改method
    get(url, param){
      return new Promise((callback, reject)=>{
        service({
          method：'get',
          url,
          params: param,
        }).then(res => {
          // axios返回的是一个promise对象
          var res_code = res.status.toString();
          if(res_code.charAt(0) == 2){
            callback(res); /// callback在promise执行器内部
          }else{
            console.log(res, '异常1')
          }
        }).catch(err => {
          if(!err.response){
            console.log('请求错误')
            // Message是element库的组件，可以去掉
            Message({
              showClose: true,
              message: '请求错误',
              type: 'error'
            });
          }else{
            reject(err.response);
            console.log(err.response, '异常2')
          }
        })
      })
    }
  }
  ```

  main.js中引入这个文件，做全局使用。prototype属性是js用法，每一个构造函数都有一个属性叫做原型（prototype），默认情况下prototype属性会默认获得一个constructor（构造函数）属性

  ```
  // 这里是vue的主js入口文件
  import Vue from 'vue'
  import App from './App.vue'
  import http from './http.js' // axios实例化后引入http

  Vue.prototype.http = http // 放入全局
  new Vue({
    render: h => h(App)
  }).$mount('#app')
  ```

  组件中调用封装的axios方式：
  
  ```
  <script>
    // 生命周期函数
    mounted(){
      this.http.get('banner/1').then(res=>{
        console.log(res.data)
      })
    }
  </script>
  ```

## 6、vue--全局变量的几种实现方式
1. 全局变量专用模块。就是以一个特定模块来组织管理这些全局量，需要引用的地方导入该模块就好了。全局变量专用模块Global.vue
    
    ```
    <script>
      const colorList = [
        '#999999',
        '#666666',
        '#333333'
      ]
      const colorListLength = 20
      function getRandColor(){
        var tem = Math.round(Math.random()* colorListLength)
        return colorList[tem]
      }
      export default{
        colorList,
        colorListLength,
        getRandColor
      }
    </script>
    ```

    模块里的变量用出口暴露出去，当其他地方需要使用时，引入模块就行。
    
    ```
    // 在其他组件中使用它
    <script type="text/javascript">
      import global_ from 'components/tool/Global'
      export default {
        data (){
          return {
            getColor: global_.getRandColor,
          }
        }
      }
    </script>
    ```

2. 全局变量模块挂载到Vue.prototype里。
Global.js同上，在程序入口main.js里加入下面代码

    ```
    import global_ from './components/tool/Global'
    Vue.prototype.GLOBAL = global_
    ```

    挂载之后，在需要引用全局变量的模块处，不需再导入全局量模块，直接用这个就可以引用，如下：
    
    ```
    // 在其他组件中使用它
    <script>
      export default {
        data () {
          return{
            getColor: this.GLOBAL.getRandColor,
          }
        }
      }
    </script>
    ```

3. 使用vuex
vuex是一个专为vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组建的状态。因此可以存放着全局量。因为vuex有点繁琐，有点大材小用。

## 7、自定义组件上的v-model（add 2.2.0）
一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。model 选项可以用来避免这样的冲突：

```
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

现在在这个组件上使用 v-model 的时候：
`<base-checkbox v-model="lovingVue"></base-checkbox>`

这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当 <base-checkbox> 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的属性将会被更新。

*注意: 你仍然需要在组件的 props 选项里声明 checked 这个 prop。*

## 8、vue指令
1.vue中的指令有哪些？
* v-text，更新元素的textContent，如果要更新部分的textContent，需要使用{{Mustache}}插值
* v-html，更新元素的innerHTML。注意：内容按普通HTML插入-不会作为vue模板进行编译。如果试图使用v-html组合模板，可以重新考虑是否通过使用组件来替代。
* v-show
* v-if，当v-for和v-if一起使用，v-for的优先级比v-if更高
* v-else
* v-else-if
* v-for，基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 alias in expression ，为当前遍历的元素提供别名
* v-on，绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。用在普通元素上时，只能监听原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event` 属性：`v-on:click="handle('ok', $event)"`。
  * .stop - 调用 event.stopPropagation()。
  * .prevent - 调用 event.preventDefault()。
  * .capture - 添加事件侦听器时使用 capture 模式。
  * .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  * .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
  * .native - 监听组件根元素的原生事件。
  * .once - 只触发一次回调。
  * .left - (2.2.0) 只当点击鼠标左键时触发。
  * .right - (2.2.0) 只当点击鼠标右键时触发。
  * .middle - (2.2.0) 只当点击鼠标中键时触发。
  * .passive - (2.3.0) 以 { passive: true } 模式添加侦听器
* v-bind，动态地绑定一个或多个特性，或一个组件 prop 到表达式。在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象。
  * .prop - 被用于绑定 DOM 属性 (property)。(差别在哪里？)
  * .camel - (2.1.0+) 将 kebab-case 特性名转换为 camelCase. (从 2.1.0 开始支持)
  * .sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。
* v-model，在表单控件或者组件上创建双向绑定。限制：`<input>` `<select>` `<textarea>` `components`
  * .lazy - 取代 input 监听 change 事件
  * .number - 输入字符串转为有效的数字
  * .trim - 输入首尾空格过滤
* v-slot，可放置在函数参数位置的 JavaScript 表达式 (在支持的环境下可使用解构)。可选，即只需要在为插槽传入 prop 的时候使用。限用于：`<template>`，或组件 (对于一个单独的带 prop 的默认插槽)
* v-pre，跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
* v-cloak，这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。
* v-once，只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

## 9、自定义指令

## 项目中遇到的问题。
  * ie9，跨域的处理，拒绝访问
  * ie9及以下，input的placeholder不支持（已解决）
  * ie9及一下，input的后边的小叉号
  * ie9及一下，border-radius和filter互相冲突的问题（已解决）
  