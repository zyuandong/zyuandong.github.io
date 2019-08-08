**input @change ，当输入变化时，并没有立即触发事件（执行方法），反而是失焦后执行方法**

更改为 @input 后，输入就触发

类似vue的mvvm框架都是数据与视图双向绑定的，而change事件往往用于视图改变的时候去操作数据，这在mvvm框架里面显得多此一举，框架本身已映射视图的变化到数据上，所以绝大部分的change事件监听都是不必要的，对应vue，可改写为methods方法或者computed计算属性。


**表单校验，针对number（integer，float）处理方式不同**

integer:

```
<el-input v-model.number="item" prop="item"></el-input>
rules：{
	item: {
		[type: 'integer', min: x, max: xx, ...]
	}
}

```

float:

v-model.number 不允许输入小数点，因此对于需要输入小数的情况，建议使用 pattern

参考：

[类型为 number 数字验证不通过的BUG](https://github.com/yiminghe/async-validator/issues/21)

[How to apply min/max attribute to v-model in Vue?](https://stackoverflow.com/questions/43285895/how-to-apply-min-max-attribute-to-v-model-in-vue)

[Vue学习笔记-ElmentUI表单校验](https://www.jianshu.com/p/a07c0efba5d0)

[Vue Element表单绑定（三）表单验证2](https://my.oschina.net/tianma3798/blog/3010425)

[rc-form-validation@2.5.0](http://react-component.github.io/form-validation/examples/form.html)

[async-validator](https://github.com/yiminghe/async-validator#transform) *

[表单验证，type为number和regexp时功能错误](https://github.com/ant-design/ant-design/issues/731)

[vue如何使用rules对表单字段进行校验](https://www.cnblogs.com/luoxuemei/p/9295506.html)

[Vue事件API](https://github.com/answershuto/learnVue/blob/master/docs/Vue事件机制.MarkDown) *