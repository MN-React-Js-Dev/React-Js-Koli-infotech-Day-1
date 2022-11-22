
export const incNumber = () => {
    return { type: "INCREMENT" }
}

export const decNumber = () => {
    return { type: "DECREMENT" }
}

export const registerForm = (users) => {
     return { type: "REGISTER", payload: users }
}
export const loginForm = (users) => {
    // console.log(users,"11111")
    return { type: "LOGIN", payload: users }
}