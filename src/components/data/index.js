const FormInfo = {
  ref: null,
  data: {
    name: null,
    age: null,
    time: null,
    address: null,
    zip: null,
    daterange: [],
    sex: 1,
    step: null,
  },
  fieldList: [
    { label: '姓名', type: 'input', value: 'name' },
    { label: '年龄', type: 'input', value: 'age', maxlength: 3 },
    { label: '日期', type: 'date', value: 'time' },
    { label: '地址', type: 'input', value: 'address' },
    { label: '邮编', type: 'input', value: 'zip' },
    { label: '日期区间', type: 'date', value: 'daterange', dateType: 'daterange', },
    { label: '计步器', type: 'inputNumber', value: 'step', min: 1, max: 10, },
    { label: '性别', type: 'select', value: 'sex', list: 'sexList', disabled: true },
  ],
  rules: {
    name: [{required: true, message: '请输入姓名', trigger: ['blur', 'change']}],
    age: [{required: true, message: '请输入年龄', trigger: ['blur', 'change']}],
  },
};

export {
  FormInfo
}