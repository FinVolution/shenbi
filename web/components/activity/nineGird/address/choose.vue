<template>
  <div class="select">
    <!-- 标题 -->
    <div class="title borderBottom">
      <div
        class="p-b-14"
        :class="{ item: index === active }"
        v-for="(item, index) in titleDatas"
        :key="index"
        @click="tabChange(item, index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="content">
      <!-- 省 -->
      <div v-show="active === 0">
        <div
          class="c-item borderBottom"
          v-for="(item, index) in province"
          :key="index"
          @click="select(item, 0, index)"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 市 -->
      <div v-show="active === 1">
        <div
          class="c-item borderBottom"
          v-for="(item, index) in city"
          :key="index"
          @click="select(item, 1, index)"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 区 -->
      <div v-show="active === 2">
        <div
          class="c-item pos"
          :class="index === checked && showCheckedStatus === 1 ? 'c-5179F3' : ''"
          v-for="(item, index) in county"
          :key="index"
          @click="select(item, 2, index)"
        >
          {{ item.name }}
          <div class="checked" v-if="checked === index">
            <img src="/images/nineGrid/ic_xuanzhong@2x.png" alt="" />
          </div>
        </div>
      </div>
      <!-- 县 -->
      <div v-show="active === 3">
        <div
          class="c-item pos"
          :class="{ 'c-5179F3': index === checked }"
          v-for="(item, index) in town"
          :key="index"
          @click="select(item, 3, index)"
        >
          {{ item.name }}
          <div class="checked" v-if="checked === index">
            <img src="/images/nineGrid/ic_xuanzhong@2x.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { queryStreetListByParentId } from "@/service/nineGird";
export default {
  name: "select",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      areaData: [], // 省市县原始数据
      showCheckedStatus: 0,
      init: [{ name: "请选择" }], // title原始数据
      active: 0, // title选中标识
      titleDatas: [], // title数据
      resultArr: [], // 缓存title数据
      province: [], // 省列表数据
      city: [], // 市列表数据
      county: [], // 区列表数据
      town: [], // 县列表数据
      checked: "", // 最后选中标识
      currentValue: this.value, // 已选中的地址，以/分割
    };
  },
  computed: {
    ...mapState("addressStore", ["provinceList"]),
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
  },
  created() {
    this.areaData = this.provinceList;
    this.province = this.areaData.map((e) => {
      return e;
    });
    this.titleDatas = [...this.titleDatas, ...this.init];
    this.initData();
  },
  mounted() {},
  methods: {
    tabChange(item, index) {
      this.active = index;
      this.checked = -1;
      switch (index) {
        case 0:
          if (this.resultArr.length > 0) {
            this.resultArr.splice(0);
          }

          break;
        case 1:
          if (this.resultArr.length > 1) {
            this.resultArr.splice(1);
          }
          break;
        case 2:
          if (this.resultArr.length > 2) {
            this.resultArr.splice(2);
          }
          break;
        case 3:
          break;
      }
      this.titleDatas = [...this.resultArr, ...this.init];
    },
    initData() {
      if (this.currentValue) {
        let valArr = this.currentValue.split("/");
        if (valArr.length === 3) {
          this.findAdrIndex(valArr);
        }
      }
    },
    findAdrIndex(arr) {
      // 回流时靠文字找到对应的index
      arr.map((item, index) => {
        this.active = index;
        switch (index) {
          case 0:
            let province = this.province.find((pro) => {
              return pro.name === item;
            });
            this.select(province);
            break;
          case 1:
            let city = this.city.find((ci) => {
              return ci.name === item;
            });
            this.select(city);
            break;
          case 2:
            let couIndex = -1;
            let county = this.county.map((co, i) => {
              if (co.name === item) {
                couIndex = i;
                return co;
              }
            });
            this.select(county, couIndex, true);
            break;
          case 3:
            let townIndex = -1;
            let town = this.town.map((co, i) => {
              if (co.name === item) {
                couIndex = i;
                return co;
              }
            });
            this.select(town, townIndex, true);
            break;
          default:
            break;
        }
      });
    },
    async select(value, index, itemIndex) {
      console.log(value, index, itemIndex);
      this.active = index;

      if (this.resultArr.length > 0) {
        if (index === 2) {
          const {
            data: { ret, data, msg },
          } = await queryStreetListByParentId(value.code);
          if (ret === 0) {
            this.town = data;
            value.children = data;
          } else {
            this.$toast(msg);
          }
        }
        switch (index) {
          case 0:
            this.city = value.children;
            this.resultArr = [];
            this.resultArr.push(value);
            break;
          case 1:
            this.county = value.children;
            if (this.resultArr.length > 1) {
              this.resultArr.splice(1, 1, value);
            } else {
              this.resultArr.push(value);
            }
            break;
          case 2:
            // this.town = value.children; // 选择对应的四级地址通过接口请求
            if (this.resultArr.length > 2) {
              this.resultArr.splice(2, 1, value);
            } else {
              this.resultArr.push(value);
            }

            break;
          case 3:
            if (this.resultArr.length > 3) {
              this.resultArr.splice(3, 1, value);
            } else {
              this.resultArr.push(value);
            }
            break;
        }
        if (value.children && value.children.length > 0) {
        } else {
          if (this.town && this.town.length > 0) {
            this.showCheckedStatus = 2; //四级地址选择
          } else {
            this.showCheckedStatus = 1; //三级地址选择
          }
          this.checked = itemIndex;
          this.$emit("result", this.resultArr);
        }
      } else {
        this.resultArr.push(value);
        this.city = value.children;
      }
      if (value.children && value.children.length > 0) {
        this.titleDatas = [...this.resultArr, ...this.init];
        this.active = index + 1;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@topHeight: 54px;
.select {
  padding-top: 0.1px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  background: #fff;
  .title {
    padding: 16px 15px 0;
    // border-bottom: 1px solid #dae0ec;
    font-size: 16px;
    font-family: FZLTHThin--GB1-4;
    font-weight: normal;
    color: rgba(56, 67, 105, 1);
    line-height: 18px;
    overflow: hidden;
    .p-b-14 {
      float: left;
      padding-bottom: 14px;
      margin-right: 30px;
    }
    .item {
      color: rgba(81, 121, 243, 1);
      padding-bottom: 12px;
      border-bottom: 2px solid #5179f3;
    }
  }
  .content {
    padding: 0 20px;
    height: ~"calc(100% - 54px)";
    overflow-y: auto;
    .c-item {
      font-size: 16px;
      font-family: FZLTHThin--GB1-4;
      font-weight: normal;
      color: rgba(56, 67, 105, 1);
      line-height: 18px;
      padding: 14px 0 16px;
      //   border-bottom: 1px solid #dae0ec;
      &:nth-last-child(1) {
        margin-bottom: 20px;
      }
    }
    .pos {
      position: relative;
      .checked {
        position: absolute;
        top: 19px;
        right: 0;
        width: 18px;
        height: 18px;
        img {
          width: 100%;
        }
      }
    }
    .c-5179F3 {
      color: #5179f3;
    }
  }
  .line {
    height: 6px;
    background: rgba(244, 246, 248, 1);
  }
}
</style>
