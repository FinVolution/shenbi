import { Y } from '../common/const'
import debounce from './debounce'
let dragDebounce = null
export default function(element, containerElement, options) {
  const moveFn = function(event) {
    event.stopPropagation() // 防止组件拖动的时候下一层组件事件穿透
    let { drag, param = {} } = options
    if (drag) {
      if (dragDebounce) {
        dragDebounce(event, param)
      } else {
        dragDebounce = debounce(options.drag, 5, true)
        dragDebounce(event, param)
      }
    }
  }
  const downFn = function(event) {
    event.stopPropagation()
    let { start, param = {} } = options
    start && start(event, param)
  }
  const upFn = function(event) {
    containerElement.removeEventListener('mousedown', downFn)
    containerElement.removeEventListener('mousemove', moveFn)
    containerElement.removeEventListener('mouseup', upFn)
    containerElement.ondragstart = null
    dragDebounce = null
    let { end, param = {} } = options
    end && end(event, param)
  }
  let datasetObj = element.dataset
  if (datasetObj['hasBindDrag'] === Y) {
    return true
  } else {
    datasetObj['hasBindDrag'] = Y
    element.addEventListener('mousedown', event => {
      // 2 右键 去除掉 0左键 1中间键
      if(event.button !== 2){
        if (options.stop && options.stop(event, element) === false) {
          return false
        }
        containerElement.ondragstart = function() {
          return false
        }
        containerElement.addEventListener('mousedown', downFn)
        containerElement.addEventListener('mousemove', moveFn)
        containerElement.addEventListener('mouseup', upFn)
      }
      
    })
  }
}
