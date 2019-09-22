<template>
  <div class="time-content">
    <ul>
      <li
        class="time-content-item"
        v-for="(item,index) in itemData"
      >
        <span v-if="typeof item=='string'">
          <span v-if="index==0">
            {{item}}
          </span>
          <template v-else>
            <el-checkbox class="check-all">{{item}}</el-checkbox>
          </template>
        </span>
        <div v-else>
          <el-checkbox
            v-for="(subitem,index) in item"
            :key="index"
          ></el-checkbox>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
/*
 *城市选择组件
 */
export default {
  props: ["itemData"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.itemData);
  },
  methods: {},
  watch: {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.time-content-item {
  width: 12.5%;
  display: inline-block;
  text-align: center;
  .el-checkbox + .el-checkbox {
    margin-left: 5px;
  }
}
 .time-content-item:nth-child(2) {
   .el-checkbox.el-checkbox__input{
  display: none!important;
}
  }
</style>