<script setup lang="ts">
  import type { Todo } from '../types'

  const props = defineProps<{
    todo: Todo
  }>()

  const emit = defineEmits<{
    (e: 'removeTodo', id: number): void
    (e: 'toggleIsDone', id: number): void
  }>()

  const removeTodo = () => {
    emit('removeTodo', props.todo.id)
  }

  const toggleIsDone = () => {
    emit('toggleIsDone', props.todo.id)
  }
</script>

<template>
  <label>
    <input type="checkbox" :checked.boolean="todo.isDone" @click="toggleIsDone" />
    <span :class="{ done: todo.isDone}">
      {{todo.text}}
      <button @click="removeTodo">Remove</button>
    </span>
  </label>
</template>

<style>
  .done {
    text-decoration: line-through;
  }
</style>