import { createRouter, createWebHistory } from "vue-router";
import TrafficLights from "../views/TrafficLights.vue";

const routes = [
  {
    path: "/green",
    name: "green",
    component: TrafficLights,
  },
  {
    path: "/red",
    name: "red",
    component: TrafficLights,
  },
  {
    path: "/yellow",
    name: "yellow",
    component: TrafficLights,
  },
  //перенаправление всех неизвестных URL-адресов на `/red`
  { path: "/:pathMatch(.*)*", redirect: "/red" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.afterEach((to) => {
//   let items = document.querySelectorAll("div.circle");
//   // console.log(items);
//   for (let item of items) {
//     // console.log(items);
//     if (!item.matches(`.${to.name}`)) item.classList.add("off");
//     else item.classList.remove("off");
//   }
// });

export default router;
