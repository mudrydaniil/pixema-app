import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from '../../config/http-client'
import { API } from '../../config/api'
import { CatalogState } from '../../types/movie'

const initialState: CatalogState = {
    movies: [],
    total: 0,
    isLoading: false,
    error: null,
};

export const fetchMovies = createAsyncThunk(
    'catalog/fetchMovies',
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await get(`${API.MOVIES.LIST}&page=${page}`);
            return response.data; 
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Не удалось загрузить каталог'
            );
        }
    }
);

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload.items.slice(0, 10); 
                state.total = action.payload.total;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default catalogSlice.reducer;