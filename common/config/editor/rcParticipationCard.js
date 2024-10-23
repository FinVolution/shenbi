// 参与状态栏位
export default {
    propertyName: 'rcParticipationCard',
    icon: 'turntable',
    tag: 'activity',
    name: '参与状态栏位',
    containerStyle: {
        bgColor: 'rgba(245, 248, 250, 0)',
        width: 375,
        align: 'center',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom:0,
        paddingTop: 0.1,
        paddingBottom: 0.1,
    },
    selfStyle: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 8,
    },
    elemStyle: {
        redBigBg: {
            bgImgUrl: 'https://maumkt.ppdaicdn.com/acp/uploadImages/1726210560541.png',
        },
        redSmallBg: {
            bgImgUrl: 'https://maumkt.ppdaicdn.com/22total_loan/red_card_small.png',
        },
        redWordBefore: {
            bgImgUrl: 'https://maumkt.ppdaicdn.com/acp/uploadImages/1726211222001.png',
        },
        redWordAfter: {
            bgImgUrl: 'https://maumkt.ppdaicdn.com/22total_loan/red_word_after.png',
        },
        redWord: {
            bgImgUrl: 'https://maumkt.ppdaicdn.com/acp/uploadImages/1726209512654.png'
        },
        redTag: {
            bgImgUrl: 'https://maumkt.ppdaicdn.com/22total_loan/red_tag.png'
        }
    
    },
    elemConfig: {
        redBigBg: {
            title: '领取奖品大背景',
            styleNoOper: [],
        },
        redSmallBg: {
            title: '领取奖品小背景',
            styleNoOper: [],
        },
        redWordBefore: {
            title: 'xx满',
            styleNoOper: [],
        },
        redWordAfter: {
            title: '100%领好礼',
            styleNoOper: [],
        },
        redWord: {
            title: '完成任务好礼描述',
            styleNoOper: [],
        },
        redTag: {
            title: '距离领取好礼标签',
            styleNoOper: [],
        },
    },
    containerStyleReNoOper: [],
    selfStyleNoOper: [],
    property: {
        switchOldVersion: true, //切换老版本ui
    },
};
