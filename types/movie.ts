export interface Movie {
  id: number;
  title: string;
  name?: string; // sometimes tv shows use `name`
  overview: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
  [key: string]: any;
}

export interface TMDBListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
