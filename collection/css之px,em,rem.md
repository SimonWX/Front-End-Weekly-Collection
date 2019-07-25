## CSS：如何使用px、em、rem？
### 一、3种单位详解
  1. px （像素Pixel）：相对长度单位，像素是相对于显示器屏幕分辨率而言的。
      * 利用px设置字体大小及元素宽高等比较稳定和精确。
      * Px的缺点是其不能适应浏览器缩放时产生的变化，因此一般不用于响应式网站。
  2. em：相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体 尺寸未被人为设置，则相对于浏览器的默认字体尺寸（一般为16px）。
      * 2.1、浏览器默认16px

        ![Image text](https://img-blog.csdnimg.cn/20190122205906321.png)
  
        如图，h1字体大小设置为1.5em，最终字体大小为1.5*16px(一般浏览器默认字体尺寸)=24px，可在computed中查看最终字体大小。
      * 2.2、font-size继承特性
        
        使用em可以较好的相应设备屏幕尺寸的变化，但是在进行元素设置时需要知道父元素文本的font-size及当前对象内文本的font-size，如有遗漏可能会导致错误。

        ![Image text](https://img-blog.csdnimg.cn/20190122210049399.png)
        
        如图，若父元素div设置font-size为20px，子元素h1最终字体大小为`1.2*16*1.5 = 30px`。这种情况h1的字体大小计算不仅要考虑自身的大小，还要继承父元素的字体大小，父元素还可能继承其父元素大小等等，em为单位的元素字体大小可能会受到其任何父元素的字体大小影响，计算复杂。

      * 2.3、margin和padding
        
        em除了可以用来指定font-size，还可以用来设置margin和padding大小。
        
        ```
        h1{font-size:20px;padding:1em}
        p{font-size:10px;margin:2em}
        ```

        ![Image text](https://img-blog.csdnimg.cn/20190122210230764.png)
        ![Image text](https://img-blog.csdnimg.cn/2019012221024286.png)

        h1的padding为`1*20px = 20px`。p的margin按道理应为`2*10px = 20px`，但实际为`2*12px = 24px`，原因是示例采用的chrome浏览器，默认最小字体为12px.

  3. rem（root rem）
      * rem是CSS3新增的一个相对单位（root em，根em）。与em的区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。

      * rem的产生是为了帮助人们解决em所带来的计算问题。通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。

      * 目前，除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。这些浏览器会忽略用rem设定的字体大小。如下：`p {font-size:14px; font-size:.875rem;}`

      * 以rem为单位的字体大小或padding\margin等大小只与HTML根元素大小有关，与元素本身字体大小无关。
      
        ![Image text](https://img-blog.csdnimg.cn/20190122210509877.png)
      
        如图，h1的padding以rem为单位，HTML根元素大小为16px，则h1的padding为`1*16 = 16px`。


### 二、应用场景
  1. 通用原则
      * px：必须使用固定值防止被缩放的元素，若被缩放，结构会被打碎。
      * em：优点在于组件模块化，缺点在于计算复杂。
      * rem：优点在于可以做到避免字体大小逐层复合的连锁反应，缺点在于使组件缺少模块化；使用rem的主要目的是确保无论用户如何设置自己的浏览器字体大小，布局都能调整到合适大小。
      * 注意：在创建布局时，采用px为单位更加方便，而部署时应该用rem单位；多列布局时，列宽可使用%。
  2. em与rem
      * em和rem都各有优缺点，综合使用它们以帮助我们更简单的建立模块化组件，实现自适应布局。
      * 如果属性值根据元素的font-size获得，则使用em，如padding\margin\line-height\width\height等值（使字体大小变化时元素周围的间距会等比例缩放）
      * 其他一切单位使用rem

--------------------- 
reference from：https://blog.csdn.net/waiting677/article/details/86601364 