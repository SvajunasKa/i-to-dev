export interface Movie {
  characters: string[];
  created: Date;
  director: string;
  edited: Date;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}

export interface MoviesResponseResults {
  results: Movie[];
}

export interface MovieResponseResults {
  results: Movie;
}
