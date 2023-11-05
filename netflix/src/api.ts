const API_KEY = '1c9fa411020ea19bf92d1e8689870164';
const BASE_PATH = 'https://api.themoviedb.org/3'

interface IGetMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
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



const a =`https://api.themoviedb.org/3/movie/popular?api_key=1c9fa411020ea19bf92d1e8689870164`

const b =`https://api.themoviedb.org/3/movie/top_rated?api_key=1c9fa411020ea19bf92d1e8689870164`

const c =`https://api.themoviedb.org/3/movie/upcoming?api_key=1c9fa411020ea19bf92d1e8689870164`

const d =`https://api.themoviedb.org/3/tv/latest?api_key=1c9fa411020ea19bf92d1e8689870164`

const e =`https://api.themoviedb.org/3/tv/airing_today?api_key=1c9fa411020ea19bf92d1e8689870164`

const f =`https://api.themoviedb.org/3/tv/popular?api_key=1c9fa411020ea19bf92d1e8689870164`

const g =`https://api.themoviedb.org/3/tv/top_rated?api_key=1c9fa411020ea19bf92d1e8689870164`
