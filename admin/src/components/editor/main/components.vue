<template>
    <div>
        <!-- 弹窗内的组件 -->
        <template v-if="item.tag == 'popup'">
            <component
                :is="componentsMap[item.propertyName]"
                :itemConfig="item"
                :forEdit="true"
                :activeComponent="activeComponent"
                @onCompontSubItemSelect="onCompontSubItemSelect"
                @rightSubClick="rightSubClick"
            />
        </template>
        <template v-else>
            <Child
                v-for="innerItem in item.children"
                :obj="innerItem"
                :key="innerItem.id"
                @click="onCompontItemSelect"
                @mouseRightClick="rightClick"
            />
            <component
                :is="componentsMap[item.propertyName]"
                :itemConfig="item"
                :isTemplate="true"
                :defaultImg="defaultImg"
            />
        </template>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import DragPro from '~/editor/tools/dragPro';
import { componentsMap } from './componentsDefine';
import { generateStyleByObj } from '$root/common/index';
import RclkMenu from '~/base/rclkMenu';
import Child from '~/editor/main/child';
import PopupContainer from '$root/common/foundation/popup/popupContainer';
import PopupContainerSec from '$root/common/foundation/popup/popupContainerSec';
import HolidayPopup from '$root/common/foundation/popup/holidayPopup';
export default {
    data() {
        return {
            componentsMap,
            defaultImg: require('$root/assets/images/defaultImg.png'),
        };
    },
    props: {
        item: {
            type: Object,
            default: {},
        },
        activeComponent: {
            type: Object,
            default: {},
        },
    },
    components: {
        DragPro,
        RclkMenu,
        Child,
        PopupContainer,
        PopupContainerSec,
        HolidayPopup,
    },
    computed: {
        showDragContainer() {
            return (
                this.activeComponent &&
                ['popupAD', 'popupImage', 'popupText'].includes(this.activeComponent.propertyName)
            );
        },
    },
    methods: {
        ...mapMutations('editor', [
            'changeComponentAcitve',
            'changeRightClick',
            'addChildComponent',
            'changeComponentAttr',
        ]),
        generateStyleByObj,
        onCompontSubItemSelect(obj) {
            this.onCompontItemSelect(obj.item, obj.e);
        },
        onCompontItemSelect(compontItem, e) {
            this.$emit('onCompontItemSelect', compontItem, e);
        },
        rightSubClick(obj) {
            this.$emit('rightSubClick', obj);
        },
        rightClick(e, componentItem, flag) {
            this.$emit('rightClick', e, componentItem, flag);
        },
    },
};
</script>

  