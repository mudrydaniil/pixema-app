export const baseUrl = 'https://kinopoiskapiunofficial.tech/api/'

export const API = {
    MOVIES: {
        LIST: 'v2.2/films',
        DETAILS: (id: number | string) => `v2.2/films/${id}`,
        SEARCH: (keyword: string, page: number) => 
            `v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`,
    },
    FILTERS: 'v2.2/films/filters',
} as const