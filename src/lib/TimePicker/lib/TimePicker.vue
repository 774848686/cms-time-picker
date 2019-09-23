<template>
  <div class="time-picker">
    <el-form>
      <el-form-item class="el-form-item-header">
        <div class="time-condition">
          <span>工作日</span>
          <span>周末</span>
          <span>清空</span>
        </div>
      </el-form-item>
      <el-form-item class="el-form-item-columns">
        <ul>
          <li v-for="item in columns">
            <span v-for="subitem in item.split(',')">
              {{subitem}}
            </span>
          </li>
        </ul>
      </el-form-item>
      <el-form-item class="el-form-item-content">
        <template>
          <div class="time-list" v-for="(item,index) in itemData">
            <quantum-time :itemData="item"></quantum-time>
          </div>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import QuantumTime from "./components/QuantumTime";
export default {
  components: {
    QuantumTime
  },
  data() {
    return {
      columns: [
        "日期",
        "时间段",
        "00,01,02,03",
        "04,05,06,07",
        "08,09,10,11",
        "12,13,14,15",
        "16,17,18,19",
        "20,21,22,23"
      ],
      itemData: []
    };
  },
  props: [],
  components: {
    QuantumTime
  },
  filters: {},
  created() {
    this.getItemData();
  },
  methods: {
    getItemData() {
      const dateNumber = 7;
      const weekArray = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ];
      const compose = (f, g) => {
        return (val,group) => {
          return f(g(val),group);
        };
      };
      const getTimeArray = num => {
        let temp = [];
        for (let i = 0; i < num; i++) {
          temp.push(i < 10 ? `0${i}` : `${i}`);
        }
        return temp;
      };
      const getGroupArray = (data, timeGroupNumber) => {
        let groups = [],
          timeNumber = 24 / timeGroupNumber;
        for (let i = 0; i < timeGroupNumber; i++) {
          groups.push(data.slice(timeNumber * i, timeNumber * (i + 1)));
        }
        return groups;
      };
      const finalResult = compose(
        getGroupArray,
        getTimeArray
      );
      for (let i = 0; i < dateNumber; i++) {
        this.itemData.push([weekArray[i],"全天投放",...finalResult(24,6)]);
      }
      console.log(this.itemData)
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
$bgColor: rgb(236, 243, 253);
.time-picker {
  width: 700px;
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item-header {
    background: $bgColor;
    padding: 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #999999;
    .time-condition {
      float: right;
      span {
        color: rgb(147, 179, 194);
      }
    }
  }
  .el-form-item-columns {
    background: $bgColor;
    li {
      display: inline-block;
      width: 12.5%;
      text-align: center;
      span {
        font-size: 12px;
      }
    }
  }
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>