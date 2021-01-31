<template>
  <div class="app-home bg-gray-100 min-h-screen">
    <div v-if="moviesLoading">Loading....</div>
    <div
      v-else-if="moviesList"
      class="container mx-auto"
      v-for="(movie, index) in moviesList"
      :key="index"
    >
      <app-card>
        <template #title>
          {{ movie.title }}
        </template>
        {{ movie.opening_crawl.substring(0, 128) + "..." }}
      </app-card>
      <div @click="navigate(movie.episode_id)">{{ movie.url }}</div>
    </div>
    <div v-else-if="moviesRejected">Something went wrong, try again</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDispatch, useGetter } from "../../commons/store.service";
import { MoviesActionTypes } from "../../store/modules/movies/movies.action.types";
import { StoreModule } from "../../store";
import { MoviesGetterTypes } from "../../store/modules/movies/movies.getter.types";
import { Movie } from "../../commons/interfaces";
import AppCard from "../components/app-card.vue";
import router from "@/router";

export default defineComponent({
  name: "home",
  components: {
    AppCard
  },
  setup() {
    const moviesLoading = useGetter<boolean>(
      MoviesGetterTypes.MOVIES_LOADING,
      StoreModule.MOVIES
    );
    const movies = useDispatch(
      MoviesActionTypes.LOAD_MOVIES,
      StoreModule.MOVIES
    );
    const moviesRejected = useGetter<boolean>(
      MoviesGetterTypes.MOVIES_LOAD_REJECTED
    );
    const moviesList = useGetter<Movie[]>(
      MoviesGetterTypes.MOVIES_LOADED,
      StoreModule.MOVIES
    );
    const navigate = (arg: number) =>
      router.push({ name: "Movie", params: { id: arg } });
    movies();
    return { movies, moviesList, moviesLoading, moviesRejected, navigate };
  }
});
</script>
