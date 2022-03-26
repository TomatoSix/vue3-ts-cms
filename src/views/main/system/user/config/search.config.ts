import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '100px',
  itemStyle: {
    padding: '10px 10px'
  },
  // colLayout: {
  //   span: 6
  // },
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      field: 'createAt',
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
