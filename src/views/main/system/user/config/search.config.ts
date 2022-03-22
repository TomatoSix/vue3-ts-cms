import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '100px',
  itemStyle: {
    padding: '10px 20px'
  },
  // colLayout: {
  //   span: 8
  // },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      options: [
        { label: '篮球', value: 'basketball' },
        { label: '足球', value: 'football' }
      ]
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}

// export const formItems: IFormItem[] = [
//   {
//     type: 'input',
//     label: '用户名',
//     placeholder: '请输入用户名'
//   },
//   {
//     type: 'password',
//     label: '密码',
//     placeholder: '请输入密码'
//   },
//   {
//     type: 'select',
//     label: '下拉选项',
//     placeholder: '请选择',
//     options: [
//       { label: '篮球', value: 'lq' },
//       { label: '足球', value: 'zq' },
//       { label: '羽毛球', value: 'ymq' }
//     ]
//   },
//   {
//     type: 'datepicker',
//     label: '日期',
//     otherOptions: {
//       startPlaceholder: '开始时间',
//       endPlaceholder: '结束时间',
//       type: 'daterange'
//     }
//   }
// ]
