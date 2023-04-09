import moment from 'moment'

export const rules = {
    user: {
      login: {
        required: true,
        message: 'Введите логин',
        trigger: ['input', 'blur']
      },
      password: {
        required: true,
        message: 'Введите пароль'
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
      childrenDesc: {
        required: true,
        message: 'Введите количество и возраст детей',
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
      },
      result: {
        required: true,
        message: 'Введите результат',
        trigger: ['input', 'blur']
      },
      wantWork: {
        required: true,
        type: 'boolean',
        message: 'Выберите один из вариантов',
        trigger: ['input', 'blur']
      },
      expectations: {
        required: true,
        message: 'Заполните поле описания',
        trigger: ['input', 'blur']
      },
      relocation: {
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

export const worksOptions = [
  {
    label: "Пока не определился(-лась)",
    value: 'notSure'
  },
  {
    label: "Управление розничного кредитования",
    value: 'credit'
  },
  {
    label: "Управление пластиковых карт",
    value: 'card'
  },
  {
    label: "Отдел кредитования малого и среднего бизнеса",
    value: 'business-credit'
  },
  {
    label: "Бухгалтерия",
    value: 'accounting'
  },
  {
    label: "Департамент информационных технологий",
    value: 'it'
  },
  {
    label: "Отдел учета и мониторинга",
    value: 'monitoring'
  },
  {
    label: "Пресс-служба",
    value: 'press'
  },
  {
    label: "Центр Финансовой Грамотности",
    value: 'finCenter'
  },
  {
    label: "Контакт-Центр",
    value: 'call'
  }
]

export const serialize = (data) => {
  const user = data.user
  const contacts = data.contacts
  const direction = data.direction
  const fio = `${user.surname} ${user.name} ${user.middle}` 
  
  return {
    "fio": fio,
    "birthDate": moment(user.birth).format('DD.MM.YYYY'),
    "birthPlace": user.place,
    "familyStatus": user.familyStatus ? 'Холост/Не замужем' : 'Женат/Замужем',
    "hasChildren": user.children,
    "countChildren": user.childrenDesc,
    "regAddress": user.addressReg,
    "liveAddress": user.addressFact,
    "phone": contacts.mobileNumber,
    "homePhone": contacts.homeNumber,
    "email": contacts.email,
    "target": direction.goal,
    "startPracticeDate": moment(direction.dateRange[0]).format('DD.MM.YYYY'),
    "endPracticeDate": moment(direction.dateRange[1]).format('DD.MM.YYYY'),
    "stagePlace": direction.region,
    "wantWorkInBank": direction.wantWork,
    "workTrack": direction.workType.map(el => worksOptions.find(m => m.value === el).label),
    "expectations": direction.expectations,
    "changeCity": direction.relocation,
    "sendEarly": direction.repeat,
    "username": user.login,
    "password": user.password
  }
}

export const userSerialize = (data) => {
  const fio = data.fio.split(' ')
  return {
    auth: true,
    user: {
      login: '',
      password: '',
      reenteredPassword: '',
      name: fio[1],
      surname: fio[0],
      middle: fio[2],
      birth: Date.now(),
      place: data.birthPlace,
      familyStatus: data.familyStatus === 'Холост/Не замужем',
      children: data.hasChildren,
      addressReg: data.regAddress,
      addressFact: data.liveAddress,
      childrenDesc: data.countChildren
    },
    contacts: {
      mobileNumber: data.phone,
      homeNumber: data.homePhone,
      email: data.email
    },
    direction: {
      goal: data.target,
      dateRange: [Date.now(), Date.now()],
      region: data.stagePlace,
      repeat: data.sendEarly,
      result: data.earlyResult,
      wantWork: data.wantWorkInBank,
      workType: [],
      expectations: data.expectations,
      relocation: data.changeCity
    }
  }
}