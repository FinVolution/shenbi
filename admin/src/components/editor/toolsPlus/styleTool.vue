<template>
  <div class="style-attr-container">
    <div class="inner-container" v-if="flexDirectionShow || positionShow || alignShow">
      <div class="form-group label">Flex布局:</div>
      <div class="form-group" v-if="flexDirectionShow">
        <span class="config-title">Flex 摆放:</span>
        <RadioGroup
          :options="[
            { val: 'row', label: '水平' },
            { val: 'column', label: '垂直' }
          ]"
          v-model="flexDirection"
          @input="updateStyleAttr('flexDirection', 'flexDirection')"
        ></RadioGroup>
      </div>
      <div class="form-group" v-if="positionShow">
        <span class="config-title">定位方式:</span>
        <RadioGroup
          :options="[
            { val: 'absolute', label: '绝对定位' },
            { val: 'relative', label: '相对定位' }
          ]"
          v-model="position"
          @input="changePosition"
        ></RadioGroup>
      </div>
      <div class="form-group" v-if="alignShow">
        <span class="config-title">内部对齐:</span>
        <RadioGroup
          :options="[
            { val: 'left', label: '居左' },
            { val: 'center', label: '居中' },
            { val: 'right', label: '居右' }
          ]"
          v-model="align"
          @input="updateStyleAttr('align', 'align')"
        ></RadioGroup>
      </div>
    </div>
   
    <div class="inner-container" v-if="zIndexShow || orderShow">
      <div class="form-group label">层级排序:</div>
      <div class="form-group" v-if="zIndexShow && orderShow">
        <span class="config-title">层级:</span>
        <InputNum v-model="zIndex" :step="1" @input="updateStyleAttr('zIndex', 'zIndex')" :width="62"></InputNum>
        <span class="config-title">排序:</span>
        <InputNum v-model="order" :step="1" @input="updateStyleAttr('order', 'order')" :width="62"></InputNum>
      </div>
      <template v-else>
        <div class="form-group" v-if="zIndexShow">
          <span class="config-title">层级:</span>
          <InputNum v-model="zIndex" :step="1" @input="updateStyleAttr('zIndex', 'zIndex')"></InputNum>
        </div>
        <div class="form-group" v-if="orderShow">
          <span class="config-title">排序:</span>
          <InputNum v-model="order" :step="1" @input="updateStyleAttr('order', 'order')"></InputNum>
        </div>
      </template>
    </div>

    <div class="inner-container" v-if="widthShow || heightShow">
      <div class="form-group label">宽高设置:</div>
      <div class="form-group" v-if="widthShow && heightShow">
        <span class="config-title">
          宽度
          <el-tooltip content="宽度取iphone6宽度，默认375px，请勿超过" placement="top"><i class="el-icon-question"></i></el-tooltip>
          /高度:
        </span>
        <div class="link-input">
          <InputNum v-model="width" :step="1" @input="updateStyleAttr('width', 'width')" :width="62"></InputNum>
          <SvgIcon icon-class="link" class-name="link" @click="onLinkBtnClick('WH')"></SvgIcon>
          <InputNum v-model="height" :step="1" @input="updateStyleAttr('height', 'height')" :width="62"></InputNum>
        </div>
      </div>
      <template v-else>
        <div class="form-group" v-if="widthShow">
          <span class="config-title">
            宽度:
            <el-tooltip content="宽度取iphone6宽度，默认375px，请勿超过" placement="top"><i class="el-icon-question"></i></el-tooltip>
          </span>
          <InputNum v-model="width" :step="1" @input="updateStyleAttr('width', 'width')"></InputNum>
        </div>
        <div class="form-group" v-if="heightShow">
          <span class="config-title">高度:</span>
          <InputNum v-model="height" :step="1" @input="updateStyleAttr('height', 'height')"></InputNum>
        </div>
      </template>
    </div>
    <div class="inner-container" v-if="topShow || leftShow">
      <div class="form-group label">位置:</div>
      <div class="form-group" v-if="topShow && leftShow">
        <span class="config-title">距顶部:</span>
        <InputNum v-model="top" :step="1" @input="updateStyleAttr('top', 'top')" :width="52"></InputNum>
        <span class="config-title">距左边:</span>
        <InputNum v-model="left" :step="1" @input="updateStyleAttr('left', 'left')" :width="52"></InputNum>
      </div>
      <template v-else>
        <div class="form-group" v-if="topShow">
          <span class="config-title">距离顶部:</span>
          <InputNum v-model="top" :step="1" @input="updateStyleAttr('top', 'top')"></InputNum>
        </div>
        <div class="form-group" v-if="leftShow">
          <span class="config-title">距离左边:</span>
          <InputNum v-model="left" :step="1" @input="updateStyleAttr('left', 'left')"></InputNum>
        </div>
      </template>
    </div>
    <div class="inner-container" v-if="marginTopShow || marginBottomShow || marginLeftShow || marginRightShow">
      <div class="form-group label">外边距:</div>
      <div class="form-group" v-if="marginTopShow && marginBottomShow">
        <span class="config-title">[上/下]<SvgIcon class-name="upVsDown" icon-class="upVsDown"></SvgIcon>:</span>
        <div class="link-input">
          <InputNum v-model="marginTop" :step="1" @input="updateStyleAttr('marginTop', 'marginTop')" :width="52"></InputNum>
          <SvgIcon icon-class="link" class-name="link" @click="onLinkBtnClick('marginTB')"></SvgIcon>
          <InputNum v-model="marginBottom" :step="1" @input="updateStyleAttr('marginBottom', 'marginBottom')" :width="52"></InputNum>
        </div>
      </div>
      <template v-else>
        <div class="form-group" v-if="marginTopShow">
          <span class="config-title">[上]:</span>
          <InputNum v-model="marginTop" :step="1" @input="updateStyleAttr('marginTop', 'marginTop')"></InputNum>
        </div>
        <div class="form-group" v-if="marginBottomShow">
          <span class="config-title">[下]:</span>
          <InputNum v-model="marginBottom" :step="1" @input="updateStyleAttr('marginBottom', 'marginBottom')"></InputNum>
        </div>
      </template>
      <div class="form-group" v-if="marginLeftShow || marginRightShow">
        <span class="config-title">[左/右]<SvgIcon class-name="leftVsRight" icon-class="leftVsRight"></SvgIcon>:</span>
        <div class="link-input">
          <InputNum v-model="marginLeft" :step="1" @input="updateStyleAttr('marginLeft', 'marginLeft')" :width="52"></InputNum>
          <SvgIcon icon-class="link" class-name="link" @click="onLinkBtnClick('paddingLR')"></SvgIcon>
          <InputNum v-model="marginRight" :step="1" @input="updateStyleAttr('marginRight', 'marginRight')" :width="52"></InputNum>
        </div>
      </div>
    </div>
    
    <div class="inner-container" v-if="paddingTopShow || paddingBottomShow || paddingLeftShow || paddingRightShow">
      <div class="form-group label">内边距:</div>
      <div class="form-group" v-if="paddingTopShow && paddingBottomShow">
        <span class="config-title">[上/下]<SvgIcon class-name="upVsDown" icon-class="upVsDown"></SvgIcon>:</span>
        <div class="link-input">
          <InputNum v-model="paddingTop" :step="1" @input="updateStyleAttr('paddingTop', 'paddingTop')" :width="52"></InputNum>
          <SvgIcon icon-class="link" class-name="link" @click="onLinkBtnClick('paddingTB')"></SvgIcon>
          <InputNum v-model="paddingBottom" :step="1" @input="updateStyleAttr('paddingBottom', 'paddingBottom')" :width="52"></InputNum>
        </div>
      </div>
      <template v-else>
        <div class="form-group" v-if="paddingTopShow">
          <span class="config-title">[上]:</span>
          <InputNum v-model="paddingTop" :step="1" @input="updateStyleAttr('paddingTop', 'paddingTop')"></InputNum>
        </div>
        <div class="form-group" v-if="paddingBottomShow">
          <span class="config-title">[下]:</span>
          <InputNum v-model="paddingBottom" :step="1" @input="updateStyleAttr('paddingBottom', 'paddingBottom')"></InputNum>
        </div>
      </template>
      <div class="form-group" v-if="paddingLeftShow">
        <span class="config-title">[左/右]<SvgIcon class-name="leftVsRight" icon-class="leftVsRight"></SvgIcon>:</span>
        <div class="link-input">
          <InputNum v-model="paddingLeft" :step="1" @input="updateStyleAttr('paddingLeft', 'paddingLeft')" :width="52"></InputNum>
          <SvgIcon icon-class="link" class-name="link" @click="onLinkBtnClick('paddingLR')"></SvgIcon>
        </div>
      </div>
      <div class="form-group" v-if="paddingRightShow">
        <span class="config-title">[左/右]<SvgIcon class-name="leftVsRight" icon-class="leftVsRight"></SvgIcon>:</span>
        <div class="link-input">
          <SvgIcon icon-class="link" class-name="link" @click="onLinkBtnClick('paddingLR')"></SvgIcon>
          <InputNum v-model="paddingRight" :step="1" @input="updateStyleAttr('paddingRight', 'paddingRight')" :width="52"></InputNum>
        </div>
      </div>
      <template v-else>
        <div class="form-group" v-if="paddingLeftShow">
          <span class="config-title">[左]:</span>
          <InputNum v-model="paddingLeft" :step="1" @input="updateStyleAttr('paddingLeft', 'paddingLeft')"></InputNum>
        </div>
        <div class="form-group" v-if="paddingRightShow">
          <span class="config-title">[右]:</span>
          <InputNum v-model="paddingRight" :step="1" @input="updateStyleAttr('paddingRight', 'paddingRight')"></InputNum>
        </div>
      </template>
    </div>
    <div class="inner-container" style="padding:0 6px;" v-if="colorShow || fontFamilyShow || fontSizeShow">
      <div class="form-group" v-if="colorShow">
        <el-color-picker v-model="color" show-alpha @change="updateStyleAttr('color', 'color')" size="mini"></el-color-picker>
        <input type="text" v-model="color" class="tool-input" style="width:168px;" />
      </div>
      <div class="form-group" v-if="fontSizeShow || fontFamilyShow">
        <span class="config-title">字体:</span>
        <el-select v-model="fontFamily" placeholder="请选择" size="mini" @change="updateStyleAttr('fontFamily', 'fontFamily')" style="width:132px;">
          <el-option v-for="(item, index) in fontFamilyOptions" :label="item.label" :value="item.value" :disabled="item.disabled" :key="index"> </el-option>
        </el-select>
        <span class="config-title">大小:</span>
        <InputNum v-model="fontSize" :step="1" @input="updateStyleAttr('fontSize', 'fontSize')" :width="42"></InputNum>
      </div>
      <div class="form-group" v-if="fontSizeShow">
        <span class="config-title">加粗:</span>
        <el-select v-model="fontWeight" placeholder="请选择" size="mini" @change="updateStyleAttr('fontWeight', 'fontWeight')" style="width:132px;">
          <el-option v-for="(item, index) in fontWeightOptions" :label="item.label" :value="item.value" :disabled="item.disabled" :key="index"> </el-option>
        </el-select>
      </div>
      <div class="form-group" v-if="fontSizeShow">
        <span class="config-title">字间距:</span>
          <InputNum v-model="letterSpacing" :step="1" @input="updateStyleAttr('letterSpacing', 'letterSpacing')" :width="42"></InputNum>
        </div>
      </div> 
    <div class="inner-container" style="padding:0 6px;" v-if="borderColorShow || borderWidthShow || borderWidthShow || borderRadiusShow">
      <div class="form-group label">边框:</div>
      <div class="form-group" v-if="borderColorShow && borderStyleShow">
        <span class="config-title">颜色:</span>
        <el-color-picker v-model="borderColor" show-alpha @change="updateStyleAttr('borderColor', 'borderColor')" size="mini"></el-color-picker>
        <input type="text" v-model="borderColor" class="tool-input" readonly style="width:120px;" />
        <span class="config-title">样式:</span>
        <el-select v-model="borderStyle" placeholder="请选择" size="mini" @change="updateStyleAttr('borderStyle', 'borderStyle')" style="width:90px;">
          <el-option v-for="(item, index) in borderStyleOptions" :label="item.label" :value="item.value" :disabled="item.disabled" :key="index"> </el-option>
        </el-select>
      </div>
      <div class="form-group" v-else-if="borderColorShow">
        <span class="config-title">颜色:</span>
        <el-color-picker v-model="borderColor" show-alpha @change="updateStyleAttr('borderColor', 'borderColor')" size="mini"></el-color-picker>
        <input type="text" v-model="borderColor" class="tool-input" readonly />
      </div>
    
      <div class="form-group" v-else-if="borderStyleShow">
        <span class="config-title">样式:</span>
        <el-select v-model="borderStyle" placeholder="请选择" size="mini" @change="updateStyleAttr('borderStyle', 'borderStyle')">
          <el-option v-for="(item, index) in borderStyleOptions" :label="item.label" :value="item.value" :disabled="item.disabled" :key="index"> </el-option>
        </el-select>
      </div>
      <div class="form-group" v-if="borderWidthShow && borderRadiusShow">
        <span class="config-title">宽度:</span>
        <InputNum v-model="borderWidth" :step="1" @input="updateStyleAttr('borderWidth', 'borderWidth')" :width="50"></InputNum>
        <span class="config-title">圆角:</span>
        <InputNum v-model="borderRadius" :step="1" @input="updateStyleAttr('borderRadius', 'borderRadius')" :width="50"></InputNum>
      </div>
      <div class="form-group" v-else-if="borderWidthShow">
        <span class="config-title">宽度:</span>
        <InputNum v-model="borderWidth" :step="1" @input="updateStyleAttr('borderWidth', 'borderWidth')"></InputNum>
      </div>
      <div class="form-group" v-else-if="borderRadiusShow">
        <span class="config-title">圆角:</span>
        <InputNum v-model="borderRadius" :step="1" @input="updateStyleAttr('borderRadius', 'borderRadius')"></InputNum>
      </div>
    </div>
    <div class="inner-container" style="padding:0 6px;" v-if="bgImgUrlShow || bgColorShow">
      <template v-if="bgImgUrlShow">
        <ImgUpload :imgUrl="bgImgUrl" @uploadSucc="uploadImgSuccess" @deleteImg="deleteImage"></ImgUpload>
      </template>
      <div class="form-group" v-if="bgColorShow">
        <span class="config-title">颜色:</span>
        <el-color-picker v-model="bgColor" show-alpha @change="updateStyleAttr('bgColor', 'bgColor')" size="mini"></el-color-picker>
        <input type="text" v-model="bgColor" class="tool-input" style="width:168px;" />
      </div>
    </div>
    <!-- <div class="no-data" v-if="no_config_flag">
      <span>暂无配置</span>
    </div> -->
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import InputNum from '~/basePlus/inputNum'
import RadioGroup from '~/basePlus/radioGroup'
import { ELEMENT_POSTION_MAP } from '@/common/const'
import ImgUpload from '~/basePlus/imgUpload'
const STYLE_ATTR_ARR = [
  'position',
  'color',
  'bgColor',
  'fontFamily',
  'fontWeight',
  'letterSpacing',
  'fontSize',
  'borderColor',
  'borderWidth',
  'borderStyle',
  'borderRadius',
  'bgImgUrl',
  'top',
  'left',
  'width',
  'height',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'align',
  'flexDirection',
  'zIndex',
  'order'
]
export default {
  data() {
    return {
      no_config_flag: false,
      borderStyleOptions: [
        { value: 'none', label: '--无--' },
        { value: 'solid', label: '直线' },
        { value: 'dashed', label: '虚线' },
        { value: 'dotted', label: '点状线' },
        { value: 'double', label: '双划线' }
      ],
      fontFamilyOptions: [
        { value: '', label: '默认' },
        { value: 'fzlt', label: '方正兰亭纤黑' },
        { value: 'fzlt_bold', label: '方正兰亭中黑' },
        { value: 'uni_sans_regular', label: 'Uni Sans Regular' },
        { value: 'number', label: 'Number' },
        { value: 'number_light', label: 'Number Light' }
      ],
      fontWeightOptions: [
        { value: 'normal', label: '默认' },
        { value: 'bold', label: 'bold' },
        { value: 'bolder', label: 'bolder' },
      ],
      ...(attrArr => {
        return attrArr.reduce((prevResult, item) => {
          prevResult[`${item}Show`] = false
          prevResult[item] = null
          return prevResult
        }, {})
      })(STYLE_ATTR_ARR)
    }
  },
  props: {
    flag: {
      type: String,
      validator: function(value) {
        return ['container', 'self', 'elem'].indexOf(value) > -1
      }
    },
    flagKey: {
      type: String,
      default: ''
    }
  },
  components: { InputNum, RadioGroup, ImgUpload },
  computed: {
    ...mapState('editor', {
      componentList: state => state.componentList,
      activeComponent: state => state.activeComponent
    }),
    ...mapGetters('editor', {
      propertyName: 'componentPropertyName'
    })
  },
  watch: {
    activeComponent: {
      handler: function(n) {
        this.init(n)
      },
      deep: true,
      immediate: true
    },
    flagKey:{
      handler: function(n) {
        !!n && this.init(this.activeComponent)
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    ...mapMutations('editor', ['changeComponentAttr']),
    init(newActiveComponent){
      if (newActiveComponent !== null && newActiveComponent !== undefined) {
        if (this.flag === 'container') {
          let { containerStyle, containerStyleReNoOper, containerStyleAbNoOper, parentId } = newActiveComponent || {}
          if (containerStyle && Object.keys(containerStyle).length > 0) {
            Object.assign(this, { no_config_flag: false })
          } else {
            Object.assign(this, { no_config_flag: true })
            containerStyle = []
            containerStyleReNoOper = []
            containerStyleAbNoOper = []
          }
          let cotainerPosition = containerStyle['position']
          let containerStyleNoOper = cotainerPosition === ELEMENT_POSTION_MAP.RELATIVE ? containerStyleReNoOper : cotainerPosition === ELEMENT_POSTION_MAP.ABSOLUTE ? containerStyleAbNoOper : []
          STYLE_ATTR_ARR.forEach(item => {
            if (containerStyleNoOper.indexOf(item) < 0 && containerStyle.hasOwnProperty(item)) {
              Object.assign(this, { [item]: containerStyle[item], [`${item}Show`]: true })
            } else {
              Object.assign(this, { [item]: null, [`${item}Show`]: false })
            }
            // 弹窗容器 开放设置
            if(newActiveComponent.tag === 'popup' && (item === 'width' || item === 'height' )){
              Object.assign(this, { [item]: containerStyle[item], [`${item}Show`]: true })
            }
          })
          if (!!parentId) {
            let parentComponent = this.componentList.find(item => item.id === parentId)
            parentComponent && parentComponent['propertyName'] === 'container' && Object.assign(this, { position: containerStyle['position'], positionShow: true })
            Object.assign(this,{ align: null, alignShow: false })
          }
        } else if (this.flag === 'self') {
          let { selfStyle, selfStyleNoOper } = newActiveComponent || {}
          if (selfStyle && Object.keys(selfStyle).length > 0) {
            Object.assign(this, { no_config_flag: false })
          } else {
            Object.assign(this, { no_config_flag: true })
            selfStyle = []
            selfStyleNoOper = []
          }
          STYLE_ATTR_ARR.forEach(item => {
            if (selfStyleNoOper.indexOf(item) < 0 && selfStyle.hasOwnProperty(item)) {
              Object.assign(this, { [item]: selfStyle[item], [`${item}Show`]: true })
            } else {
              Object.assign(this, { [item]: null, [`${item}Show`]: false })
            }
          })
        } else if(this.flag === 'elem'){
          if(!!this.flagKey){
            let { elemConfig, elemStyle } = newActiveComponent || {}
            let keyElemStyle = elemStyle[this.flagKey]
            let keyStyleNoOper = elemConfig[this.flagKey] && elemConfig[this.flagKey]['styleNoOper']
            STYLE_ATTR_ARR.forEach(item => {
              if (keyStyleNoOper && keyStyleNoOper.indexOf(item) < 0 && keyElemStyle.hasOwnProperty(item)) {
                Object.assign(this, { [item]: keyElemStyle[item], [`${item}Show`]: true })
              } else {
                Object.assign(this, { [item]: null, [`${item}Show`]: false })
              }
            })
          }else{
            Object.assign(this,(attrArr => {
              return attrArr.reduce((prevResult, item) => {
                prevResult[`${item}Show`] = false
                prevResult[item] = null
                return prevResult
              }, {})
            })(STYLE_ATTR_ARR),{ no_config_flag: true })
          }
        }
      } else {
        Object.assign(this,(attrArr => {
          return attrArr.reduce((prevResult, item) => {
            prevResult[`${item}Show`] = false
            prevResult[item] = null
            return prevResult
          }, {})
        })(STYLE_ATTR_ARR),{ no_config_flag: true })
      }
    },
    generateUpdateStyleKey(){
      let { flag, flagKey } = this 
      let resultKey = null
      switch(flag){
        case 'container':
          resultKey = 'containerStyle'
          break
         case 'self':
          resultKey = 'selfStyle'
          break
         case 'elem':
          resultKey = `elemStyle.${flagKey}`
          break
        default:
          break
      }
      return resultKey
    },
    updateStyleAttr(attrKey, dataKey) {
      let key = this.generateUpdateStyleKey()
      key && this.changeComponentAttr({ key, newConfig: { [attrKey]: this[dataKey] } })
    },
    deleteImage() {
      Object.assign(this, { bgImgUrl: '' })
      this.updateStyleAttr('bgImgUrl', 'bgImgUrl')
    },
    uploadImgSuccess(url) {
      Object.assign(this, { bgImgUrl: url })
      this.updateStyleAttr('bgImgUrl', 'bgImgUrl')
    },
    onLinkBtnClick(flag) {
      let { width, marginTop, paddingTop, paddingLeft } = this
      let key = this.generateUpdateStyleKey()
      switch (flag) {
        case 'marginTB':
          key && this.changeComponentAttr({ key, newConfig: { marginTop, marginBottom: marginTop } })
          break
        case 'paddingTB':
          key && this.changeComponentAttr({ key, newConfig: { paddingTop, paddingBottom: paddingTop } })
          break
        case 'paddingLR':
          key && this.changeComponentAttr({ key, newConfig: { paddingLeft, paddingRight: paddingLeft } })
          break
        case 'WH':
          key && this.changeComponentAttr({ key, newConfig: { width, height: width } })
          break
        default:
          break
      }
    },
    changePosition(val, oldVal) {
      if (val != oldVal) {
        if (oldVal === 'absolute' && val === 'relative') {
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: { top: 0, left: 0, position: val }
          })
        } else if (oldVal === 'relative' && val === 'absolute') {
          this.changeComponentAttr({
            key: 'containerStyle',
            newConfig: { top: 10, left: 10, position: val }
          })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../../../assets/less/base/mixins.less';
.style-attr-container {
  padding: 6px 8px 12px 8px;
  background-color: #292a2e;
  @import '../../../../../assets/less/pc/tools.less';
  .form-group {
    .link {
      font-size: 12px;
      margin: 0 4px;
      cursor: pointer;
    }
  }
}
</style>
