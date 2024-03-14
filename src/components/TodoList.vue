<script setup lang="ts">
  import { computed, ref } from 'vue'
  import type { Todo } from '../types'
  import AddNewTodo from './AddNewTodo.vue';
  import TodoItem from './TodoItem.vue';

  const props = defineProps<{
    initialTodos?: Todo[]
  }>()

  const todos = ref<Todo[]>(props.initialTodos || [])

  const todosDone = computed(() => todos.value.filter(({ isDone }) => isDone))
  const todosRemaining = computed(() => todos.value.filter(({ isDone }) => !isDone))

  const addTodo = (newTodoText: string) => {
    const lastId = todos.value?.[todos.value.length - 1]?.id || 0
    todos.value.push({ id: lastId + 1, text: newTodoText, isDone: false })
  }

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  const toggleIsDone = (id: number) => {
    todos.value = todos.value.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone }
      }
      return todo
    })
  }
</script>

<template>
  <AddNewTodo @new-todo-text-added="addTodo" />

  <h2 v-if="todosRemaining.length > 0">Remaining</h2>
  <ul id="remaining-list">
    <li :key="todo.id" v-for="todo in todosRemaining">
      <TodoItem :todo="todo" @remove-todo="removeTodo" @toggle-is-done="toggleIsDone" />
    </li>
  </ul>

  <h2 v-if="todosDone.length > 0">Done</h2>
  <ul id="done-list">
    <li :key="todo.id" v-for="todo in todosDone">
      <TodoItem :todo="todo" @remove-todo="removeTodo" @toggle-is-done="toggleIsDone" />
    </li>
  </ul>
</template>