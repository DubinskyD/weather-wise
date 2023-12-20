import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "../views/MainView.vue";
import FavoritesView from "../views/FavoritesView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: FavoritesView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
