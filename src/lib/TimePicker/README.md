# lhdcitypicker
这是基于element-ui进行二次开发的cms后台系统的省市选择组件

### 效果图
![效果图片](https://note.youdao.com/yws/api/personal/file/67A1C976C52A4C8E971B91CB12F495D9?method=download&shareKey=d34733554da22ab6e287dd70dbe9485e)
### 插件的安装
#### NPM 
```
npm i lhdcitypicker
```
#### 引入插件
```
import Vue from 'vue';
import cityPicker from 'lhdcitypicker';

Vue.use(cityPicker);
```

#### 基本用法  
```html
<template>
  <div id="app">
    <city-picker 
    :selectData="selectData"
    @selectChange="selectChange">
    </city-picker>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
     selectData:['210300']
    };
  },

  methods: {
   selectChange(data){
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
| selectData | 已选省市code | Array |  
| selectChange | 选择事件 | Function |

