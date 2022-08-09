import axios from "axios"

const todosApi = axios.create({
    baseURL: "http://localhost:8080",
    headers:{ Accept: "application/json",
    "Content-Type": "application/json",}
})

/* export const getTodos = async () => {
    const response = await todosApi.get("/task")
    return response.data
}

export const addTodo = async (name) => {
    return await todosApi.post("/task", name)
}

export const updateTodo = async (todo) => {
    return await todosApi.patch(`/todos/${todo.id}`, todo)
}

export const deleteTodo = async ({ id }) => {
    return await todosApi.delete(`/todos/${id}`, id)
} */

export default todosApi 