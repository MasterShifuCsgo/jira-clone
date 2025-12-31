import express from 'express'
import type { Request, Response } from 'express'
import { removeTodo, removeTodoByName, saveTodo, updateTodo } from './TodoRepository/crud'
import type { Todo } from '../../prisma/generated/client'

const PORT = process.env.PORT

const app = express()
app.use(express.json())


app.post('/newTodo', async (req: Request, res: Response) => {
  const todo: Todo = req.body;        
  try{
    await saveTodo(todo);
  }catch(err){
    return res.status(500)
  }
  return res.status(200)
})

app.put('/updateTodo', async (req: Request, res: Response) => {
  const todo: Todo = req.body;        
  try{
    await updateTodo(todo.id, todo);
  }catch(err){
    return res.status(400)
  }
  return res.status(200)
})

app.delete('/deleteTodo', async (req: Request, res: Response) => {
  const todo: Todo = req.body;

  try{
    await removeTodo(todo.id);
  }catch(err){
    return res.status(400)
  }
  return res.status(200)
})


app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`)
}).on('ERROR', (err) => {
  console.log(err)
})

