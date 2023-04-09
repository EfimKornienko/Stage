
<script>
import { defineComponent, ref } from "vue"
import { db } from '@/database'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()

    const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const modelRef = ref({
      login: null,
      password: null,
      reenteredPassword: null
    });
    function validatePasswordStartWith(rule, value) {
      return !!modelRef.value.password && modelRef.value.password.startsWith(value) && modelRef.value.password.length >= value.length;
    }
    function validatePasswordSame(rule, value) {
      return value === modelRef.value.password;
    }

    const setAdmin = () => {
      modelRef.value = {
        login: 'admin',
        password: 'admin',
        reenteredPassword: 'admin'
      }
    }
    const rules = {
      login: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("Поле логин обязательное");
            }
            return true;
          },
          trigger: ["input", "blur"]
        }
      ],
      password: [
        {
          required: true,
          message: "Введите пароль"
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: "Подтверждение пароля обязательно",
          trigger: ["input", "blur"]
        },
        {
          validator: validatePasswordStartWith,
          message: "Пароли не одинаковы",
          trigger: "input"
        },
        {
          validator: validatePasswordSame,
          message: "Пароли не одинаковы",
          trigger: ["blur", "password-input"]
        }
      ]
    };
    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
        }
      },
      setAdmin,
      handleValidateButtonClick(e) {
        e.preventDefault();
        formRef.value?.validate(
          (errors) => {
            if (!errors) {
              fetch('http://p0var.ru/' + 'api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  username: modelRef.value.login,
                  password: modelRef.value.password
                })
              })
                .then(resp => resp.json())
                .then(data => {
                  db.jwt.put({
                    user: 'token',
                    jwt: data.token,
                    role: data.role
                  }).then(() => {
                    router.push({name: 'TestList'})
                  })
                })
            } else {
              console.log(errors);
            }
          }
        );
      }
    };
  }
});
</script>

<template>
  <div class="form">
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="login" label="Логин">
        <n-input 
          v-model:value="model.login" 
          placeholder="Введите логин"
          :style="{width: '350px'}"
          @keydown.enter.prevent 
        />
      </n-form-item>
      <n-form-item path="password" label="Пароль">
        <n-input
          v-model:value="model.password"
          type="password"
          placeholder="Введите пароль"
          :style="{width: '350px'}"
          @input="handlePasswordInput"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item
        ref="rPasswordFormItemRef"
        first
        path="reenteredPassword"
        label="Повторите пароль"
      >
        <n-input
          v-model:value="model.reenteredPassword"
          :disabled="!model.password"
          type="password"
          placeholder="Повторите пароль"
          :style="{width: '350px'}"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button
              round
              type="primary"
              :style="{marginRight: '20px'}"
              @click="() => setAdmin()"
            >
              Администратор
            </n-button>
            <n-button
              :disabled="model.login === null"
              round
              type="primary"
              @click="handleValidateButtonClick"
            >
              Войти
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<style scoped>
  .form {
    height: calc(100vh - 50px);
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>