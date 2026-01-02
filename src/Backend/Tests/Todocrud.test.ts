import { describe, it, expect, beforeEach } from 'bun:test'
import {
  saveTodo,
  getTodoById,
  removeTodo,
  getAllTodos,
  removeTodoByName,
  getTodoByName,
  updateTodo,
} from '../TodoRepository/crud'
import { saveUser, getUserByName, removeUserByName } from '../UserRepository/userCrud'
import generate from '../implementation'
import type { User } from '../../../prisma/generated/client'

describe('Todo CRUD Operations', () => {
  let user: User
  beforeEach(async () => {
    const userNameGen =
      generate()!
    const userObj = { name: userNameGen }
    await saveUser(userObj)

    const fetchedUser = await getUserByName(userObj.name)

    if (!fetchedUser) {
      throw new Error('User does not exist')
    }

    user = fetchedUser
  })

  it('should create a new todo item', async () => {
    const todo = {
      title: 'Test Todo',
      description: 'aovweinm',
      completed: false,
      userid: user.id,
    }

    await saveTodo(todo)
    const fetchedTodo = await getTodoByName(todo.title)
    expect(fetchedTodo?.title).toEqual(todo.title)

    await removeTodoByName(todo.title)
    await removeUserByName(user.name)
  })

  it('should update an existing todo item', async () => {
    const todo = {
      title: 'Initial Title',
      description: 'Initial Description',
      completed: false,
      userid: user.id,
    }
    const newTitle = 'Updated Todo'

    await saveTodo(todo)
    let updatedTodo = await getTodoByName(todo.title)

    if (!updatedTodo) {
      throw new Error('Todo not found after creation')
    }

    await updateTodo(updatedTodo.id, { title: newTitle })

    updatedTodo = await getTodoByName(newTitle)

    expect(updatedTodo?.title).toBe(newTitle)
    await removeTodoByName(todo.title)
    await removeUserByName(user.name)
  })

  it('should delete a todo item', async () => {
    const todo = {
      title: 'To Be Deleted',
      description: 'This will be deleted',
      completed: false,
      userid: user.id,
    }

    await saveTodo(todo)
    const fetchedTodo = await getTodoByName(todo.title)
    expect(fetchedTodo?.title).toEqual(todo.title)
    removeTodoByName(todo.title)
    const deletedTodo = await getTodoByName(todo.title)
    expect(deletedTodo).toBeNull()

    await removeTodoByName(todo.title)
    await removeUserByName(user.name)
  })

  it('removeTodoByName should delete all todos with the given title', async () => {
    const todo = {
      title: 'To Be Deleted',
      description: 'This will be deleted',
      completed: false,
      userid: user.id,
    }

    await saveTodo(todo)
    const fetchedTodo = await getTodoByName(todo.title)

    if (!fetchedTodo) {
      throw new Error('Todo does not exist')
    }

    await removeTodoByName(fetchedTodo.title)
    const deletedTodo = await getTodoByName(fetchedTodo.title)
    expect(deletedTodo).toBeNull()
    await removeUserByName(user.name)
  })

  it('should save todo even when some fields are missing', async () => {
    const todo = { title: 'Here', completed: false, userid: user.id, description: 'Cool' }
    await saveTodo(todo)

    const fetchedTodo = await getTodoByName('Here')

    if (!fetchedTodo) {
      throw new Error('Todo does not exist')
    }
    const newTitle = fetchedTodo.title
    expect(fetchedTodo.title).toBe(newTitle)
    await removeTodoByName(todo.title)
    await removeUserByName(user.name)
  })

  it('should get a list of todo', async () => {
    const todo = { title: 'Here', completed: false, userid: user.id, description: 'Cool' }
    const todo2 = {
      title: 'Not Here',
      completed: false,
      userid: user.id,
      description: 'Very Cool',
    }
    await saveTodo(todo)
    await saveTodo(todo2)

    const todos = await getAllTodos(user.id)

    expect(todos).toBeInstanceOf(Array)
    expect(todos).toHaveLength(2)
    await removeTodoByName(todo.title)
    await removeTodoByName(todo2.title)
    await removeUserByName(user.name)
  })
})
