export const baseUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/'

export const API = {
    MOVIES: {
        LIST: 'films/collections?type=TOP_POPULAR_ALL', 
        DETAILS: (id: number | string) => `films/${id}`,
        SEARCH: 'films/search-by-keyword/',
    },
    FILTERS: 'films/filters',
} as const;