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
