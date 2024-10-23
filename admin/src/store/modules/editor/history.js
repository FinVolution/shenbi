import { uuid } from '@/utils'
const HISTORY_LENGTH = 300
let steps = []

const getStepActiveIndex = () => {
  let activeIndex = -1
  steps.length > 0 &&
    steps.find((item, index) => {
      if (item['active']) {
        activeIndex = index
        return true
      }
      return false
    })
  return activeIndex
}

export const pushStep = state => {
  let activeIndex = getStepActiveIndex()
  if (activeIndex > -1 && activeIndex < steps.length - 1) {
    steps = steps.slice(0, activeIndex + 1)
  }
  activeIndex > -1 && (steps[activeIndex]['active'] = false)
  steps.push({ id: uuid(16), active: true, data: JSON.stringify(state) })
  steps.length >= HISTORY_LENGTH && steps.shift()
  return { hasPrev: steps.length > 1, hasNext: false }
}

export const prevStep = () => {
  let activeIndex = getStepActiveIndex()
  if (activeIndex > 0) {
    let prevItem = steps[activeIndex - 1]
    steps[activeIndex]['active'] = false
    prevItem['active'] = true
    console.log({steps,activeIndex})
    return { state: JSON.parse(prevItem['data']), hasPrev: activeIndex > 1, hasNext: true }
  }
  return false
}

export const nextStep = () => {
  let activeIndex = getStepActiveIndex()
  if (activeIndex >= 0 && activeIndex < steps.length - 1) {
    steps[activeIndex]['active'] = false
    let nextItem = steps[activeIndex + 1]
    nextItem['active'] = true
    console.log({steps,activeIndex})
    return { state: JSON.parse(nextItem['data']), hasPrev: true, hasNext: activeIndex + 1 < steps.length - 1 }
  }
  return false
}

export const clearStep = () => {
  steps = []
  return { hasPrev: false, hasNext: false }
}