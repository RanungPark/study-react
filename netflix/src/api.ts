const API_KEY = '1c9fa411020ea19bf92d1e8689870164';
const BASE_PATH = 'https://api.themoviedb.org/3'

interface IGetMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  original_name?: string;
  media_type?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  first_air_date?: string;
}

export interface IGetMoviesResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IGetMovie[];
  total_pages: number;
  total_results: number;
}

export function getNowPlayingMovies () {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(response => response.json())
}

export function getPopularMovies () {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(response => response.json())
}

export function getTopRatedMovies () {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(response => response.json())
}

export function getUpcomingMovies () {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(response => response.json())
}

export function getAiringTodayTv () {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(response => response.json())
}

export function getOnTheAirTv () {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(response => response.json())
}

export function getPopularTv () {
  return fetch(`${BASE_PATH}//tv/popular?api_key=${API_KEY}`).then(response => response.json())
}

export function getTopRatedTv () {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(response => response.json())
}

export function getSearchMovies (query: string) {
  return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${query}`).then(response => response.json())
}

export function getSearchTv (query: string) {
  return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${query}`).then(response => response.json())
}
