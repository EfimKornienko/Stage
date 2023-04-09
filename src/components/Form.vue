<script setup>
  import { ref, watch, onMounted } from 'vue'
  import { rules, goalOptions, regionOptions, worksOptions, serialize, userSerialize } from './form/utils'
  import { GlassesOutline, Glasses } from '@vicons/ionicons5'
  import { db } from '../database'
  import { useRouter, useRoute } from 'vue-router'

  components: {
    GlassesOutline,
    Glasses
  }
  
  const router = useRouter()
  const route = useRoute()

  const formRef = ref(null)
  const addressCheck = ref(false)
  const rPasswordFormItemRef = ref(null)
  
  const formValue = ref({
    auth: false,
    user: {
      login: '',
      password: '',
      reenteredPassword: '',
      name: '',
      surname: '',
      middle: '',
      birth: null,
      place: '',
      familyStatus: null,
      children: null,
      addressReg: '',
      addressFact: '',
      childrenDesc: ''
    },
    contacts: {
      mobileNumber: '',
      homeNumber: '',
      email: ''
    },
    direction: {
      goal: 'practice',
      dateRange: [Date.now(), Date.now()],
      region: 'rnd',
      repeat: null,
      result: '',
      wantWork: true,
      workType: [],
      expectations: '',
      relocation: false
    }
  })

  watch(addressCheck, val => {
    const user = formValue.value.user
    if(val) user.addressFact = user.addressReg
  })

  watch(formValue.value.user, val => {
    if(val.addressFact !== val.addressReg) addressCheck.value = false
  })

  const handlePasswordInput =  () => {
    if (formValue.value.user.reenteredPassword) {
      rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
    }
  }

  function validatePasswordStartWith(rule, value) {
    const state = formValue.value.user
    return !!state.password && state.password.startsWith(value) && state.password.length >= value.length
  }
  function validatePasswordSame(rule, value) {
    return value === formValue.value.user.password
  }

  const autoCompleteForm = () => {
    formValue.value = {
      user: {
        login: '',
        password: '',
        reenteredPassword: '',
        name: 'Иван',
        surname: 'Иванов',
        middle: 'Иванович',
        birth: Date.now(),
        place: 'Ростов-на-Дону',
        familyStatus: true,
        children: true,
        addressReg: 'Парк Горького',
        addressFact: 'Парк Горького',
        childrenDesc: '2 сына 2 дочки всем 0 лет'
      },
      contacts: {
        mobileNumber: '88005553535',
        homeNumber: '123-45-67',
        email: ''
      },
      direction: {
        goal: 'practice',
        dateRange: [Date.now(), Date.now()],
        region: 'rnd',
        repeat: true,
        result: 'Все плохо',
        wantWork: true,
        workType: ['notSure', 'credit', 'card', 'it'],
        expectations: 'Хочу работать',
        relocation: false
      }
    }
  }

  const onCompleteForm = async () => {
    // 'https://5866-37-145-229-55.ngrok-free.app/'
    const url = 'http://p0var.ru/' + 'api/forms/first'
    await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      // Authorization: Bearer YWxhZGRpbjpvcGVuc2VzYW1l
      body: JSON.stringify(serialize(formValue.value))
    })
      .then(resp => resp.json())
      .then(data => {
        db.jwt.put({
          user: 'token',
          jwt: data.token,
          role: "USER"
        }).then(() => {
          router.push({name: 'Test', params: {tab: route.params.tab}})
        })
      })
  }

  const handleValidateClick = (e) => {
    e.preventDefault()
    formRef.value?.validate((errors) => {
      if(!errors) {
        onCompleteForm()
      }
    })
  }

  const setAuth = (val) => {
    formValue.auth = val
    if(val) {
      fetch(`http://p0var.ru/api/user/info/${route.params.user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(resp => resp.json())
        .then(data => {
          formValue.value =  userSerialize(data)
        })
    }
  }

  onMounted(() => {
    setAuth(!!route.params.user)
  })

</script>

<template>
  <div class="form-page">
    <n-form
      class="form"
      ref="formRef"
      inline
      :label-width="80"
      :model="formValue"
      :rules="{
        ...rules,
        user: {
          ...rules.user,
          reenteredPassword: [
            {
              required: true,
              message: 'Введите пароль',
              trigger: ['input', 'blur']
            },
            {
              validator: validatePasswordStartWith,
              message: 'Введите одинаковые пароли',
              trigger: ['input']
            },
            {
              validator: validatePasswordSame,
              message: 'Введите одинаковые пароли',
              trigger: ['blur', 'password-input']
            }
          ]
        }
      }"
    >
      <div 
        v-if="!formValue.auth"
        class="block"
      >
        <div class="main-header">
          <h2>Учетные данные</h2>
          <n-button
            type="success"
            strong 
            secondary
            @click="autoCompleteForm"
          >
            Автозаполнение данных
          </n-button>
        </div>
        <div class="item">
          <n-form-item 
            label="Логин" 
            path="user.login" 
            size="large"
          >
            <n-input v-model:value="formValue.user.login" placeholder="Введите логин" />
          </n-form-item>
          <n-form-item path="user.password" label="Пароль" size="large">
            <n-input
              v-model:value="formValue.user.password"
              type="password"
              placeholder="Введите пароль"
              @input="handlePasswordInput"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item
            ref="rPasswordFormItemRef"
            first
            path="user.reenteredPassword"
            label="Повторите пароль"
            size="large"
          >
            <n-input
              v-model:value="formValue.user.reenteredPassword"
              :disabled="!formValue.user.password"
              type="password"
              placeholder="Повторите пароль"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item 
            label="Электронная почта" 
            path="contacts.email"
            size="large"  
            :style="{ width: '350px' }"
          >
            <n-input 
              type="tel"
              v-model:value="formValue.contacts.email" 
              placeholder="Введите эл.почту" 
            />
          </n-form-item>
        </div>
      </div>
      <div class="block">
        <h2>Личные данные</h2>
        <div class="item">
          <n-form-item 
            label="Фамилия" 
            path="user.surname" 
            size="large"
          >
            <n-input v-model:value="formValue.user.surname" placeholder="Введите фамилию" />
          </n-form-item>
          <n-form-item 
            label="Имя" 
            path="user.name"
            size="large" 
          >
            <n-input v-model:value="formValue.user.name" placeholder="Введите имя" />
          </n-form-item>
          <n-form-item 
            label="Отчество" 
            path="user.middle"
            size="large"   
          >
            <n-input v-model:value="formValue.user.middle" placeholder="Введите отчество" />
          </n-form-item>
          <n-form-item 
            label="Дата рождения" 
            path="user.birth"
            size="large" 
          >
            <n-date-picker 
              v-model:value="formValue.user.birth" 
              type="date" 
              format="dd.MM.yyyy"
              placeholder="Введите дату рождения"
            />
          </n-form-item>
          <n-form-item 
            label="Место рождения" 
            path="user.place"
            size="large"  
            :style="{ width: '350px' }"
          >
            <n-input v-model:value="formValue.user.place" placeholder="Введите место рождения" />
          </n-form-item>
        </div>
        <div class="item">
          <n-form-item 
            label="Семейное положение" 
            path="user.familyStatus"
            size="large"
          > 
            <n-space>
              <n-radio-group v-model:value="formValue.user.familyStatus" name="radiogroup">
                <n-space>
                  <n-radio :value="true">
                    Холост/Не замужем
                  </n-radio>
                  <n-radio :value="false">
                    Женат/Замужем
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-space>
          </n-form-item>
          <n-form-item 
            label="Дети" 
            path="user.children"
            size="large"
          > 
            <n-space>
              <n-radio-group v-model:value="formValue.user.children" name="radiogroup">
                <n-space>
                  <n-radio :value="true">
                    Есть
                  </n-radio>
                  <n-radio :value="false">
                    Нет
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-space>
          </n-form-item>
          <n-form-item 
            v-if="formValue.user.children"
            label="Укажите количество детей и их возраст" 
            path="user.childrenDesc"
            size="large"
            :style="{ width: '350px' }"
          > 
            <n-input 
              v-model:value="formValue.user.childrenDesc" 
              placeholder="Введите количество и возраст детей" 
            />
          </n-form-item>
        </div>
        <div class="item">
          <n-form-item 
            label="Адрес регистрации" 
            path="user.addressReg"
            size="large"  
            :style="{ width: '350px' }"
          >
            <n-input 
              v-model:value="formValue.user.addressReg" 
              placeholder="Введите адрес регистрации" 
            />
          </n-form-item>
          <div class="with-info">
            <n-form-item 
              label="Адрес проживания" 
              path="user.addressFact"
              size="large"  
              :style="{ width: '350px' }"
            >
              <n-input 
                v-model:value="formValue.user.addressFact" 
                placeholder="Введите адрес проживания" 
              />
            </n-form-item>
            <div class="info">
              <span>Обязательно укажите город, улицу, номер дома, квартиру</span>
              <n-checkbox v-model:checked="addressCheck">
                Совпадает с адресом регистрации
              </n-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <h2>Контактные данные</h2>
        <div class="item">
          <n-form-item 
            label="Мобильный телефон" 
            path="contacts.mobileNumber"
            size="large"  
            :style="{ width: '350px' }"
          >
            <n-input 
              type="tel"
              v-model:value="formValue.contacts.mobileNumber" 
              placeholder="Введите моб.телефон" 
            />
          </n-form-item>
          <n-form-item 
            label="Домашний телефон" 
            path="contacts.homeNumber"
            size="large"  
            :style="{ width: '350px' }"
          >
            <n-input 
              type="tel"
              v-model:value="formValue.contacts.homeNumber" 
              placeholder="Введите домашний телефон" 
            />
          </n-form-item>
        </div>
      </div>
      <div class="block">
        <h2>Направление обращения</h2>
        <div class="item">
          <n-form-item 
            label="Цель обращения" 
            path="direction.goal"
            size="large"  
            :style="{ width: '350px' }"
          >
            <n-select
              v-model:value="formValue.direction.goal"
              placeholder="Выберите цель обращения"
              :options="goalOptions"
            />
          </n-form-item>
          <n-form-item 
            v-if="formValue.direction.goal === 'practice'"
            label="Сроки практики" 
            path="direction.dateRange"
            size="large"  
            :style="{ width: '300px' }"
          >
            <n-date-picker 
              v-model:value="formValue.direction.dateRange" 
              type="daterange" 
              clearable 
              format="dd.MM.yyyy"
            />
          </n-form-item>
          <n-form-item 
            v-if="formValue.direction.goal === 'study'"
            label="Хотите ли вы работать в Банке?" 
            path="direction.wantWork"
            size="large"
          > 
            <n-space>
              <n-radio-group 
                v-model:value="formValue.direction.wantWork" 
                name="radiogroup"
              >
                <n-space>
                  <n-radio :value="true">
                    Да
                  </n-radio>
                  <n-radio :value="false">
                    Нет
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-space>
          </n-form-item>
          <n-form-item 
            label="Желаемый регион прохождения практики" 
            path="direction.region"
            size="large"  
            :style="{ width: '350px' }"
          >
            <n-select
              v-model:value="formValue.direction.region"
              placeholder="Выберите регион"
              :options="regionOptions"
            />
          </n-form-item>
        </div>
        <div
          v-if="formValue.direction.wantWork" 
          class="item"
        >
          <n-form-item
            label="Желаемое направление работы" 
            path="direction.workType"
            size="large"
            :style="{ maxWidth: '550px' }"
          > 
            <n-select
              v-model:value="formValue.direction.workType"
              placeholder="Выберите направление"
              :options="worksOptions"
              multiple
            />
          </n-form-item>
        </div>
        <div 
          v-if="formValue.direction.wantWork" 
          class="item"
        >
          <n-form-item 
            label="Чего вы ожидаете от работы в банке" 
            path="direction.expectation"
            size="large"  
            :style="{ width: '350px' }"
          >
            <n-input 
              v-model:value="formValue.direction.expectations" 
              placeholder="Опишите свои ожидания" 
            />
          </n-form-item>
          <n-form-item 
            label="Готовность к переезду в другой город" 
            path="direction.relocation"
            size="large"
          > 
            <n-space>
              <n-radio-group 
                v-model:value="formValue.direction.relocation" 
                name="radiogroup"
              >
                <n-space>
                  <n-radio :value="true">
                    Да
                  </n-radio>
                  <n-radio :value="false">
                    Нет
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-space>
          </n-form-item>
        </div>
        <div class="item">
          <n-form-item 
            label="Вы подавали документы ранее?" 
            path="direction.repeat"
            size="large"
          > 
            <n-space>
              <n-radio-group 
                v-model:value="formValue.direction.repeat" 
                name="radiogroup"
              >
                <n-space>
                  <n-radio :value="true">
                    Да
                  </n-radio>
                  <n-radio :value="false">
                    Нет
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-space>
          </n-form-item>
          <n-form-item 
            v-if="formValue.direction.repeat"
            label="Каков был результат" 
            path="direction.result"
            size="large"
            :style="{ width: '350px' }"
          > 
            <n-input 
              v-model:value="formValue.direction.result" 
              placeholder="Опишите результат подачи заявки" 
            />
          </n-form-item>
        </div>
      </div>
      <div
        v-if="!formValue.auth"
        class="btn-footer"
      >
        <n-form-item>
          <n-button
            type="success"
            strong 
            secondary
            @click="handleValidateClick"
          >
            Далее
          </n-button>
        </n-form-item>
      </div>
    </n-form>
  </div>
</template>

<style scoped>
  .form-page {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
    overflow: auto;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item, .block {
    display: flex;
    width: 90vw;
    flex-wrap: wrap;
    align-items: start;
  }
  
  .main-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .with-info {
    max-width: 350px;
  }

  .info {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }

  .btn-footer {
    width: 100%;
    margin-right: 15vw;
    display: flex;
    justify-content: end;
  }
</style>