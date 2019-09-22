<template>
  <div>
    <div
      class="checkbox item-province"
      @mouseenter="showSubMenu(itemData.provinceCode)"
      @mouseleave="showSubMenu(0)"
    >
      <el-checkbox
        :label="itemData.provinceCode"
        :checked="checkAll"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >
        <span :class="{'color-red': itemData.provinceCode == highlightProvince}">{{itemData.provinceName}}</span>
      </el-checkbox>
      <el-tag v-if="checkedCities.length > 0">{{checkedCities.length}}/{{cities.length}}</el-tag>
    </div>
    <ul
      class="child item-citys"
      v-if="ifshow == itemData.provinceCode"
      @mouseenter="showSubMenu(itemData.provinceCode)"
      @mouseleave="showSubMenu(0)"
    >
      <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
      >
        <li
          v-for="(itemCity,cityIndex) in itemData.city"
          :key="cityIndex"
        >
          <el-checkbox :label="itemCity.cityCode">
            <span :class="{'color-red': itemCity.cityCode == highlightCity}">{{itemCity.cityName}}</span>
          </el-checkbox>
        </li>
      </el-checkbox-group>
    </ul>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
.items {
  .el-tag {
    height: 20px;
    line-height: 20px;
    padding: 0 5px;
  }
  border: 1px solid #e6e6e6;
  border-bottom: none;
  .item {
    height: 41px;
    border-bottom: 1px solid #e6e6e6;
    padding-left: 15px;
  }
  .item-area {
    float: left;
    padding-right: 10px;
    min-width: 80px;
    text-align: right;
  }
  .item-provinces {
    float: left;
    li {
      float: left;
      min-width: 120px;
      padding-left: 10px;
      position: relative;
    }
    .item-citys {
      position: absolute;
      top: -1px;
      left: 80px;
      background: #fff;
      z-index: 99;
      border: 1px solid #e6e6e6;
      width: 300px;
    }
  }
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

.color-red {
  color: red;
}
</style>
<script>
/*
 *城市选择组件
 */
export default {
  data() {
    return {
      ifshow: 0,
      checkAll: false,
      checkedCities: [],
      cities: []
    };
  },
  props: [
    "itemData",
    "provinceCode",
    "selectData",
    "highlightProvince",
    "highlightCity"
  ],
  mounted() {
    let cityArr = this.itemData.city;
    cityArr.forEach((v, i) => {
      this.cities.push(v.cityCode);
    });
    this.chilCall();
    this.initselectData(this.selectData);
  },
  methods: {
    showSubMenu(num) {
      this.ifshow = num;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.chilCall();
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.chilCall();
    },
    initselectData(array) {
      this.checkedCities = this.cities.filter(function(v) {
        return array.indexOf(v) > -1;
      });
      if (this.cities.length == this.checkedCities.length) {
        this.checkAll = true;
      }
      if (array.length == 0) {
        this.checkAll = false;
      }
      this.chilCall();
    },
    chilCall() {
      this.$emit(
        "newEvent",
        this.checkedCities,
        this.provinceCode,
        this.checkAll
      );
    }
  },
  watch: {
    selectData(array) {
      this.initselectData(array);
    }
  }
};
</script>