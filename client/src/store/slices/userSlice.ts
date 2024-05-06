import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import AuthService from "../../services/AuthService";
import { AuthResponse } from "../../models/response/AuthResponse";
import axios from "axios";
import { API_URL } from "../../http";

interface UserState {
    user: IUser | null;
    isAuth: boolean;
    isLoading: boolean;
}

const initialState: UserState = {
    user: null,
    isAuth: false,
    isLoading: false
}

interface LoginAndRegister {
    email: string;
    password: string;
}

export const login = createAsyncThunk(
    'users/fetchUsers',
    async (credentials: LoginAndRegister) => {
        try {
            const response = await AuthService.login(credentials.email, credentials.password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user;
        } catch (error) {
            throw error;
        }
    }
);

export const registration = createAsyncThunk(
    'users/registration',
    async (credentials: LoginAndRegister) => {
        try {
            const response = await AuthService.registration(credentials.email, credentials.password);
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user;
        } catch (error) {
            throw error;
        }
    }
);

export const logout = createAsyncThunk(
    'users/logout',
    async () => {
        try {
            const response = await AuthService.logout();
            console.log(response)
            localStorage.removeItem('token');
        } catch (error) {
            throw error;
        }
    }
)

export const checkAuth = createAsyncThunk(
    'users/checkAuth',
    async () => {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
                withCredentials: true,
            })
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            return response.data.user;
        } catch (error) {
            throw error;
        }
    }
)

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                // state.isLoading = true;
                console.log('login.pending')
            })
            .addCase(login.fulfilled, (state, action) => {
                // state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload;
                console.log('login.fulfilled')
            })
            .addCase(login.rejected, (state) => {
                // state.isLoading = false;
                console.log('login.rejected')
            })
            .addCase(registration.pending, (state) => {
                // state.isLoading = true;
                console.log('registration.pending')
            })
            .addCase(registration.fulfilled, (state, action) => {
                // state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload;
                console.log('registration.fulfilled')
            })
            .addCase(registration.rejected, (state) => {
                // state.isLoading = false;
                console.log('registration.rejected')
            })
            .addCase(logout.pending, (state) => {
                // state.isLoading = true;
                console.log('logout.pending')
            })
            .addCase(logout.fulfilled, (state) => {
                // state.isLoading = false;
                state.isAuth = false;
                state.user = null;
                console.log('logout.fulfilled')
            })
            .addCase(logout.rejected, (state) => {
                // state.isLoading = false;
                console.log('logout.rejected')
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                console.log('checkAuth.pending')
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload;
                console.log('checkAuth.fulfilled')
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                console.log('checkAuth.rejected')
            });
    }
});

export default userSlice.reducer;