//新增“额外字号”菜单
import E from "wangeditor"

const {$, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip} = E

export default class insertFontSize extends DropListMenu {
  constructor(editor) {
    const $elem = $('<div class="w-e-menu" data-title="额外字号"><i class="el-icon-edit-outline"></i></div>')
    // droplist 配置
    const dropListConf = {
      width: 100,
      title: '设置额外字号',
      type: 'list',
      list: [
        {
          $elem: $(`<i class="w-e-drop-list-item" style="font-size:20px;font-style: normal;">12px</i>`),
          value: '12px'
        },
        {
          $elem: $(`<i class="w-e-drop-list-item" style="font-size:22px;font-style: normal;">20px</i>`),
          value: '20px'
        },
        {
          $elem: $(`<i class="w-e-drop-list-item" style="font-size:26px;font-style: normal;">22px</i>`),
          value: '22px'
        },
        {
          $elem: $(`<i class="w-e-drop-list-item" style="font-size:26px;font-style: normal;">26px</i>`),
          value: '26px'
        },
        {
          $elem: $(`<i class="w-e-drop-list-item" style="font-size:28px;font-style: normal;">28px</i>`),
          value: '28px'
        },
        {
            $elem: $(`<i class="w-e-drop-list-item" style="font-size:28px;font-style: normal;">30px</i>`),
            value: '30px'
        },
        {
            $elem: $(`<i class="w-e-drop-list-item" style="font-size:28px;font-style: normal;">40px</i>`),
            value: '40px'
        },
      ],
      // droplist 每个 item 的点击事件
      clickHandler: (value) => {
        // value 参数即 dropListConf.list 中配置的 value
        this.command(value)
      },
    }
    super($elem, editor, dropListConf)
  }


  command(value) {
    //获取到选中的文本
    let selectedText = this.editor.selection.getSelectionText();

    //拼接css样式
    let newValue = `<span style='font-size:${value}'>${selectedText}</span>`
    
    // insertHTML在插入点插入一个HTML字符串（删除选中的部分）。需要一个个HTML字符串作为参数。(IE浏览器不支持)
    this.editor.cmd.do('insertHTML', newValue)
  }

  // 菜单激活状态
  tryChangeActive() {
    const reg = /font-size/g

    //获取当前选区所在的 DOM 节点内容
    const selectedElementText = this.editor.selection.getSelectionContainerElem().elems[0].outerHTML

    if (reg.test(selectedElementText)) {
      // 选区包含有font-size，激活菜单
      this.active()
    } else {
      // 否则，取消激活
      this.unActive()
    }
  }
}