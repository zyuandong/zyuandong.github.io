---
title: 编辑器 Monaco Editor
---

[工作中的 Monaco Editor 使用经验总结](https://segmentfault.com/a/1190000042292716) !!!!

```js
monaco.editor.create(this.$refs.editor, {
  acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
  acceptSuggestionOnEnter: 'on', // 接受输入建议 "on" | "off" | "smart"
  accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
  accessibilitySupport: 'on', // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
  autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
  autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
  autoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
  autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
  autoIndent: 'None', // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
  automaticLayout: true, // 自动布局
  codeLens: false, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
  codeLensFontFamily: '', // codeLens的字体样式
  codeLensFontSize: 14, // codeLens的字体大小
  colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
  comments: {
    ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
    insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
  }, // 注释配置
  contextmenu: true, // 启用上下文菜单
  columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
  autoSurround: 'never', // 是否应自动环绕选择
  copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
  cursorBlinking: 'Solid', // 光标动画样式
  cursorSmoothCaretAnimation: true, // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
  cursorStyle: 'UnderlineThin', // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
  cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
  cursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
  cursorWidth: 2, // <=25 光标宽度
  minimap: {
    enabled: false, // 是否启用预览图
  }, // 预览图设置
  folding: true, // 是否启用代码折叠
  links: true, // 是否点击链接
  overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
  renderLineHighlight: 'gutter', // 当前行突出显示方式
  roundedSelection: false, // 选区是否有圆角
  scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
  readOnly: false, // 是否为只读模式
  theme: 'vs', // vs, hc-black, or vs-dark
});
```

[vue3+vite+ts 使用 monaco-editor 编辑器](https://blog.csdn.net/weixin_43909743/article/details/127633552) !!!!!

[monaco-editor 实现全局内容和文件搜索](https://juejin.cn/post/6844903849833005063)

[microsoft/monaco-editor](https://github.com/microsoft/monaco-editor)

[nmanumr/monaco-basic](https://github.com/nmanumr/monaco-basic)

[Vue 引入代码代码编辑器 monaco-editor 并自定义语法提示](https://www.cnblogs.com/wangjiahui/p/15524189.html)

[在 Monaco 编辑器中对自定义语言进行语法验证](https://www.thinbug.com/q/39957140)

[Vite+Vue3+Typescript 对于 MonacoEditor 的实践(慢更)](https://blog.csdn.net/heer_kaisair/article/details/123493429)

[matt-oconnell/vue-monaco-editor](https://github.com/matt-oconnell/vue-monaco-editor)

[Vue 引入代码代码编辑器 monacoeditor 并自定义语法提示](http://t.zoukankan.com/wangjiahui-p-15524189.htmls)

[vue 使用 monaco-editor 实现在线编辑器](https://www.cnblogs.com/clownblogs/p/16535457.html)

---

[Ace Editor](https://ace.c9.io/)

[CodeMirror](https://codemirror.net/)

[vue-codemirror 代码编辑器使用心得和踩坑](https://blog.csdn.net/xujingyiss/article/details/118992763)

[闲谈 Monaco Editor-基本使用](https://zhuanlan.zhihu.com/p/47746336?from=singlemessage)

[vue3+vite+ts 使用 monaco-editor 编辑器](https://blog.csdn.net/weixin_43909743/article/details/127633552)

[monaco-editor 基本使用以及 monaco-editor 封装成 vue 组件](https://blog.csdn.net/m0_47659279/article/details/127437709)

[Vue3+Vite+ElementPlus 中安装使用 MonacoEditor(自定义语言,自定义高亮，自定义鼠标悬浮提示，自定义工具栏)](https://blog.csdn.net/qq_54123885/article/details/125843129)

## 父组件获取编辑器的实时修改

### ref 组件实例 + defineExpose

parent.vue

```vue
<script setup lang="ts">
import MonacoEditor from './MonacoEditor.vue';
import { ref } from 'vue';

const editorRef = ref();

// 点击可打印查看实时编辑器输入内容
const handleConsole = () => {
  const { content } = editorRef.value;
  console.log(content);
};
</script>

<template>
  <div id="ser-detail-log">
    <button @click="handleConsole">click</button>
    <div class="editor-container">
      <MonacoEditor ref="editorRef" />
    </div>
  </div>
</template>
```

MonacoEditor.vue

```vue
<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { onMounted, reactive, ref } from 'vue';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const props = withDefaults(
  defineProps<{
    value?: string;
    params?: {
      clusterId: string;
      config: string;
      configGroup: string;
      namespace: string;
    };
  }>(),
  {
    // value: 'version:\n\t0.0.1',
    value: '',
  }
);

let content = ref<string>(props.value);

let editor: any;
const initEditor = () => {
  const el = document.getElementById('monaco-editor') as HTMLElement;
  editor = monaco.editor.create(el, {
    value: content.value,
    language: 'yaml',
    theme: 'vs-dark', // vs, hc-black, or vs-dark
    contextmenu: false, // 启用上下文菜单
  });

  editor.onDidChangeModelContent(() => {
    const value = editor.getValue();
    content.value = value;
  });
};

onMounted(() => {
  initEditor();
});

defineExpose({
  content,
});
</script>

<template>
  <div id="monaco-editor"></div>
</template>
```

### v-model + emits

parent.vue

```vue
<script setup lang="ts">
import MonacoEditor from './MonacoEditor.vue';
import { ref } from 'vue';

const value = ref<string>('');
</script>

<template>
  <div id="ser-detail-log">
    <pre>{{ value }}</pre>
    <div class="editor-container">
      <MonacoEditor v-model="value" />
    </div>
  </div>
</template>
```

MonacoEditor.vue

```vue
<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { onMounted, reactive, ref } from 'vue';

// ...

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    // ...
  }>(),
  {
    modelValue: '',
  }
);

const emits = defineEmits(['update:modelValue']);

let editor: any;
const initEditor = () => {
  const el = document.getElementById('monaco-editor') as HTMLElement;
  editor = monaco.editor.create(el, {
    value: props.modelValue,
    // ...
  });

  editor.onDidChangeModelContent(() => {
    const value = editor.getValue();
    emits('update:modelValue', value);
  });
};

onMounted(() => {
  initEditor();
});
</script>

<template>
  <div id="monaco-editor"></div>
</template>
```
