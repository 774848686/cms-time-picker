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
