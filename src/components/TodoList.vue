<script setup lang="ts">
  import { ref } from 'vue'

  type Todo = {
    id: number
    text: string
    isDone: boolean
  }

  const props = defineProps<{
    initialTodos?: Todo[]
  }>()

  const todos = ref<Todo[]>(props.initialTodos || [])
  const newTodoText = defineModel({ default: '' })

  const addTodo = () => {
    const lastId = todos.value?.[todos.value.length - 1]?.id || 0
    todos.value.push({ id: lastId + 1, text: newTodoText.value, isDone: false })
    newTodoText.value = ''
  }

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }
</script>

<template>
  <div>
    <input v-model.trim="newTodoText" type="text" @keyup.enter="addTodo" />
    <button @click="addTodo">Add todo</button>
  </div>

  <ul>
    <li v-for="todo in todos">
      {{todo.text}}
      <button @click="removeTodo(todo.id)">Remove</button>
    </li>
  </ul>
</template>