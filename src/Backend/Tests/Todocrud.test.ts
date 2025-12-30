import { describe, it, expect } from "bun:test";
import { saveTodo, getTodoById, removeTodo, removeTodoByName, getTodoByName } from "../Todocrud/crud";

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

        await saveTodo(todo);
        todo.title = "Updated Title";
        await saveTodo(todo);
        const updatedTodo = await getTodoByName(todo.title);
        expect(updatedTodo?.title).toBe(todo.title);
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
});