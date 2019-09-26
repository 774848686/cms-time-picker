<template>
  <div class="time-picker">
    <el-form>
      <el-form-item class="el-form-item-header">
        <div class="time-condition">
          <span
            v-for="(item,index) in timeCondition"
            :key="index"
            @click="conditionClick(item)"
          >{{item.label}}</span>
        </div>
      </el-form-item>
      <el-form-item class="el-form-item-columns">
        <ul>
          <li v-for="(item,index) in columns" :key="index">
            <span
              v-for="(subitem,subindex) in item.split(',')"
              :key="subindex"
              @click="quantumClick(subitem,index)"
            >{{subitem}}</span>
          </li>
        </ul>
      </el-form-item>
      <el-form-item class="el-form-item-content">
        <template>
          <div class="time-list" v-for="(item,index) in itemData" :key="index">
            <quantum-time :itemData="item" :selectData="selectData" @checkedChange="checkedChange"></quantum-time>
          </div>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import QuantumTime from "./components/QuantumTime";
const weekArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
      timeCondition: [
        {
          key: "week",
          label: "工作日"
        },
        {
          key: "weekend",
          label: "周末"
        },
        {
          key: "cancle",
          label: "取消"
        }
      ],
      itemData: [],
      selectData: {},
      submitData: {},
      qClick: {}
    };
  },
  props: [],
  components: {
    QuantumTime
  },
  filters: {},
  created() {
    this.getItemData();
    this._getQuatumClick();
  },
  methods: {
    /**
     * 初始化数据结构
     */
    getItemData() {
      const dateNumber = 7;
      const compose = (f, g) => {
        return (val, group) => {
          return f(g(val), group);
        };
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
        this._getTimeArray
      );
      for (let i = 0; i < dateNumber; i++) {
        this.itemData.push([weekArray[i], "全天投放", finalResult(24, 6)]);
      }
    },
    /**
     * 头部选择条件
     */
    conditionClick(data) {
      let { key } = data,
        tempKey = [];
      if (key === "weekend") {
        tempKey = weekArray.slice(-2);
      }
      if (key === "week") {
        tempKey = weekArray.slice(0, 5);
      }
      if (key === "cancle") {
        this.selectData = {};
        return;
      }
      tempKey.forEach(item => {
        let tempArr = {};
        tempArr[item] = this._getTimeArray(24);
        this.selectData = { ...this.selectData, ...tempArr };
      });
    },
    /**
     * 多选框事件监听
     */
    checkedChange(data) {
      this.submitData[data["key"]] = data["value"];
      console.log(this.submitData);
    },
    /**
     * 单独时间段点击事件监听
     */
    quantumClick(data, index) {
      if (index > 1) {
        const isclick = this.qClick[data];
        const checkPush = (item = [], data) => {
          if (!item.includes(data)) {
            item.push(data);
          }
          return item;
        };
        const checkSplice = (item, data) => {
          let cloneArr = JSON.parse(JSON.stringify(item));
          const spliceIndex = cloneArr.findIndex(value => {
            return value === data;
          });
          if (spliceIndex>-1) {
            cloneArr.splice(spliceIndex, 1);
          }
          return cloneArr;
        };
        //选中
        if (!isclick) {
          this.qClick[data] = true;
          let tempArr = {};
          weekArray.forEach(item => {
            tempArr[item] = checkPush(this.submitData[item], data);
          });
          this.selectData = { ...this.selectData, ...tempArr };
          return;
        }
        //反选
        let tempArr = {};
        weekArray.forEach(item => {
          tempArr[item] = checkSplice(this.submitData[item], data);
        });
        this.selectData = { ...this.selectData, ...tempArr };
        this.qClick[data] = false;
      }
    },
    _getQuatumClick() {
      this._getTimeArray(24).forEach(res => {
        this.qClick[res] = false;
      });
    },
    /**
     * 组装时间段数组
     */
    _getTimeArray(num) {
      let temp = [];
      for (let i = 0; i < num; i++) {
        temp.push(i < 10 ? `0${i}` : `${i}`);
      }
      return temp;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
$bgColor: rgb(236, 243, 253);
.time-picker {
  width: 800px;
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
        cursor: pointer;
        color: rgb(147, 179, 194);
        margin-left: 10px;
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
        cursor: pointer;
        font-size: 12px;
        padding-right: 5px;
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