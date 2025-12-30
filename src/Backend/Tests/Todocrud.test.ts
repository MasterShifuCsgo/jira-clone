import { describe, it, expect } from "bun:test";
import { saveTodo, getTodoById, removeTodo } from "../implementation";

describe("Todo CRUD Operations", () => {
    it("should create a new todo item", async () => {
        const todo = { id: 1, title: "Test Todo", description: "aovweinm", completed: false };

        await saveTodo(todo);
        const fetchedTodo = await getTodoById(1);
        expect(fetchedTodo).toEqual(todo);

        removeTodo(todo.id)

    });
});