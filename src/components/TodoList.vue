<script setup lang="ts">
  import { ref } from 'vue'
  import type { Todo } from '../types'
  import AddNewTodo from './AddNewTodo.vue';
  import TodoItem from './TodoItem.vue';

  const props = defineProps<{
    initialTodos?: Todo[]
  }>()

  const todos = ref<Todo[]>(props.initialTodos || [])

  const addTodo = (newTodoText: string) => {
    const lastId = todos.value?.[todos.value.length - 1]?.id || 0
    todos.value.push({ id: lastId + 1, text: newTodoText, isDone: false })
  }

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }
</script>

<template>
  <AddNewTodo @new-todo-text-added="addTodo" />

  <ul>
    <li v-for="todo in todos">
      <TodoItem :todo="todo" @remove-todo="removeTodo" />
    </li>
  </ul>
</template>