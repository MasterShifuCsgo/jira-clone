import prisma from './db'
import type { Todo } from '../../prisma/generated/client'

export async function saveTodo(todo: Todo) {
  await prisma.todo.create({ data: todo })
}

export async function getTodoById(id: number) {
  return await prisma.todo.findUnique({ where: { id } })
}

export async function removeTodo(id: number) {
  await prisma.todo.delete({ where: { id } })
}
