## 常用的几种import和export方式

* import方式
  1. 引入第三方插件 `import echarts from 'echarts'`

  2. 引入工具类 
      * 引入单个方法
      ```
        import { axiosfetch } from './util'

        export function axiosfetch(options){

        }
      ``` 

      * 导入成组方法
      ```
        import * as tools from './libs/tools'
        // 其中tools.js中有多个export方法，把tools里所有export的方法导入
      ```


* 说到这 export 和 export default 又有什么区别呢？

