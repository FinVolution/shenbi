export const applyInfoForm = [
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
        name: "房产所在地",
        reg: "",
        required: true,
        type: "address",
        unit: "",
    }
]

export const business = 'house';
