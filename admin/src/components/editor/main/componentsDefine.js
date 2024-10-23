const componentsMap = {
    text: () => import('$root/common/foundation/text'),
    button: () => import('$root/common/foundation/button'),
    richtext: () => import('$root/common/foundation/richtext'),
    benefit: () => import('$root/common/foundation/benefit'),
    image: () => import('$root/common/foundation/image'),
    buttonImage: () => import('$root/common/foundation/buttonImage'),
    swiperBySelf: () => import('$root/common/foundation/swiperBySelf'),
    nineGird: () => import('$root/common/activity/nineGird'),
    rcMarquee: () => import('$root/common/activity/regularCustomer/marquee'),
    rcAwardCard: () => import('$root/common/activity/regularCustomer/awardCard'),
    rcParticipationCard: () => import('$root/common/activity/regularCustomer/participationCard'),
    copyright: () => import('$root/common/activity/regularCustomer/copyright.vue'),
    o2oLogin: () => import('$root/common/o2o/login'),
}
export { componentsMap }
