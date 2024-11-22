import { createI18n } from "vue-i18n"

import messages from "@intlify/unplugin-vue-i18n/messages"

const i18n = createI18n({
	locale: localStorage.getItem("lang") || "en",
	fallbackLocale: "en",
	legacy: false,
	globalInjection: false,
	messages,
})
export default i18n
export { i18n }

const availableLanguages = {
	en: { name: "English", code: "gb" },
	pt: { name: "Português", code: "pt" },
}
export { availableLanguages }
