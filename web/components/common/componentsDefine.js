const componentsMap = {
    text: () => import('../../../common/foundation/text'),
    benefit: () => import('../../../common/foundation/benefit'),
    swiperBySelf: () => import('@/components/foundation/swiperBySelf.vue'),
    copyright: () => import('../../../common/activity/regularCustomer/copyright.vue'),
    richtext: () =>  import('../../../common/foundation/richtext'),
    image: () => import('@/components/foundation/image'),
    buttonImage: () => import('@/components/foundation/buttonImage'),
    button: () =>  import('@/components/foundation/button'),
    nineGird: () => import('@/components/activity/nineGird'),
    rcMarquee: () => import('@/components/activity/regularCustomer/marquee'),
    rcAwardCard: () => import('@/components/activity/regularCustomer/awardCard'),
    rcParticipationCard: () => import('@/components/activity/regularCustomer/participationCard'),
}   
export { componentsMap }
