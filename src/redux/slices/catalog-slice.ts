import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { get } from '../../config/http-client'
import { API } from '../../config/api'
import { CatalogState } from '../../types/movie'

export interface MovieFilters {
    type: 'ALL' | 'FILM' | 'TV_SERIES' | 'MINI_SERIES' | 'TV_SHOW'
    year: string
}

interface ExtendedCatalogState extends CatalogState {
    searchQuery: string
    filters: MovieFilters
}

const initialState: ExtendedCatalogState = {
    movies: [],
    total: 0,
    isLoading: false,
    error: null,
    searchQuery: '',
    filters: {
        type: 'ALL',
        year: '',
    }
}

// Универсальный Thunk для загрузки и фильтрации фильмов
export const fetchMovies = createAsyncThunk(
    'catalog/fetchMovies',
    async ({ page, filters }: { page: number; filters: MovieFilters }, { rejectWithValue }) => {
        try {
            // Формируем query-параметры для API Кинопоиска
            const queryParams: string[] = [`page=${page}`]

            if (filters.type !== 'ALL') {
                queryParams.push(`type=${filters.type}`)
            }
            if (filters.year) {
                // Для фильтрации конкретного года в v2.2/films передается диапазон от и до одинаковым числом
                queryParams.push(`yearFrom=${filters.year}`)
                queryParams.push(`yearTo=${filters.year}`)
            }
            
            // Если фильтров нет, можно добавить сортировку по популярности
            if (filters.type === 'ALL' && !filters.year) {
                queryParams.push('order=NUM_VOTE')
            }

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
        // Экшен для обновления фильтров
        setMovieFilters: (state, action: PayloadAction<Partial<MovieFilters>>) => {
            state.filters = { ...state.filters, ...action.payload }
            state.movies = [] // Очищаем старые фильмы при изменении фильтра
            state.total = 0
        },
        // Сброс фильтров
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
                
                // В эндпоинте v2.2/films массив объектов приходит в поле items
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

export const { setSearchQuery, setMovieFilters, resetMovieFilters, clearCatalog } = catalogSlice.actions
export default catalogSlice.reducer