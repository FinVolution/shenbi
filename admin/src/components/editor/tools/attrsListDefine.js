
// 每个组件所需要引入的属性配置列表
const attrMap = {
    text: {
        componentList: [
            {
                name: 'inputString',
                attrs: {
                }
            }
        ]
    },
    button: {
        componentList: [
            {
                name: 'button',
                attrs: {
                }
            }
        ]
    },
    richtext: {
        componentList: [
            {
                name: 'richtext',
                attrs: {
                }
            },
        ]
    },
    image: {
        componentList: [
            {
                name: 'imageAttr',
                attrs: {}
            },
            {
                name: 'imageAnimationAttr',
                attrs: {
                    propertyName: 'image'
                }
            },
        ]
    },
    commonMarquee: {
        componentList: [
            {
                name: 'buttonImageAttr',
                attrs: {}
            }
        ]
    },
    buttonImage: {
        componentList: [
            {
                name: 'buttonImageAttr',
                attrs: {}
            },
            {
                name: 'imageAnimationAttr',
                attrs: {
                    propertyName: 'image'
                }
            },
        ]
    },
    nineGird: {
        componentList: [
            {
                name: 'nineGird',
                attrs: {}
            },
        ]
    },
    copyright: {
        componentList: [
            {
                name: 'copyright',
                attrs: {}
            },
        ]
    },

    rcAwardCard: {
        componentList: [
            {
                name: 'awardCard',
                attrs: {}
            },
        ]
    },
    rcParticipationCard: {
        componentList: [
            {
                name: 'participationCard',
                attrs: {}
            },
        ]
    },
    o2oLogin: {
        componentList: [
            {
                name: 'o2oLogin',
                attrs: {}
            },
        ]
    },
    swiperBySelf: {
        componentList: [
            {
                name: 'swiperBySelf',
                attrs: {}
            },
        ]
    },
}

// 具体组件引用
const componentsMap = {
    inputString: () => import('~/basePlus/inputString'),
    button: () => import('~/editor/attr/button'),
    imageAttr: () => import('~/editor/attr/ImageAttr'),
    buttonImageAttr: () => import('~/editor/attr/ButtonImageAttr'),
    nineGird: () => import('~/editor/attr/nineGird'),
    copyright: () => import('~/editor/attr/activity/regularCustomer/copyright'),
    awardCard: () => import('~/editor/attr/activity/regularCustomer/awardCard'),
    participationCard: () => import('~/editor/attr/activity/regularCustomer/participationCard'),
    richtext: () => import('~/editor/attr/richtext/index'),
    o2oLogin: () => import('~/editor/attr/o2oLogin'),
    swiperBySelf: () => import('~/editor/attr/swiperBySelf'),
}
export { componentsMap, attrMap }
