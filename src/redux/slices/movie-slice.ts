import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from '../../config/http-client'
import { API } from '../../config/api'

interface ExtendedMovieState {
  movie: any | null
  staff: any[]
  similarMovies: any[]
  boxOffice: any[]
  isDetailsLoading: boolean
  isStaffLoading: boolean
  isSimilarLoading: boolean
  isBoxOfficeLoading: boolean
  error: string | null
}

const initialState: ExtendedMovieState = {
  movie: null,
  staff: [],
  similarMovies: [],
  boxOffice: [],
  isDetailsLoading: false,
  isStaffLoading: false,
  isSimilarLoading: false,
  isBoxOfficeLoading: false,
  error: null
}

// 1. Детали фильма
export const fetchMovieById = createAsyncThunk(
  'movie/fetchMovieById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await get(API.MOVIES.DETAILS(id))
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки деталей')
    }
  }
)

export const fetchMovieStaff = createAsyncThunk(
  'movie/fetchMovieStaff',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await get(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchSimilarMovies = createAsyncThunk(
  'movie/fetchSimilarMovies',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`)
      return response.data.items || []
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchMovieBoxOffice = createAsyncThunk(
  'movie/fetchMovieBoxOffice',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/box_office`)
      return response.data.items || []
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    clearMovie: (state) => {
      state.movie = null
      state.staff = []
      state.similarMovies = []
      state.boxOffice = []
      state.error = null
      state.isDetailsLoading = false
      state.isStaffLoading = false
      state.isSimilarLoading = false
      state.isBoxOfficeLoading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.isDetailsLoading = true
        state.error = null
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.isDetailsLoading = false
        state.movie = action.payload
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.isDetailsLoading = false
        state.error = action.payload as string
      })
      .addCase(fetchMovieStaff.pending, (state) => { state.isStaffLoading = true })
      .addCase(fetchMovieStaff.fulfilled, (state, action) => {
        state.isStaffLoading = false
        state.staff = action.payload
      })
      .addCase(fetchSimilarMovies.pending, (state) => { state.isSimilarLoading = true })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.isSimilarLoading = false
        state.similarMovies = action.payload
      })
      .addCase(fetchMovieBoxOffice.pending, (state) => { state.isBoxOfficeLoading = true })
      .addCase(fetchMovieBoxOffice.fulfilled, (state, action) => {
        state.isBoxOfficeLoading = false
        state.boxOffice = action.payload
      })
  }
})

export const { clearMovie } = movieSlice.actions
export default movieSlice.reducer