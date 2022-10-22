import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        email: "",
        id: 0,
        active: false,
    },
    reducers: {
        setUser: (state: any, action: any) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.id = action.payload.id
            state.active = action.payload.active
        },
    },
})

export const { setUser } = userSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.user.value)`
export const selectUser = (state: any) => state.user

export default userSlice.reducer
