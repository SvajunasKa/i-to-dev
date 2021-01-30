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
import { RootState } from "@/store/index";
import { ActionTypes } from "@/store/action.types";
import { ApiService } from "@/commons/api.service";
import { MutationTypes } from "@/store/mutation.types";
import { Movies, ResponseResults } from "@/commons/interfaces";
import { GetterTypes } from "@/store/getter.types";

export interface MoviesState {
  create: AsyncState<Movies[]>;
  current: AsyncState<Movies[]>;
}

const actions: ActionTree<MoviesState, RootState> = {
  [ActionTypes.LOAD_MOVIES]: async ({ commit }) => {
    commit(MutationTypes.MOVIES_PENDING);
    try {
      const res: AxiosResponse<ResponseResults> = await ApiService.get(
        "films/"
      );
      commit(MutationTypes.MOVIES_FULFILLED, res.data.results);
      return true;
    } catch (error) {
      commit(MutationTypes.MOVIES_REJECTED, error.response.data.error);
      console.error(error);
      return false;
    }
  }
};

const mutations: MutationTree<MoviesState> = {
  [MutationTypes.MOVIES_PENDING](state) {
    state.create = createAsyncPending();
  },
  [MutationTypes.MOVIES_FULFILLED](state, data: Movies[]) {
    state.current = createAsyncFulfilled(data);
  },
  [MutationTypes.MOVIES_REJECTED](state, error: unknown) {
    state.create = createAsyncRejected(error);
  }
};

const getters: GetterTree<MoviesState, RootState> = {
  [GetterTypes.MOVIES_LOADING]: (state): boolean => {
    return state.create.status === AsyncStatus.PENDING;
  },

  [GetterTypes.MOVIES_LOADED]: (state): Movies[] | null => {
    return state.current.data || null;
  },

  [GetterTypes.MOVIES_LOAD_REJECTED]: (state): boolean => {
    return state.current.status === AsyncStatus.REJECTED;
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
      current: createAsyncInitial()
    }
  };
})();
