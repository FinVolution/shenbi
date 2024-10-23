// 注册登录组件
export default {
    propertyName: 'o2oLogin',
    icon: 'turntable',
    tag: 'o2o',
    name: '注册模块',
    containerStyle: {
        bgColor: '#f5f8fa',
        width: 375,
        height: 420,
        align: 'center',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom:0,
        paddingTop: 0.1,
        paddingBottom: 0.1,
        flexDirection: 'column',
    },
    selfStyle: {
        width: 340,
        bgColor: '#ffffff',
        height: 420,
        //align: 'center',
        // flexDirection: 'column',
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0.1,
        paddingBottom: 0.1,
    },
    elemStyle: {
        protocal: {
            color: '#3a90c2',
            letterSpacing:0,
            fontFamily: "",
            fontSize:12,
            fontWeight:'',
            marginTop:0,
        },
        commitBtn: {
            bgImgUrl: 'linear-gradient(108deg, #5bbceb 0%, #25a1da 100%)',
            marginTop:0,
        },
        protocalLink: {
            color: '#3a90c2',
            letterSpacing:0,
            fontFamily: "",
            fontSize:12,
            fontWeight:''
        },
        protocalIcon: {
            bgImgUrl: 'https://maumkt.ppdaicdn.com/acp/o2o/icon_choosed.png'
        },
        mainTheme: {
            color: '#3a90c2',
        },
        msgColor: {
            bgColor: '#3a90c2',
        },
    },
    elemConfig: {
        mainTheme: {
            title: '主色调配置',
            styleNoOper: []
        },
        msgColor:{
            title: '验证码颜色',
            styleNoOper: []
        },
        commitBtn: {
            title: '按钮配置',
            styleNoOper: []
        },
        protocal: {
            title: '协议配置',
            styleNoOper: []
        },
        protocalLink: {
            title: '协议链接配置',
            styleNoOper: []
        },
        protocalIcon: {
            title: '协议选择icon',
            styleNoOper: []
        }
    },
    containerStyleReNoOper: ['width', 'left', 'top', 'position', 'marginTop'],
    selfStyleNoOper: [],
    property: {
        switchSubstep: false,
        switchOldVersion: false, //切换老版本ui
        retainPopAvailable: false, //是否开启挽留弹窗
        protocalText: '《用户服务协议》',
        protocalLinkUrl: '',
        loginRedirectUrl:'',
        reigsterRedirectUrl:'',
        applyButtonText: '立即申请',
        applyInfoForm:[
            {
                data: null,
                hint: "请输入姓名",
                inputType: "text",
                key: "applyName",
                maxLength: 10,
                maxValue: "",
                minLength: 1,
                minValue: "",
                modify: true,
                name: "姓名",
                reg: "",
                required: true,
                type: "textInput",
                unit: "",
                desensitization: false,
                isHidden: false,
                defaultValue: ''
            },
            {
                data: null,
                hint: "请输入手机号",
                inputType: "tel",
                key: "phone",
                maxLength: 11,
                maxValue: "",
                minLength: 11,
                minValue: "",
                modify: true,
                name: "手机号",
                reg: "(^[0-9]{3,4}[0-9]{7,8}$)|(^[0-9]{3,4}\\-[0-9]{7,8}$)|(^1[34578][0-9]{9}$)",
                required: true,
                type: "textInput",
                unit: "",
                desensitization: false,
                isHidden: false,
                defaultValue: ''
            },
            {
                data: null,
                hint: "请选择房产所在地",
                inputType: "",
                key: "city",
                maxLength: 100,
                maxValue: "",
                minLength: 1,
                minValue: "",
                modify: true,
                name: "城市",
                reg: "",
                required: true,
                type: "address",
                unit: "",
                configCities: [],
                needConfigCity: 0,
                desensitization: false,
                isHidden: false,
                cityCode: '',
                provinceCode: '',
                city: '',
                province: '',
                defaultValue: ''
            }
        ],
    }
}