# lhdtimepicker
这是基于element-ui进行二次开发的cms后台系统的时间段选择组件

### 插件的安装
#### NPM 
```
npm i lhdtimepicker
```
#### 引入插件
```
import Vue from 'vue';
import timePicker from 'lhdtimepicker';

Vue.use(timePicker);
```

#### 基本用法  
```html
<template>
  <div id="app">
    <time-picker @checkChange="checkChange"></time-picker>
  </div>
</template>
 
<script>
export default {
  name: "App",
  data() {
    return {
     
    };
  },
 
  methods: {
   checkChange(data){
     console.log(data)
   }
  }
};
</script> 
 
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  user-select: none;
}
</style> 

```


