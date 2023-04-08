<script setup>
  import { ref } from 'vue'

  const formRef = ref(null)
  
  const formValue = ref({
    user: {
      name: '',
      surname: '',
      middle: '',
      birth: null
    },
    phone: ''
  })

  const rules = {
    user: {
      name: {
        required: true,
        message: 'Please input your name',
        trigger: ['input', 'blur']
      },
      surname: {
        required: true,
        message: 'Please input your name',
        trigger: ['input', 'blur']
      },
      middle: {
        required: true,
        message: 'Please input your age',
        trigger: ['input', 'blur']
      },
      birth: {
        required: true,
        message: 'Please input your age',
        trigger: ['input', 'blur']
      },
    },
    phone: {
      required: true,
      message: 'Please input your number',
      trigger: ['input', 'blur']
    }
  }
  
  const handleValidateClick = (e) => {
    e.preventDefault()
    formRef.value?.validate((errors) => {
      
    })
  }

</script>

<template>
  <div class="form">
    <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="formValue"
      :rules="rules"
    >
      <n-form-item label="Фамилия" path="user.surname">
        <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
      </n-form-item>
      <n-form-item label="Имя" path="user.name">
        <n-input v-model:value="formValue.user.age" placeholder="Input Age" />
      </n-form-item>
      <n-form-item label="Отчество" path="user.middle">
        <n-input v-model:value="formValue.user.middle" placeholder="Phone Number" />
      </n-form-item>
      <n-form-item label="Дата рождения" path="user.birth">
        <n-date-picker 
          v-model:value="formValue.user.birth" 
          type="date" 
          value-format="dd-MM-yyyy"
        />
      </n-form-item>
      <n-form-item>
        <n-button @click="handleValidateClick">
          Validate
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<style scoped>
  
</style>