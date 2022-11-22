const intialstate = {
    users: [],
    number: 0,
    loggedInuser: null,

}

const ChnageNumber = (state = intialstate, action) => {
    // console.log(action, "action")
    switch (action.type) {
        case "INCREMENT": return {
            ...state,
            number: state.number + 1
        }
        case "DECREMENT": return {
            ...state,
            number: state.number - 1
        }
        case "REGISTER":
            return {
                ...state,
                users: action.payload
            }
        case "LOGIN":
            return {
                ...state,
                users: action.payload
            }
        default: return state
    }
}
export default ChnageNumber