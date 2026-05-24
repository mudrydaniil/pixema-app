import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { get } from '../../config/http-client'
import { API } from '../../config/api'
import { CatalogState } from '../../types/movie'

export interface MovieFilters {
    order: 'RATING' | 'YEAR' | 'NUM_VOTE'
    keyword: string
    type: 'ALL' | 'FILM' | 'TV_SERIES' | 'MINI_SERIES'
    yearFrom: string
    yearTo: string
    ratingFrom: string
    ratingTo: string
}

interface ExtendedCatalogState extends CatalogState {
    searchQuery: string
    isFiltersOpen: boolean
    filters: MovieFilters
}

const initialState: ExtendedCatalogState = {
    movies: [],
    total: 0,
    isLoading: false,
    error: null,
    searchQuery: '',
    isFiltersOpen: false,
    filters: {
        order: 'RATING',
        keyword: '',
        type: 'ALL',
        yearFrom: '',
        yearTo: '',
        ratingFrom: '',
        ratingTo: '',
    }
}

export const fetchMovies = createAsyncThunk(
    'catalog/fetchMovies',
    async ({ page, filters }: { page: number; filters: MovieFilters }, { rejectWithValue }) => {
        try {
            const queryParams: string[] = [`page=${page}`, `order=${filters.order}`]

            if (filters.type !== 'ALL') queryParams.push(`type=${filters.type}`)
            if (filters.keyword) queryParams.push(`keyword=${encodeURIComponent(filters.keyword)}`)
            if (filters.yearFrom) queryParams.push(`yearFrom=${filters.yearFrom}`)
            if (filters.yearTo) queryParams.push(`yearTo=${filters.yearTo}`)
            if (filters.ratingFrom) queryParams.push(`ratingFrom=${filters.ratingFrom}`)
            if (filters.ratingTo) queryParams.push(`ratingTo=${filters.ratingTo}`)

            const url = `${API.MOVIES.LIST}?${queryParams.join('&')}`
            const response = await get(url)
            
            return { data: response.data, page }
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Не удалось загрузить каталог'
            )
        }
    }
)

export const searchMovies = createAsyncThunk(
    'catalog/searchMovies',
    async ({ keyword, page }: { keyword: string; page: number }, { rejectWithValue }) => {
        try {
            const response = await get(API.MOVIES.SEARCH(keyword, page))
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
        setIsFiltersOpen: (state, action: PayloadAction<boolean>) => {
            state.isFiltersOpen = action.payload
        },
        setMovieFilters: (state, action: PayloadAction<Partial<MovieFilters>>) => {
            state.filters = { ...state.filters, ...action.payload }
            state.movies = [] 
            state.total = 0
        },
        resetMovieFilters: (state) => {
            state.filters = initialState.filters
            state.movies = []
            state.total = 0
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
                
                const incomingItems = action.payload.data.items || action.payload.data.films || []
                const normalizedItems = incomingItems.map((movie: any) => ({
                    ...movie,
                    kinopoiskId: movie.kinopoiskId || movie.filmId
                }))

                if (action.payload.page === 1) {
                    state.movies = normalizedItems.slice(0, 10)
                } else {
                    state.movies = [...state.movies, ...normalizedItems].slice(0, action.payload.page * 10)
                }
                
                state.total = action.payload.data.total || 0
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

export const { setSearchQuery, setIsFiltersOpen, setMovieFilters, resetMovieFilters, clearCatalog } = catalogSlice.actions
export default catalogSlice.reducer