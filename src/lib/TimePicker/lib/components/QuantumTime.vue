<template>
  <div class="time-content">
    <ul>
      <li class="time-content-item" v-for="(item,index) in itemData" :key="index">
        <span v-if="typeof item=='string'">
          <span v-if="index==0">{{item | getWeek}}</span>
          <template v-else>
            <el-checkbox class="check-all">{{item}}</el-checkbox>
          </template>
        </span>
        <div v-else>
          <el-checkbox-group v-model="checkList" @change="checkChange">
            <ul>
              <li v-for="(subitem,index) in item" :key="index">
                <el-checkbox v-for="sublowitem in subitem" :key="sublowitem" :label="sublowitem">
                  <span></span>
                </el-checkbox>
              </li>
            </ul>
          </el-checkbox-group>
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
    return {
      selectData: {},
      checkList: []
    };
  },
  filters: {
    getWeek(code) {
      let weekType = {
        Mon: "星期一",
        Tue: "星期二",
        Wed: "星期三",
        Thu: "星期四",
        Fri: "星期五",
        Sat: "星期六",
        Sun: "星期日"
      };
      return weekType[code];
    }
  },
  mounted() {
    this.selectData[this.itemData[0]] = [];
  },
  methods: {
    checkChange(event, index) {
      console.log(event, index);
    }
  },
  watch: {
    itemData(rv) {
      console.log(rv);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.time-content-item {
  width: 12.5%;
  display: inline-block;
  text-align: center;
  .el-checkbox + .el-checkbox {
    margin-left: -5px;
  }
  li {
    width: 16.6%;
    text-align: center;
    display: inline-block;
    .el-checkbox,
    .el-checkbox__input {
      display: inline;
    }
  }
}
.time-content-item:nth-child(3) {
  width: 75%;
}
</style>