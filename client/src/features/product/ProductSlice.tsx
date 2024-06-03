import { createSlice, PayloadAction, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  name: string;
  qty: number;
  rate: number;
  total: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Define the type for the addProduct thunk response
interface AddProductResponse {
  name: string;
  qty: number;
  rate: number;
  total: number;
}

// Define the type for the addProduct thunk argument
interface AddProductArgs {
  name: string;
  qty: number;
  rate: number;
}

export const addProduct = createAsyncThunk<AddProductResponse, AddProductArgs>(
  'product/add',
  async (productData, { rejectWithValue }) => {
    try {
      // const response = await axios.post('https://invoice-api-31x7.onrender.com/api/products/add', productData);
      const response = await axios.post('http://localhost:5000/api/products/add', productData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<AddProductResponse>) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
