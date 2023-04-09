<script setup>
import { ref, reactive, onMounted } from 'vue'
import { db } from '../database'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const state = reactive({
  jwt: '',
  id: null,
  questions: [],
  checked: [],
  loading: true
})

const fetchTest = async () => {
  await db.jwt.get({user: 'token'})
    .then(data => {
      state.jwt = data.jwt
      db.category.get({user: 'token'})
        .then(data => {
          console.log(data)
          fetch(`http://p0var.ru/api/tests/start/${data.category}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${state.jwt}`
            },
          })
            .then(resp => resp.json())
            .then(data => {
              state.questions = data.questions
              state.id = data.id
            })
        })
    })
}

const checkValue = (item, answer) => {
  console.log(!!state.checked.find(el => el.question === item && el.answer === answer))
  return !!state.checked.find(el => el.question === item && el.answer === answer)
}

const changeCheckbox = (item, answer, val) => {
  if(val) {
    state.checked.push({
      question: item,
      answer: answer,
      checked: true
    })
  } else {
    state.checked = state.checked.filter(el => el.question === item ? el.answer !== answer : true)
  }
}

const changeRadio = (item, answer) => {
  state.checked.push({
    question: item,
    answer: answer,
    checked: true
  })
  state.checked = state.checked.filter(el => el.question === item ? el.answer === answer : true)
}

const complete = async () => {
  const questions = state.questions.map(el => {
    const answers = state.checked.map(m => {
      if(m.question === el.id) {
        return m.answer
      }
      else null
    }).filter(m => !!m)
    return {
      id: el.id,
      ids: answers
    }
  })
 
  await fetch(`http://p0var.ru/api/tests/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.jwt}`
      },
      // Authorization: Bearer YWxhZGRpbjpvcGVuc2VzYW1l
      body: JSON.stringify({
        id: state.id,
        questions: questions
      })
    })
      .then(() => {
        router.push({name: 'TestList'})
      })
}

onMounted(() => {
  fetchTest()
})
</script>

<template>
  <div 
    v-if="state.questions.length"
    class="test"
  >
    <div
      v-for="item in state.questions"
      :key="item.id"
    >
      <div class="question">
        <h3>{{ item.question_data }}</h3>
        <div class="list">
          <div 
            v-for="answer in item.answers"
            :key="answer.id"
          >
            <n-checkbox
              v-if="item.question_type === 'multy'"
              @update:checked="val => changeCheckbox(item.id, answer.id, val)"
            >
              {{ answer.data }}
            </n-checkbox>
            <n-radio
              v-if="item.question_type !== 'multy'"
              :checked="checkValue(item.id, answer.id)"
              @change="() => changeRadio(item.id, answer.id)"
            >
              {{ answer.data }}
            </n-radio>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <n-button
        class="complete-btn"
        type="success"
        strong 
        secondary
        @click="complete"
      >
        Завершить
      </n-button>
    </div>
  </div>
</template>

<style scoped>

  .test {
    height: calc(100vh - 50px);
    overflow: auto;
  }
  .footer {
    width: 100%;
    display: flex;
    justify-content: end;
    margin: 10px 0 30px 0;
  }

  .complete-btn {
    margin-right: 25px;
  }
  .list {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .question {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 30px;
  }
</style>