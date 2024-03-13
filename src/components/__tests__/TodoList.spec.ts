import { describe, it, expect } from 'vitest'

import { mount, DOMWrapper } from '@vue/test-utils'
import TodoList from '../TodoList.vue'

function withNameFilter<T extends Node>(wrapperArray: DOMWrapper<T>[]) {
  return {
    childSelectorHasText: (selector: string, str: string): DOMWrapper<T>[] =>
      wrapperArray.filter((i) => i.find(selector).text().match(str)),

    hasText: (str: string): DOMWrapper<T>[] =>
      wrapperArray.filter((i) => i.text().match(str)),
  }
}

describe('TodoList', () => {
  it('allows user to add a new todo item to the list', async () => {
    const wrapper = mount(TodoList)

    const inputEl = wrapper.find('input[type="text"]')
    const addTodoButtonEl = withNameFilter(wrapper.findAll('button')).hasText('Add todo').at(0)

    expect(addTodoButtonEl).toBeTruthy()

    const newTodoText = 'my new todo item'

    inputEl.setValue(newTodoText)
    await addTodoButtonEl?.trigger('click')

    const newTodoLiEl = withNameFilter(wrapper.findAll('li')).hasText(newTodoText).at(0)

    expect(newTodoLiEl).toBeTruthy()
    expect(inputEl.text()).toEqual('')
  })

  it('allows user to remove a todo item from the list', async () => {
    const existingTodoText = 'Existing Todo'

    const wrapper = mount(TodoList, { props: {
      initialTodos: [{ id: 1, text: existingTodoText, isDone: false }]
    }})

    const existingTodoLiEl = withNameFilter(wrapper.findAll('li')).hasText(existingTodoText).at(0)

    expect(existingTodoLiEl).toBeTruthy()

    const removeExistingButton = withNameFilter((existingTodoLiEl as DOMWrapper<HTMLLIElement>).findAll('button')).hasText('Remove').at(0)

    expect(removeExistingButton).toBeTruthy()

    await removeExistingButton?.trigger('click')

    expect(wrapper.text()).not.toContain(existingTodoText)
  })
})
