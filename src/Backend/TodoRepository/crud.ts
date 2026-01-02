import prisma from "../db"
import type { Todo } from "../../../prisma/generated/client"

export async function saveTodo(todo: Omit<Todo, 'id'>) {
  await prisma.todo.create({ data: todo })
}

export async function getTodoById(id: number) {
  return await prisma.todo.findUnique({ where: { id } })
}

export async function removeTodoByName(title: string) {
  return await prisma.todo.deleteMany({ where: { title } })
}

export async function removeTodo(id: number) {
  await prisma.todo.delete({ where: { id } })
}

export async function updateTodo(id: number, field: Partial<Omit<Todo, 'id'>>) {
  await prisma.todo.update({ where: { id }, data: field })
}

export async function getTodoByName(title: string) {
    return await prisma.todo.findFirst({ where: { title}})
}

export async function getAllTodos(userid: number){
    return await prisma.todo.findMany({where: { userid: userid}})
}