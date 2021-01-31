import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { AxiosResponse } from "axios";
import {
  AsyncState,
  AsyncStatus,
  createAsyncFulfilled,
  createAsyncInitial,
  createAsyncPending,
  createAsyncRejected
} from "@/commons/async.status";
import { RootState } from "@/store";
import { MoviesActionTypes } from "@/store/modules/movies/movies.action.types";
import { ApiService } from "@/commons/api.service";
import { MoviesMutationTypes } from "@/store/modules/movies/movies.mutation.types";
import { Movie, MoviesResponseResults } from "@/commons/interfaces";
import { MoviesGetterTypes } from "@/store/modules/movies/movies.getter.types";

export interface MoviesState {
  create: AsyncState<Movie[]>;
  current: AsyncState<Movie[]>;
  single: AsyncState<Movie>;
}

const actions: ActionTree<MoviesState, RootState> = {
  [MoviesActionTypes.LOAD_MOVIES]: async ({ commit }) => {
    commit(MoviesMutationTypes.MOVIES_PENDING);
    try {
      const res: AxiosResponse<MoviesResponseResults> = await ApiService.get(
        "films/"
      );
      commit(MoviesMutationTypes.MOVIES_FULFILLED, res.data.results);
      return true;
    } catch (error) {
      commit(MoviesMutationTypes.MOVIES_REJECTED, error.response.data.error);
      console.error(error);
      return false;
    }
  },

  [MoviesActionTypes.GET_SINGLE_MOVIE]: async ({ state, commit, getters, dispatch }, id: number) => {
    try {
      if (!state.current.data) {
        await dispatch(MoviesActionTypes.LOAD_MOVIES);
      }
      const movies: Movie[] = getters[MoviesGetterTypes.MOVIES_LOADED];
      const singleMovie: Movie | undefined = movies.find(
        (val: Movie) => val.episode_id === Number(id)
      );
      commit(MoviesMutationTypes.SINGLE_MOVIE_FULFILLED, singleMovie);
      return true;
    } catch (error) {
      commit(MoviesMutationTypes.SINGLE_MOVIE_REJECTED, error);
      console.error(error);
      return false;
    }
  }
};

const mutations: MutationTree<MoviesState> = {
  [MoviesMutationTypes.MOVIES_PENDING](state) {
    state.current = createAsyncPending();
  },
  [MoviesMutationTypes.MOVIES_FULFILLED](state, data: Movie[]) {
    state.current = createAsyncFulfilled(data);
  },
  [MoviesMutationTypes.MOVIES_REJECTED](state, error: unknown) {
    state.create = createAsyncRejected(error);
  },
  [MoviesMutationTypes.SINGLE_MOVIE_FULFILLED](state, data: Movie) {
    state.single = createAsyncFulfilled(data);
  },
  [MoviesMutationTypes.SINGLE_MOVIE_REJECTED](state, error: unknown) {
    state.single = createAsyncRejected(error);
  }
};

const getters: GetterTree<MoviesState, RootState> = {
  [MoviesGetterTypes.MOVIES_LOADING]: (state): boolean => {
    return state.current.status === AsyncStatus.PENDING;
  },
  [MoviesGetterTypes.MOVIES_LOADED]: (state): Movie[] | null => {
    return state.current.data || null;
  },
  [MoviesGetterTypes.MOVIES_LOAD_REJECTED]: (state): boolean => {
    return state.current.status === AsyncStatus.REJECTED;
  },
  [MoviesGetterTypes.SINGLE_MOVIE_LOADING]: (state): boolean => {
    return state.single.status === AsyncStatus.PENDING;
  },
  [MoviesGetterTypes.SINGLE_MOVIE_LOADED]: (state): Movie | null => {
    return state.single.data || null;
  },
  [MoviesGetterTypes.SINGLE_MOVIE_LOAD_REJECTED]: (state): boolean => {
    return state.single.status === AsyncStatus.REJECTED;
  }
};

export default ((): Module<MoviesState, RootState> => {
  return {
    namespaced: true,
    actions,
    mutations,
    getters,
    state: {
      create: createAsyncInitial(),
      current: createAsyncInitial(),
      single: createAsyncInitial()
    }
  };
})();
