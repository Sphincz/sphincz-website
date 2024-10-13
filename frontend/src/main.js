import "./plugins/plausible"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./plugins/router"
import i18n from "./plugins/i18n"
import Particles from "@tsparticles/vue3"

import "./scss/main.scss"
import "vue3-flag-icons/styles"
import { loadFull } from "tsparticles"

createApp(App)
	.use(router)
	.use(i18n)
	.use(Particles, {
		init: async (engine) => {
			await loadFull(engine)
		},
	})
	.mount("#app")
