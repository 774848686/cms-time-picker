<template>
  <div class="time-content">
    <ul>
      <li
        class="time-content-item"
        v-for="(item,index) in itemData"
        :key="index"
      >
        <span v-if="typeof item=='string'">
          <span v-if="index==0">{{item | getWeek}}</span>
          <template v-else>
            <el-checkbox
              class="check-all"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >
              <span>{{item}}</span>
            </el-checkbox>
          </template>
        </span>
        <div v-else>
          <el-checkbox-group
            v-model="checkedTimes"
            @change="handleCheckedChange"
          >
            <ul>
              <li
                v-for="(subitem,index) in item"
                :key="index"
              >
                <el-checkbox
                  v-for="sublowitem in subitem"
                  :key="sublowitem"
                  :label="sublowitem"
                >
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
  props: ["itemData","selectData"],
  data() {
    return {
      checkedTimes: [],
      checkAll: false,
      timeOptions: {},
      itemKey:''
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
    this.initOptions();
    this.initSelectData();
  },
  methods: {
    /**
     * 初始化全选数组
     */
    initOptions() {
      this.itemKey = this.itemData[0];
      let tempArray = [];
      const itemArray = this.itemData.filter(item => {
        if (Object.prototype.toString.call(item) === "[object Array]") {
          return item;
        }
      });
      itemArray[0].forEach(item => {
        tempArray = [...tempArray, ...item];
      });
      this.timeOptions[this.itemKey] = tempArray;
    },
    /**
     * 处理选中的数组
     */
    initSelectData(){
      this.checkedTimes = this.selectData[this.itemKey] || [];
      this.handleCheckedChange(this.checkedTimes);
    },
    /**
     * 全选事件
     */
    handleCheckAllChange(val) {
      this.checkedTimes = val ? this.timeOptions[this.itemKey] : [];
      this.$emit('checkedChange',{key:this.itemKey,value:this.checkedTimes});
    },
    /**
     * 多选框选择事件
     */
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.timeOptions[this.itemKey].length;
      this.checkedTimes = value;
      this.$emit('checkedChange',{key:this.itemKey,value:this.checkedTimes});
    }
  },
  watch: {
    selectData(rv) {
      this.initSelectData();
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