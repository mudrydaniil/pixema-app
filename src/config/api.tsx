export const baseUrl = 'https://kinopoiskapiunofficial.tech/api/' // Убрали v2.2 отсюда

export const API = {
    MOVIES: {
        // Обычная коллекция живет в v2.2
        LIST: 'v2.2/films/collections?type=TOP_POPULAR_ALL', 
        DETAILS: (id: number | string) => `v2.2/films/${id}`,
        // Поиск по ключевому слову живет СТРОГО в v2.1
        SEARCH: (keyword: string, page: number) => 
            `v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`,
    },
    FILTERS: 'v2.2/films/filters',
} as const;