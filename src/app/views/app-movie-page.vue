<template>
  <div v-if="moviesLoading">Loading....</div>
  <app-card v-else>
    <template #title>
      {{ singleMovie?.title }}
    </template>

  </app-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useDispatch, useGetter } from "@/commons/store.service";
import { StoreModule } from "@/store";
import AppCard from "../components/app-card.vue";
import { MoviesActionTypes } from "@/store/modules/movies/movies.action.types";
import { MoviesGetterTypes } from "@/store/modules/movies/movies.getter.types";
import { Movie } from "@/commons/interfaces";

export default defineComponent({
  name: "app-movie-page",
  components: {
    AppCard
  },
  props: {
    id: String
  },
  setup(props) {
    const moviesLoading = useGetter<boolean>(
        MoviesGetterTypes.MOVIES_LOADING,
        StoreModule.MOVIES
    );
    const loadMovie = useDispatch(
      MoviesActionTypes.GET_SINGLE_MOVIE,
      StoreModule.MOVIES
    );
    const singleMovie = useGetter<Movie>(
      MoviesGetterTypes.SINGLE_MOVIE_LOADED,
      StoreModule.MOVIES
    );
    loadMovie(props.id as undefined);
    return { singleMovie, moviesLoading };
  }
});
</script>

<style scoped></style>
