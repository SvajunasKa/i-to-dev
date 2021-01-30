<template>
  <div class="app-home bg-gray-100 min-h-screen" >
    <div class="container mx-auto" v-for="(movie, index) in moviesList" :key="index">
      <app-card>
        <template #title>
          {{movie.title}}
        </template>
        {{movie.opening_crawl.substring(0, 128) + '...'}}
      </app-card>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {useDispatch, useGetter} from "@/commons/store.service";
import { ActionTypes } from "@/store/action.types";
import { StoreModule } from "@/store";
import {GetterTypes} from "@/store/getter.types";
import {Movies} from "@/commons/interfaces";
import AppCard from "../components/app-card.vue";

export default defineComponent({
  name: "home",
  components: {
    AppCard
  },
  setup() {
    const movies = useDispatch(ActionTypes.LOAD_MOVIES, StoreModule.MOVIES);
    movies();
    const moviesList = useGetter<Movies[]>(GetterTypes.MOVIES_LOADED, StoreModule.MOVIES);
    console.log(moviesList.value)

    return { movies, moviesList };
  }
});
</script>
