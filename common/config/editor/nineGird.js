// 九宫格
export default {
    propertyName: 'nineGird',
    icon: 'turntable',
    tag: 'activity',
    name: '九宫格',
    containerStyle: {
        bgColor: 'rgba(0,0,0,0)',
        width: 375,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        align: 'center',
        marginBottom: 0,
        paddingTop: 0.1,
        paddingBottom: 0.1,
    },
    selfStyle: {
        width: 337,
        height: 344,
        align: 'center',
        marginRight: 0,
        marginTop: 0,
    },
    elemStyle: {
        outerBg: {
            bgImgUrl: 'https://file11info.ppdai.com/82beb0b25e5a405183120f0453ef7e60.png',
        },
        light1: {
            bgImgUrl: 'https://file11info.ppdai.com/c33d0340d38c4052adfd5ab2f2b748a4.png',
        },
        light2: {
            bgImgUrl: 'https://file11info.ppdai.com/0ebaf34bd4eb4d868dbc59e4ec82fed3.png',
        },
        button: {
            bgImgUrl: 'https://file11info.ppdai.com/cbe215608a0245e89dbc843e014aa93d.gif',
            bgColor: 'rgba(0,0,0,0)',
            margin: 'auto',
        },
        awardList: {
            position: 'absolute',
            width: 85,
            height: 82,
        },
        awardImg: {
            width: 66,
            height: 50,
        },
        oppotunityColor: {
            color: '#fff',
        },
        oppotunityCountColor: {
            color: '#FF9663',
        },
    },
    elemConfig: {
        outerBg: {
            title: '背景',
            styleNoOper: [],
        },
        light1: {
            title: '灯1',
            styleNoOper: [],
        },
        light2: {
            title: '灯2',
            styleNoOper: [],
        },
        button: {
            title: '按钮',
            styleNoOper: [],
        },
        oppotunityColor: {
            title: '机会颜色',
            styleNoOper: [],
        },
        oppotunityCountColor: {
            title: '剩余次数颜色',
            styleNoOper: [],
        },
        awardList: {
            title: '奖品区块',
            styleNoOper: [],
        },
        awardImg: {
            title: '奖品图片',
            styleNoOper: [],
        },
    },
    containerStyleReNoOper: ['width', 'left', 'top', 'position', 'marginTop'],
    selfStyleNoOper: [],
    property: {
        list: [
            {
                name: `奖品1名称`,
                url: 'https://maumkt.ppdaicdn.com/mktop/creditsexchange/pic/shouji.png',
                type: '',
            },
            {
                name: `奖品2名称`,
                url: 'https://maumkt.ppdaicdn.com/mktop/creditsexchange/pic/shouji.png',
                type: '',
            },
            {
                name: `奖品3名称`,
                url: 'https://maumkt.ppdaicdn.com/mktop/creditsexchange/pic/shouji.png',
                type: '',
            },
            {
                name: `奖品4名称`,
                url: 'https://maumkt.ppdaicdn.com/mktop/creditsexchange/pic/shouji.png',
                type: '',
            },
            {
                name: `奖品5名称`,
                url: 'https://maumkt.ppdaicdn.com/mktop/creditsexchange/pic/shouji.png',
                type: '',
            },
            {
                name: `奖品6名称`,
                url: 'https://maumkt.ppdaicdn.com/mktop/creditsexchange/pic/shouji.png',
                type: '',
            },
            {
                name: `奖品7名称`,
                url: 'https://maumkt.ppdaicdn.com/mktop/creditsexchange/pic/shouji.png',
                type: '',
            },
            {
                name: `奖品8名称`,
                url: 'https://maumkt.ppdaicdn.com/mktop/creditsexchange/pic/shouji.png',
                type: '',
            },
        ],
        opportunitySwitch: true,
    },
};
