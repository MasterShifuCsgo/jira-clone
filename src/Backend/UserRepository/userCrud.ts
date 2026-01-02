import prisma from "../db"
import type { User } from "../../../prisma/generated/client"

export async function saveUser(user: Omit<User, 'id'>) {
    await prisma.user.create({ data: user})
}

export async function getUserByName(name: string){
    return await prisma.user.findUnique({where: { name }})
}

export async function removeUserByName(name: string){
    return await prisma.user.delete({where: { name }})
}