import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Icons from "unplugin-icons/vite"
import autoprefixer from "autoprefixer"
import { fileURLToPath } from "node:url"
import { resolve, dirname } from "node:path"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: true,
		port: 3000,
		watch: {
			usePolling: true,
		},
	},
	plugins: [
		VueI18nPlugin({
			include: resolve(dirname(fileURLToPath(import.meta.url)), "src/locales/**"),
		}),
		Icons({
			compiler: "vue3",
			autoInstall: true,
		}),
		vue(),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("src", import.meta.url)),
		},
	},
	optimizeDeps: {
		include: ["fast-deep-equal"],
	},
	css: {
		postcss: {
			plugins: [autoprefixer({})],
		},
	},
})
