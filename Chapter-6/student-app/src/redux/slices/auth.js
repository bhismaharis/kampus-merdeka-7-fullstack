import { createSlice } from "@reduxjs/toolkit";

// Initial state of the auth slice
const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
};

// Create the auth slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

// Export the actions
export const { setUser, setToken } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

/*
Analogy in useState code:
*/
// const [user, setUser] = useState(null);
// const [token, setToken] = useState(localStorage.getItem("token") || null);