import { describe, it, expect } from "bun:test";
import { saveTodo, getTodoById, removeTodo, removeTodoByName, getTodoByName, updateTodo } from "../TodoRepository/crud";

describe("Todo CRUD Operations", () => {
    it("should create a new todo item", async () => {
        const todo = { title: "Test Todo", description: "aovweinm", completed: false };

        await saveTodo(todo);
        const fetchedTodo = await getTodoByName(todo.title);
        expect(fetchedTodo?.title).toEqual(todo.title);

        removeTodoByName(todo.title);

    });

    it("should update an existing todo item", async () => {
        const todo = { title: "Initial Title", description: "Initial Description", completed: false };
        const newTitle = "Updated Todo"

        await saveTodo(todo);
        let updatedTodo = await getTodoByName(todo.title);

        if (!updatedTodo) {
            throw new Error("Todo not found after creation");
        }

        await updateTodo(updatedTodo.id, {title: newTitle})

        updatedTodo = await getTodoByName(newTitle);

        expect(updatedTodo?.title).toBe(newTitle);
        removeTodoByName(todo.title);
    });

    it("should delete a todo item", async () => {
        const todo = { title: "To Be Deleted", description: "This will be deleted", completed: false };

        await saveTodo(todo);
        const fetchedTodo = await getTodoByName(todo.title);
        expect(fetchedTodo?.title).toEqual(todo.title);
        removeTodoByName(todo.title);
        const deletedTodo = await getTodoByName(todo.title);
        expect(deletedTodo).toBeNull();

        removeTodoByName(todo.title);
    });

    it("removeTodoByName should delete all todos with the given title", async () => {
        const todo = { title: "To Be Deleted", description: "This will be deleted", completed: false };

        await saveTodo(todo);
        const fetchedTodo = await getTodoByName(todo.title);

        if (!fetchedTodo) {
            throw new Error("Todo does not exist");
        }
        
        removeTodoByName(fetchedTodo.title);
        const deletedTodo = await getTodoByName(fetchedTodo.title);
        expect(deletedTodo).toBeNull();
    });
    
    it('should save todo even when some fields are missing', async () => {
        const todo = { title: "Here", completed: false };
        await saveTodo(todo);
    })
    
});