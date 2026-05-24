import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { get } from '../../config/http-client'
import { API } from '../../config/api'
import { CatalogState } from '../../types/movie'

interface ExtendedCatalogState extends CatalogState {
    searchQuery: string
}

const initialState: ExtendedCatalogState = {
    movies: [],
    total: 0,
    isLoading: false,
    error: null,
    searchQuery: '',
}

export const fetchMovies = createAsyncThunk(
    'catalog/fetchMovies',
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await get(`${API.MOVIES.LIST}&page=${page}`);
            return { data: response.data, page }
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Не удалось загрузить каталог'
            )
        }
    }
);

export const searchMovies = createAsyncThunk(
    'catalog/searchMovies',
    async ({ keyword, page }: { keyword: string; page: number }, { rejectWithValue }) => {
        try {
            const response = await get(API.MOVIES.SEARCH(keyword, page));
            return { data: response.data, page }
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Ошибка при поиске фильмов'
            )
        }
    }
)

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
            if (!action.payload) {
                state.movies = []
            }
        },
        clearCatalog: (state) => {
            state.movies = []
            state.total = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.isLoading = false
                
                const incomingItems = action.payload.data.items || [];
                const normalizedItems = incomingItems.map((movie: any) => ({
                    ...movie,
                    kinopoiskId: movie.kinopoiskId || movie.filmId
                }))

                if (action.payload.page === 1) {
                    state.movies = normalizedItems.slice(0, 10)
                } else {
                    state.movies = [...state.movies, ...normalizedItems].slice(0, action.payload.page * 10)
                }
                
                state.total = action.payload.data.total
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(searchMovies.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.isLoading = false
                
                const incomingItems = action.payload.data.films || action.payload.data.items || []
                const normalizedItems = incomingItems.map((movie: any) => ({
                    ...movie,
                    kinopoiskId: movie.kinopoiskId || movie.filmId
                }))

                if (action.payload.page === 1) {
                    state.movies = normalizedItems.slice(0, 10)
                } else {
                    state.movies = [...state.movies, ...normalizedItems].slice(0, action.payload.page * 10)
                }
                
                state.total = action.payload.data.searchFilmsCount || action.payload.data.total || 0
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    },
})

export const { setSearchQuery, clearCatalog } = catalogSlice.actions
export default catalogSlice.reducer