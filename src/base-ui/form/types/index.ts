type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  // form表单组件类型
  field: string
  type: IFormType
  label: string
  placeholder?: any
  rules?: any[]
  // 下拉框选项类型
  options?: any[]
  // 日期选择器
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
