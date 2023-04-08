

export const rules = {
    user: {
      login: {
        required: true,
        message: 'Введите логин',
        trigger: ['input', 'blur']
      },
      password: {
        required: true,
        message: 'Введите пароль',
        trigger: ['input', 'blur']
      },
      name: {
        required: true,
        message: 'Введите имя',
        trigger: ['input', 'blur']
      },
      surname: {
        required: true,
        message: 'Введите фамилию',
        trigger: ['input', 'blur']
      },
      middle: {
        required: true,
        message: 'Введите отчество',
        trigger: ['input', 'blur']
      },
      birth: {
        required: true,
        type: "number",
        message: 'Введите дату рождения',
        trigger: ['input', 'blur']
      },
      place: {
        required: true,
        message: 'Введите место рождения',
        trigger: ['input', 'blur']
      },
      familyStatus: {
        required: true,
        type: "boolean",
        message: 'Выберите один из вариантов',
        trigger: ['input', 'blur']
      },
      children: {
        required: true,
        type: "boolean",
        message: 'Выберите один из вариантов',
        trigger: ['input', 'blur']
      },
      addressReg: {
        required: true,
        message: 'Введите адрес регистрации',
        trigger: ['input', 'blur']
      },
      addressFact: {
        required: true,
        message: 'Введите адрес проживания',
        trigger: ['input', 'blur']
      },
    },
    contacts: {
      mobileNumber: {
        required: true,
        message: 'Введите мобильный номер телефона',
        trigger: ['input', 'blur']
      },
      homeNumber: {
        required: true,
        message: 'Введите домашний номер телефона',
        trigger: ['input', 'blur']
      },
      email: {
        required: true,
        message: 'Введите почту',
        trigger: ['input', 'blur']
      }
    },
    direction: {
      goal: {
        required: true,
        message: 'Введите цель обращения',
        trigger: ['input', 'blur']
      },
      dateRange: {
        required: true,
        type: "array",
        message: 'Введите сроки практики',
        trigger: ['input', 'blur']
      },
      region: {
        required: true,
        message: 'Выберите регион',
        trigger: ['input', 'blur']
      },
      repeat: {
        required: true,
        type: 'boolean',
        message: 'Выберите один из вариантов',
        trigger: ['input', 'blur']
      }
    }
  }
  
  export const goalOptions = [
    {
      label: "Практика",
      value: 'practice'
    },
    {
      label: "Обучение/Стажировка",
      value: 'study'
    },
    {
      label: "Работа",
      value: 'work'
    },
  ]

  export const regionOptions = [
    {
      label: "Ростовская область",
      value: 'rnd'
    },
    {
      label: "Краснодарский край",
      value: 'krasnodar'
    },
    {
      label: "Ставропольский край",
      value: 'stavropol'
    },
    {
      label: "Волгоградская область",
      value: 'volgograd'
    },
    {
      label: "Москва",
      value: 'msk'
    },
    {
      label: "Нижний Новгород",
      value: 'nn'
    }
  ]