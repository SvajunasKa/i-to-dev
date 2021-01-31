import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../app/views/Home.vue";
import Movie from "../app/views/app-movie-page.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: Movie,
    props: true
  },
  { path: "/:pathMatch(.*)*", name: "notFound", component: Home }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
