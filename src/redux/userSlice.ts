import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    id: number | undefined,
    toast: boolean
}

const initialState: InitialState = {
    id: undefined,
    toast:false
}

const userSlice = createSlice({
    name: "userSlice",
    initialState, 
    reducers: {
        setId: (state: InitialState, action: PayloadAction<number>) => {
            state.id = action.payload
        },
        setToast:(state: InitialState, action: PayloadAction<boolean>) => {
            console.log("here")
            state.toast = action.payload
        }
    }
})

export default userSlice.reducer
export const {setId, setToast} = userSlice.actions