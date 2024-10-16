import * as Yup from 'yup'

// Yup Option
Yup.setLocale({
  mixed: {
    default: 'ورودی نامعتبر است',
    required: 'لطفا این قسمت را خالی نگذارید',
  },
  string: {
    email: 'ایمیل وارد شده نامعتبر است',
    // eslint-disable-next-line no-template-curly-in-string
    min: ' حداقل مقدار ${path} ${min} است',
    // eslint-disable-next-line no-template-curly-in-string
    max: ' حداقل مقدار ${path} ${max} است',
    url: 'لینک وارد شده نامعتبر است',
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    min: ' حداقل مقدار ${path} ${min} است',
  },
})

function trimWhitespaceTransformer(value: any, originalValue: any) {
  if (typeof originalValue === 'string')
    return originalValue.trim() // Trim whitespace from string values

  return originalValue // Return original value for non-string values
}

// Schemas
export const schemaUsername = Yup.object().shape({
  username: Yup.string()
    .required()
    .test('username', 'شماره موبایل و یا ایمیل نامعتبر است', validateUsername),
})
export const schemaAuthenticatePassword = Yup.object().shape({
  password: Yup.string().required(),
})
export const schemaSetNewPassword = Yup.object().shape({
  password: Yup.string().required().test('password', '', validatePassword),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password')],
    'کلمه های عبور یکسان نیستند',
  ),
})

export const schemaFullname = Yup.object().shape({
  first_name: Yup.string().required().transform(trimWhitespaceTransformer),
  last_name: Yup.string().required().transform(trimWhitespaceTransformer),
})
export const schemaNationalcode = Yup.object().shape({
  national_code: Yup.string()
    .required()
    .test('national_code', 'کد ملی نامعتبر است', validateNationalCode),
})
export const schemaPhoneNumber = Yup.object().shape({
  phone: Yup.string()
    .required()
    .test('phone', 'شماره موبایل نامعتبر است', validatePhoneNumber),
})
export const schemaEmail = Yup.object().shape({
  email: Yup.string()
    .required()
    .test('email', 'ایمیل نامعتبر است', validateEmail),
})
export const schemaChangePassword = Yup.object().shape({
  password: Yup.string().required().test('password', '', validatePassword),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password')],
    'کلمه های عبور یکسان نیستند',
  ),
})
