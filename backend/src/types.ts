export interface UserList {
    id: number | null
    first_name: String | null
    last_name: String | null
}

export interface User {
    id: number | null
    first_name: String | null
    last_name: String | null
    email: String | null
    gender: String | null
    company: {
        name: String | null
        department: String | null
    }
}