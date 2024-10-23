<template>
<div>
    <div ref="layerAddress" class="layerAddress">
        <div class="hd">
            <h4>请选择</h4>
            <span class="close" @click="close"></span>
        </div>
        <div class="bd">
            <van-tabs 
                v-model="active" 
                animated 
                color="#3ca5e2" 
                title-active-color="#3ca5e2" 
                title-inactive-color="#002a3c"
                line-height="1"
                class="tabs"
            >
                <van-tab 
                    name="tab-container1"
                    :title="curChoice1 || '请选择'" 
                    @click.native.prevent="clickTab1"
                >
                    <van-cell 
                        v-for="(item, index) in Arr1"
                        :key="index"
                        :title="item"
                        :class="{ curCell: index == curIndex1 }"
                        @click.native="clickCell1(item, index)"
                    >
                        <template #right-icon>
                            <span v-if="index == curIndex1" class="arrow"></span>
                        </template>
                        
                    </van-cell>
                </van-tab>
                <van-tab 
                    v-if="curChoice1" 
                    name="tab-container2"
                    :title="curChoice2 || '请选择'"
                    @click.native.prevent="clickTab2"
                >
                    <van-cell
                        v-for="(item, index) in Arr2"
                        :key="index"
                        :title="item"
                        :class="{ curCell: index == curIndex2 }"
                        @click.native="clickCell2(item, index)"
                    >
                        <template #right-icon>
                            <span v-if="index == curIndex2" class="arrow"></span>
                        </template>
                    </van-cell>
                </van-tab>
                <van-tab 
                    v-if="curChoice2" 
                    name="tab-container3"
                    :title="curChoice3 || '请选择'"
                    @click.native.prevent="clickTab3"
                >
                    <van-cell
                        v-for="(item, index) in Arr3"
                        :key="index"
                        :title="item"
                        :class="{ curCell: index == curIndex3 }"
                        @click.native="clickCell3(item, index)"
                    >
                        <template #right-icon>
                            <span v-if="index == curIndex3" class="arrow"></span>
                        </template>
                    </van-cell>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</div>
    
</template>
<script>
export default {
    name: 'LayerAddress',
    props: {
        addressVisible: Boolean,
        address: {
            type: Object,
            default: () => {},
        },
        province: {
            type: Object,
            default: () => {},
        },
        needClear: {
            type: Boolean,
            default: () => {},
        },
    },
    data() {
        return {
            active: 'tab-container1',
            Arr1: [],
            Arr2: [],
            Arr3: [],
            curIndex1: 0,
            curIndex2: 0,
            curIndex3: 0,
            curChoice1: '',
            curChoice2: '',
            curChoice3: '',
            repayBody: document.body,
            contentTop: 0,
        };
    },
    watch: {
        addressVisible(newValue) {
            this.stopBodyScroll(newValue);
            if (!newValue) {
                return;
            }
            newValue && this.setArr();
        },
    },
    created() {
        this.setArr();
    },
    methods: {
        stopBodyScroll(isFixed) {
            if (isFixed) {
                this.contentTop = window.scrollY;
                this.repayBody.style.position = 'fixed';
                this.repayBody.style.overflow = 'hidden';
                this.repayBody.style.width = '100%';
                this.repayBody.style.height = '100%';
                this.repayBody.style.top = `${-this.contentTop}px`;
            } else {
                this.repayBody.style.position = '';
                this.repayBody.style.overflow = '';
                this.repayBody.style.width = '';
                this.repayBody.style.height = '';
                this.repayBody.style.top = '';
                window.scrollTo(0, this.contentTop);
            }
        },
        setArr() {
            this.Arr1 = this.province['86'] || [];
            if (this.address && this.address.areaCode && !this.needClear) {
                this.curIndex1 = this.address.provinceCode;
                this.curIndex2 = this.address.cityCode;
                this.curIndex3 = this.address.areaCode;
                this.curChoice1 = this.address.province;
                this.curChoice2 = this.address.city;
                this.curChoice3 = this.address.area;
                this.Arr2 = this.province[this.curIndex1] || [];
                this.Arr3 = this.province[this.curIndex2] || [];
            }
        },
        clickTab1() {
            this.active = 'tab-container1';
            this.curChoice2 = '';
            this.curChoice3 = '';
        },
        clickTab2() {
            if (!this.curChoice2) {
                this.$toast('请先选择所在地区省级');
                return;
            }
            this.active = 'tab-container2';
            this.curChoice3 = '';
        },
        clickTab3() {
            if (!this.curChoice2) {
                this.$toast('请先选择所在地区市级');
                return;
            }
            this.active = 'tab-container3';
        },
        clickCell1(item, index) {
            this.curIndex1 = index;
            this.curChoice1 = item;
            this.curChoice2 = '';
            this.curChoice3 = '';
            this.Arr2 = this.province[index];
            setTimeout(() => {
                this.active = 'tab-container2';
            }, 50);
            this.$emit('clickAddress', {
              provinceName: item
            })
        },
        clickCell2(item, index) {
          this.curIndex2 = index;
            this.curChoice2 = item;
            this.curChoice3 = '';
            this.Arr3 = this.province[index];
            this.$emit('clickAddress', {
              cityName: item
            })
            if (!this.Arr3) {
                const data = {
                    provinceCode: this.curIndex1,
                    cityCode: this.curIndex2,
                    areaCode: this.curIndex3,
                    province: `${this.curChoice1}`,
                    city: this.curChoice2,
                    area: this.curChoice3,
                };
                this.$emit('choseFinish', data);
                return;
            }
            setTimeout(() => {
                this.active = 'tab-container3';
            }, 50);
        },
        clickCell3(item, index) {
            this.curIndex3 = index;
            this.curChoice3 = item;
            const data = {
                provinceCode: this.curIndex1,
                cityCode: this.curIndex2,
                areaCode: this.curIndex3,
                province: `${this.curChoice1}`,
                city: this.curChoice2,
                area: this.curChoice3,
            };
            setTimeout(() => {
                this.$emit('choseFinish', data);
            }, 50);
        },
        close() {
            this.$emit('closeAddress');
        },
    },
};
</script>
<style lang="less">
//@import '/public/style/util.scss';
//@import '/public/style/borderLine.scss';
//@include border-line-style(#f1f2f4);
//.van-popup {
//    border-radius: 10px 10px 0px 0px !important;
//    overflow: hidden !important;
//}
.van-popup-bottom {
    width: 100% !important;
}
.van-toast {
    z-index: 2222;
}
.layerAddressWrap {
    position: fixed !important;
    height: calc(100vh - 200px) !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    transform: inherit !important;
    border-radius: 10px 10px 0px 0px !important;
    overflow: hidden !important;
}

