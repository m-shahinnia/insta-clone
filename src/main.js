import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "primeicons/primeicons.css";

import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";

// const app = createApp(App);

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: "aura-light",
    },
  },
});
app.use(PrimeVue);
app.use(createPinia());
app.use(router);
app.use(ToastService);

app.mount("#app");
