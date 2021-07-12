---
title: Vue 3.x 之：表单校验
date: 2021-07-09
tags: [Vue 3.x, Element Plus]
---

## 不同 Vue 版本下的基础实现比较

### Vue 2.x 版本

loginForm.vue 文件：

```vue
<template>
  <el-form ref="form" :model="form" :rules="rules">
    <el-form-item label="username" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input v-modal="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即创建</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ... } from '...'

export default {
  data() {
    const validatePass(rule, value, callback) => {
      /* 注意：成功失败都需要调用 callback() */
      if (!value) return callback(new Error('必填项'));
      if (...) {
        // true
        callback()
      } else {
        // false
        callback(new Error('error'))
      }
    };

    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // { required: true, message: 'xxx', trigger: 'blur' }
          { validator: validatePass, message: 'xxx', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'xxx', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          return 'success'
        }
        return 'error'
      })
    },
    resetForm() {
      this.$refs['form'].resetFields();
    }
  }
}
</script>
```

### Vue 3.x 版本

loginForm.vue 文件：

```vue
<template>
  <!-- ref 与 model 值不能相同 -->
  <el-form ref="loginForm" :model="form" :rules="rules">
    <!-- 此部分同 Vue 2.x 中的举例 -->
  </el-form>
</template>

<script>
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const validatePass(rule, value, callback) => {
      /* 注意：成功失败都需要调用 callback() */ 
      if (!value) return callback(new Error('必填项'));
      if (...) {
        // true
        callback()
      } else {
        // false
        callback(new Error('error'))
      }
    };

    // reactie()：返回对象的响应式副本
    // 常用来处理数组、对象等复杂类型的数据
    const state = reactive({
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // { required: true, message: 'xxx', trigger: 'blur' }
          { validator: validatePass, message: 'xxx', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'xxx', trigger: 'blur' }
        ]
      }
    });

    // ref()：接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象具有指向内部值的单个 property
    // loginForm.value 即为接受的内部值
    // 常用来处理基础类型的数据
    const loginForm = ref(null);

    const submitForm = () => {
      // setup() 取消 this 后，
      loginForm.value.validate((valid) => {
        if (valid) {
          return 'success'
        }
        return 'error'
      })
    };

    const resetForm = () => {
      loginForm.value.resetFields();
    }

    return {
      ...toRefs(state),
      loginForm,
      submitForm,
      resetForm,
    }
  }
}
</script>
```

## 复杂校验场景 Vue 3.x 版本

以下为实际工作中遇到的一些复杂校验场景，Vue 3.x + Element Plus 1.x-beta 实现。点击查看 [Vue 项目中的一些复杂校验场景](form_validate) （Vue 2.x + Element UI 实现复杂校验场景）

### 数字类型校验、修饰符

### 判断输入数字的范围

### 动态增减表单项校验

### 校验所有输入框值的计算值

在此场景中，单输入框值并不是讨论的重点，业务需要关注的是所有框值的计算值，只有计算值满足在正确范围内这个条件才允许提交表单数据，但往往这个计算值却又不纳入提交表单数据中。

解决办法通常为以下三种：

1. 在点击 “提交” 按钮时，除了 `formRef.value.validate()` 操作，再多加一步统计计算值并判断，通过则提交数据；未通过则弹出错误消息提示。

2. 在（1）的基础之上，修改错误消息的展示方式 => 在表单合适的展示位置添加一个通过校验值控制隐藏、显示的标签，标签内容为错误消息。添加样式模仿 Element UI 的表单错误消息样式。

3. 提交数据中添加计算值字段，并在表单合适的展示位置添加该计算值的表单项，e.g. `<el-form-item prop="qzTotal">...</el-form-item>`。添加样式隐藏输入框。

（2）、（3）与（1）相比，错误信息的提示方式有明显区别，与通常的单输入框错误信息展示一致，用户体验上不存在突兀的感觉。

（3）利用了组件自身的校验机制，样式修改比（2）稍简单，且易维护（e.g. 主题功能下样式的统一维护）。

以下为（3）的简单实现：

```vue
<template>
  <el-form ref="algorithmForm" :model="form" :rules="rules">
    <h3>权重计算</h3>

    <el-form-item prop="qzTotal">
      <el-input v-model="form.qzTotal" v-if="false"></el-input>
    </el-form-item>

    <el-form-item label="权重 1" prop="qz1">
      <el-input v-model="form.qz1"></el-input>
    </el-form-item>

    <el-form-item label="权重 2" prop="qz2">
      <el-input v-model="form.qz2"></el-input>
    </el-form-item>

    <el-form-item label="权重 2" prop="qz2">
      <el-input v-model="form.qz3"></el-input>
    </el-form-item>

    <el-form-item label="权重 4" prop="qz4">
      <el-input v-model="form.qz4"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">立即创建</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form-item>
</template>

<script>
import { onMounted, ref, reactive, toRefs, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      form: {
        qz1: 0.1,
        qz2: 0.2,
        qz3: 0.3,
        qz4: 0.4,
        qzTotal: 0,
      },
      rules: {
        qzTotal: [
          // numberRange：用于校验计算值是否在正确范围内，示例中省去具体实现
          // start、end：结果范围值，在 numberRange(rules, value, callback) 方法中可以通过参数 rules 获取
          { validator: numberRange, start: 0, end: 1, trigger: 'change' }
        ]
      }
    });

    const init = () => {
      state.form.qzTotal = computed(() => {
        // 计算权重总和。具体应根据实际场景改变
        return state.form.qz1 + state.form.qz2 + state.form.qz3 + state.form.qz4
      })
    };

    const submitForm = () => {
      // ...
    };

    const resetForm = () => {
      // ...
    };

    onMounted(() => {
      init();
    })

    return {
      ...toRefs(state),
      submitForm,
      resetForm
    }
  }
}
</script>
```

### 动态加载表单项校验

## 参考

- [vue3+typescript+element-plus表单验证(非获取实例)](https://www.cnblogs.com/delgoh/p/14276576.html)

- [vue3封装表单组件,不能触发element-plus的form/form-item的验证事件，解决办法](https://blog.csdn.net/u011401390/article/details/116298509)

- [重学vue之vue3中compositionAPI](https://blog.csdn.net/qq_45549336/article/details/111034107)

- [antd vue表单验证_使用Vue Composition API写出清晰、可扩展的表单](https://blog.csdn.net/weixin_30025473/article/details/112175144)

- [Vue3.0系列之表单验证](https://blog.csdn.net/muou_hang/article/details/106147026)

- [[Feature Request] how to use the el-form method validate with Composition API (JS), the current code example is still written with Options API](https://github.com/element-plus/element-plus/issues/2031)

{% comment %}

{% endcomment %}
