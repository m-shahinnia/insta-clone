import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeViews.vue";
// import ProfileView from "@/views/user/ProfileView.vue";
import ProfileViews from "@/views/ProfileViews.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/pro/:user",
      name: "ProfileViews",
      component: ProfileViews,
    },
  ],
});

export default router;
