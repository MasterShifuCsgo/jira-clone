import { describe, it, expect } from "bun:test";

describe("Todo CRUD Operations", () => {
    it("should create a new todo item", () => {
        const todo = { id: 1, title: "Test Todo", completed: false };

        saveTodo(todo);
        const fetchedTodo = getTodoById(1);
        expect(fetchedTodo).toEqual(todo);
    });
});