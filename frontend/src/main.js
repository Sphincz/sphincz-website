import "./plugins/plausible";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import Particles from "@tsparticles/vue3";

import "./scss/main.scss";
import { loadFull } from "tsparticles";

createApp(App)
  .use(router)
  .use(VueGoogleMaps, {
    load: {
      key: import.meta.env.VITE_GOOGLE_API_KEY,
    },
  })
  .use(Particles, {
    init: async (engine) => {
      await loadFull(engine);
    },
  })
  .mount("#app");
