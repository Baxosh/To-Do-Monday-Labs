export const TODO_LIST = "todo/"
export const TODO_DETAIL = '/todo/{id}'



const backendUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8000"
export const domain = backendUrl.endsWith('/') ? backendUrl.substr(0, backendUrl.length - 1) : backendUrl