.van-button--default {
    
    padding-left: 5px !important;
    font-size: 15px;
    background: none !important;
    box-shadow: none !important;
    border: none;
}
.van-button-text {
    position: relative !important;
    display: block !important;
    color: #002a3c;
    font-size: 15px !important;
    overflow: hidden !important;
}
.van-button--small {
    margin-top: 13px !important;
    height: 25px !important;
    line-height:25px !important;
}
.van-cell-text {
    color: #002a3c !important;
    font-size: 15px !important;
}
.van-tab-container-item {
    overflow: auto;
    // animation: appear 0.5s linear;
    height: calc(100vh - 310px);
}
.van-cell {
    height: 40px !important;
    min-height: 40px !important;
    line-height: 40px;
    padding: 0 16px;
    &::after {
        border: none;
    }
}
.van-cell:last-child {
    background-image: none !important;
}

.curCell {
    color: #3ca5e2 !important;
}
.van-cell-wrapper {
    display: flex;
    flex-direction: row !important;
    align-items: center !important;
    min-height: auto;
    background-image: linear-gradient(180deg, #ffffff, #ffffff 50%, transparent 50%) !important;
    .van-cell-title {
        height: 40px;
        line-height: 40px;
        flex: 1 !important;
    }
    .van-cell-value {
        width: auto !important;
    }
}
.curButton {
    .van-button__text {
        position: relative;
        display: block;
        color: #3ca5e2;
        min-width: 60px;
        overflow: hidden;
    }
    .van-button__text:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0%;
        transform: translate(0, 1);
        min-width: 200px;
        height: 1px;
        background: #3ca5e2;
    }
}
.van-cell-wrapper {
    height: 40px !important;
    min-height: 40px !important;
    line-height: 40px;
    padding: 0 16px !important;
    background-image: linear-gradient(180deg, #ffffff, #ffffff 50%, transparent 50%) !important;
}
@keyframes appear {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.layerAddress {
    background: #fff;
    .nav {
        padding-left: 5px;
        padding-bottom: 15px;
    }
    .hd {
        position: relative;
        height: 54px;
        line-height: 54px;
        text-align: center;
        color: #002a3c;
        font-size: 18px;
        font-family: 'fzlt-bold';
        .close {
            position: absolute;
            right: 12px;
            top:11px;
            width: 30px;
            height: 30px;
            background: url('./images/house_close@2x.png') center center no-repeat;
            background-size: 30px 30px;
        }
    }
    .hd::after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 1px;
        border-top: 1px solid #f5f8fa;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    .arrow {
        margin-top: 10px;
        width: 20px;
        height: 20px;
        background: url('./images/house_right@2x.png') no-repeat;
        background-size: 100% 100%;
    }
    .bd {
        .van-tab {
            font-size: 15px !important;
            min-width: 60px;
            flex: 0;
        }
        .tabTitle {
            width: 60px;
        }
    }
} 

.van-tab__pane{
    height: calc(100vh - 310px);
    overflow: scroll;
}

</style>