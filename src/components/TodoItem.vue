<script setup lang="ts">
  import type { Todo } from '../types'

  const { todo } = defineProps<{
    todo: Todo
  }>()

  const emit = defineEmits<{
    (e: 'removeTodo', id: number): void
  }>()

  const removeTodo = () => {
    emit('removeTodo', todo.id)
  }
</script>

<template>
  <span>
    {{todo.text}}
    <button @click="removeTodo">Remove</button>
  </span>
</template>
