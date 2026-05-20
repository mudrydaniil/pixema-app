export interface Genre {
    genre: string
}

export interface Country {
    country: string
}

export interface Movie {
    kinopoiskId: number
    nameRu: string | null
    nameEn: string | null
    nameOriginal: string | null
    posterUrl: string
    posterUrlPreview: string
    ratingKinopoisk: number | null
    year: number | null
    genres: Genre[]
    countries: Country[]
    type: string
}

export interface CatalogState {
    movies: Movie[]
    total: number
    isLoading: boolean
    error: string | null
}

export interface MovieDetail {
  kinopoiskId: number
  nameRu: string | null
  nameEn: string | null
  nameOriginal: string | null
  posterUrl: string
  ratingKinopoisk: number | null
  ratingImdb: number | null
  year: number
  filmLength: number | null
  description: string | null
  shortDescription: string | null
  type: string
  ratingAgeLimits: string | null
  genres: { genre: string }[]
  countries: { country: string }[]
  slogan: string | null
}

export interface MovieDetailState {
    movie: MovieDetail | null
    isLoading: boolean
    error: string | null
}