import { createLogger, createStore } from "vuex";
import movies, { MoviesState } from "./modules/movies/movies.module";

export enum StoreModule {
  MOVIES = "movies"
}

export interface RootState {
  [StoreModule.MOVIES]: MoviesState;
}
export const store = createStore<RootState>({
  modules: { movies },
  plugins: [createLogger()]
});
