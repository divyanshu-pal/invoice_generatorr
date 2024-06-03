import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface UserState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (loginData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // const response = await axios.post('https://invoice-api-31x7.onrender.com/api/auth/login', loginData);
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);

      // http://localhost:5000
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (registerData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      // const response = await axios.post('https://invoice-api-31x7.onrender.com/api/auth/register', registerData);
      const response = await axios.post('http://localhost:5000/api/auth/register', registerData);
      console.log(response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
