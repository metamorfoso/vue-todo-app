<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'newTodoTextAdded', text: string): void
  }>()

  const newTodoText = defineModel({ default: '' })

  const addTodo = () => {
    emit('newTodoTextAdded', newTodoText.value)
    newTodoText.value = ''
  }
</script>

<template>
  <input v-model.trim="newTodoText" type="text" @keyup.enter="addTodo" />
  <button @click="addTodo">Add todo</button>
</template>