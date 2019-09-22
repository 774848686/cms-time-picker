<template>
  <div class="city-picker">
    <address-list :selectData="selectData" @selectChange="selectChange"></address-list>
  </div>
</template>

<script>
import addressList from './components/AddressList'
export default {
  name: "cityPicker",
  props:['selectData'],
  components:{
    addressList
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {
    selectChange(data){
      this.$emit('selectChange',data)
    }
  },
};
</script>
<style rel="stylesheet/scss" lang="scss"></style>
