/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    mode: "light",
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('token')) || null,
    posts: [],
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setFriends: (state, action) => {
            if (state.user)
                state.user.friends = action.payload.friends;
            else
                console.error("user not exits")
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post
                return post;
            });
            state.posts = updatedPosts;
        }

    }
})

export const { setLogin, setLogout, setMode, setFriends, setPost, setPosts, setUser } = authSlice.actions;

export default authSlice.reducer;