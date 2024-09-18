import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { apiBaseUrl } from "@/services/axios";
import Cookies from "js-cookie";
import { AuthResponse, LoginSubmitProp, AuthState, UpdateProfilePayload } from "@/Types/AuthType";
import { RootState } from "@/Redux/Store";
import axiosInstance from "@/services/axios";


export const login = createAsyncThunk<AuthResponse, LoginSubmitProp, { rejectValue: string }>(
    "auth/sign-in",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${apiBaseUrl}/auth/sign-in`, data);
            const accessToken = response.data.access_token;

            Cookies.set("cinolu_token", accessToken, { expires: 7 });

            const profileResponse = await axiosInstance.get('/auth/profile', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return { access_token: accessToken, ...profileResponse.data };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de la connexion";
            return rejectWithValue(errorMessage);
        }
    }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            Cookies.remove("cinolu_token");
            window.location.href = "/auth/login";
        } catch (error: any) {
            const errorMessage = "Une erreur est survenue lors de la déconnexion";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


export const updateProfile = createAsyncThunk<AuthResponse, UpdateProfilePayload, { rejectValue: string }>(
    "auth/updateProfile",
    async (profileData, { rejectWithValue }) => {
        try {
            const accessToken = Cookies.get('cinolu_token');

            if (!accessToken) {
                throw new Error("Token non disponible");
            }


            const response = await axios.patch(`${apiBaseUrl}/auth/profile`, profileData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });


            localStorage.setItem("user_profile", JSON.stringify(response.data));


            return response.data;

        } catch (error: any) {
            const errorMessage = error.response?.data?.message?.map((err: { message: string }) => `${err.message}`).join(", ") || "Une erreur est survenue lors de la mise à jour du profil";
            return rejectWithValue(errorMessage);
        }
    }
);


const initialState: AuthState = {
    user: null,
    statusAuth: "idle",
    errorAuth: null,
    isAuthenticated: false,
};

const authSlice = createSlice({

    name: "auth",
    initialState,

    reducers: {
        loadUserFromStorage: (state) => {
            const storedUser = localStorage.getItem('user_profile');
            if (storedUser) {
                state.user = JSON.parse(storedUser);
                state.isAuthenticated = true;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.statusAuth = "loading";
                state.errorAuth = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.statusAuth = "succeeded";
                state.isAuthenticated = true;

                state.user = action.payload.data;
                Cookies.set("cinolu_token", action.payload.access_token);
                localStorage.setItem('user_profile', JSON.stringify(action.payload.data));
            })
            .addCase(login.rejected, (state, action) => {
                state.statusAuth = "failed";
                state.errorAuth = action.payload || "";
            })
            .addCase(logout.pending, (state) => {
                state.statusAuth = "loading";
                state.errorAuth = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.statusAuth = "succeeded";
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.statusAuth = "failed";
                state.errorAuth = action.payload || "";
            })

            .addCase(updateProfile.pending, (state)=>{
                state.statusAuth = 'loading';
                state.errorAuth = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.statusAuth = 'succeeded';

                state.user = action.payload.data;

                localStorage.setItem('user_profile', JSON.stringify(action.payload.data));
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.statusAuth = 'failed';
                state.errorAuth = action.payload || '';
            });
    },
});

export const { loadUserFromStorage } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectStatus = (state: RootState) => state.auth.statusAuth;
export const selectError = (state: RootState) => state.auth.errorAuth;

export default authSlice.reducer;
