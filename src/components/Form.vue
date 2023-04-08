<script setup>
  import { ref, watch } from 'vue'
  import { rules, goalOptions, regionOptions } from './form/utils'
  import { GlassesOutline, Glasses } from '@vicons/ionicons5'

  components: {
    GlassesOutline,
    Glasses
  }

  const formRef = ref(null)

  const addressCheck = ref(false)
  
  const formValue = ref({
    user: {
      login: '',
      password: '',
      name: '',
      surname: '',
      middle: '',
      birth: null,
      place: '',
      familyStatus: null,
      children: null,
      addressReg: '',
      addressFact: ''
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
      repeat: null
    }
  })

  watch(addressCheck, val => {
    console.log(formValue.value.user)
    const user = formValue.value.user
    if(val) user.addressFact = user.addressReg
  })

  watch(formValue.value.user, val => {
    if(val.addressFact !== val.addressReg) addressCheck.value = false
  })

  // const onCompleteForm = async () => {
  //   const url = column.label ? `api/kanban/columns/${column.id}/issues/`
  //     : `api/kanban/boards/${column.board}/issues/`
  //   if(column.issues) {
  //     let params = {
  //       title: addInput,
  //       project: isGroup(props.root) ? addProject! : props.root.id,
  //       open: column.id == 'open'
  //     }
  //     if(column?.issues[0]) {
  //       params.move_before = column?.issues[0].id
  //     }
  //     await fetch(url, {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(params)
  //     })
  //       .then(resp => resp.json())
  //       .then(data => {
          
  //       })
  //       .finally(() => {
          
  //       })
  //   }
  // }


 

  const handleValidateClick = (e) => {
    e.preventDefault()
    formRef.value?.validate((errors) => {
      
    })
  }

</script>

<template>
  <div class="form-page">
    <n-form
      class="form"
      ref="formRef"
      inline
      :label-width="80"
      :model="formValue"
      :rules="rules"
    >
      <div class="block">
        <h2>Учетные данные</h2>
        <div class="item">
          <n-form-item 
            label="Логин" 
            path="user.login" 
            size="large"
          >
            <n-input v-model:value="formValue.user.login" placeholder="Введите логин" />
          </n-form-item>
          <n-form-item 
            label="Пароль" 
            path="user.password" 
            size="large"
          > 
            <n-space>
              <n-input
                type="password"
                show-password-on="mousedown"
                placeholder="Пароль"
                :maxlength="8"
              />
              <n-input
                type="password"
                show-password-on="click"
                placeholder="Повторите пароль"
                :maxlength="8"
              >
                <template #password-visible-icon>
                  <n-icon :size="16" :component="GlassesOutline" />
                </template>
                <template #password-invisible-icon>
                  <n-icon :size="16" :component="Glasses" />
                </template>
              </n-input>
            </n-space>
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
            :style="{ width: '300px' }"
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
        </div>
        <div class="item">
          <n-form-item 
            label="Адрес регистрации" 
            path="user.addressReg"
            size="large"  
            :style="{ width: '450px' }"
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
        </div>
      </div>
      <n-form-item>
        <n-button @click="handleValidateClick">
          Validate
        </n-button>
      </n-form-item>
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

  .info {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }

  .item > div {
    margin-right: 20px !important;
  }
</style>