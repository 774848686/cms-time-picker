# lhdtimepicker
这是基于element-ui进行二次开发的cms后台系统的时间段选择组件

### 效果图
![效果图片](https://note.youdao.com/yws/api/personal/file/A63B20B3847F4064BD3074A9826989EF?method=download&shareKey=4e3c39919feeb870c5e266bbcc16fe32)
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

### API  
| 参数 | 说明 | 类型  |  
| - | :- | :- | :-: |  
| checkChange | 选择事件 | Function |

