export const rulesAccount = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
}

export const rulesPhone = {
  phone: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    }
  ],
  veriCode: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
}
