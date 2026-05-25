export const BASE_URL = 'https://kinopoiskapiunofficial.tech/api/'

export const API = {
  MOVIES: {
    LIST: 'v2.2/films',
    DETAILS: (movieId: number | string) => `v2.2/films/${movieId}`,
    SEARCH: (keyword: string, pageNumber: number) => 
      `v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword)}&page=${pageNumber}`
  },
  FILTERS: 'v2.2/films/filters'
} as const