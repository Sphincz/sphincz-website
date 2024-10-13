<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { Collapse } from "bootstrap"
import MenuIcon from "~icons/material-symbols/menu-rounded"
import InfoIcon from "~icons/material-symbols/info"
import ListIcon from "~icons/material-symbols/list-rounded"
import CodeIcon from "~icons/material-symbols/code-rounded"
import MailIcon from "~icons/material-symbols/mail-rounded"
import VueJSIcon from "~icons/simple-icons/vuedotjs"
import GoIcon from "~icons/simple-icons/go"
import FlagIcon from "vue3-flag-icons"
import { useI18n } from "vue-i18n"
import { availableLanguages } from "./plugins/i18n.js"

const transitionName = ref("fade")
const navbarShrink = ref(false)
const minimal = ref(true)
const showNav = ref(false)
const { t, locale } = useI18n()

const router = useRouter()
router.afterEach((to, from) => {
	if (from.href) {
		const routes = router.getRoutes()
		const fromIndex = routes.findIndex((o) => o.path === from.path)
		const toIndex = routes.findIndex((o) => o.path === to.path)
		transitionName.value = fromIndex < toIndex ? "slide-left" : "slide-right"
	}
	minimal.value = to.path === "/"
})

let collapse = null
const navbarResponsive = ref(null)
onMounted(() => {
	window.addEventListener("scroll", onScroll)
	collapse = new Collapse(navbarResponsive.value, {
		toggle: showNav.value,
	})
})

onUnmounted(() => {
	window.removeEventListener("scroll", onScroll)
})

const onScroll = () => {
	navbarShrink.value = window.scrollY > 0
}

const toggleNav = (show) => {
	if (show === undefined) {
		show = !showNav.value
	}
	if (show) {
		collapse.show()
		showNav.value = true
	} else {
		collapse.hide()
		showNav.value = false
	}
}

const currentLanguage = ref(availableLanguages[locale.value] || availableLanguages["en"])

const changeLanguage = (lang) => {
	locale.value = lang
	localStorage.setItem("lang", lang)
	currentLanguage.value = availableLanguages[lang] || availableLanguages["en"]
}

watch(locale, (newLocale) => {
	currentLanguage.value = availableLanguages[newLocale] || availableLanguages["en"]
})

onMounted(() => {
	const lang = localStorage.getItem("lang") || locale.value
	currentLanguage.value = availableLanguages[lang] || availableLanguages["en"]
})
</script>

<template>
	<a class="visually-hidden-focusable btn btn-primary position-absolute" href="#content"> Skip to main content </a>

	<nav class="navbar navbar-expand-md fixed-top navbar-dark" :class="{ 'navbar-shrink': navbarShrink }">
		<div class="container">
			<router-link to="/" class="navbar-brand" @click="toggleNav(false)">
				<span aria-hidden="true">&lt; sphincz &gt;</span>
				<span class="visually-hidden">António Raimundo</span>
			</router-link>
			<button
				class="navbar-toggler navbar-toggler-right"
				type="button"
				aria-controls="navbarResponsive"
				:aria-expanded="showNav"
				aria-label="Toggle navigation"
				@click="toggleNav()">
				<menu-icon />
				Menu
			</button>
			<div id="navbarResponsive" ref="navbarResponsive" class="collapse navbar-collapse">
				<ul class="navbar-nav ms-auto">
					<li class="nav-item">
						<router-link to="/about" class="nav-link rounded" @click="toggleNav(false)">
							<info-icon />
							{{ t("navbar.about") }}
						</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/skills" class="nav-link rounded" @click="toggleNav(false)">
							<list-icon />
							{{ t("navbar.skills") }}
						</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/projects" class="nav-link rounded" @click="toggleNav(false)">
							<code-icon />
							{{ t("navbar.projects") }}
						</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/contact" class="nav-link rounded" @click="toggleNav(false)">
							<mail-icon />
							{{ t("navbar.contact") }}
						</router-link>
					</li>
					<!-- Language Dropdown -->
					<li class="nav-item dropdown">
						<a
							id="languageDropdown"
							class="nav-link dropdown-toggle"
							href="#"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							<FlagIcon :code="currentLanguage.code" :size="14" />
							{{ currentLanguage.name }}
						</a>
						<ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="languageDropdown">
							<li>
								<a class="dropdown-item fw-light" href="#" @click.prevent="changeLanguage('en')">
									<FlagIcon code="gb" :size="14" />
									English
								</a>
							</li>
							<li>
								<a class="dropdown-item fw-light" href="#" @click.prevent="changeLanguage('pt')">
									<FlagIcon code="pt" :size="14" />
									Português
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<div
		v-if="showNav"
		class="position-absolute w-100 h-100 opacity-0"
		aria-hidden="true"
		style="z-index: 1000"
		@click="toggleNav(false)" />

	<div class="d-flex flex-column min-vh-100">
		<router-view id="content" v-slot="{ Component }" class="text-center">
			<transition :name="transitionName" mode="out-in" appear>
				<keep-alive>
					<component :is="Component" />
				</keep-alive>
			</transition>
		</router-view>

		<transition name="fade-in">
			<footer v-show="!minimal" class="mt-auto">
				<div class="container">
					<div class="row text-center">
						<div class="col-sm text-sm-start" aria-hidden="true">&lt; sphincz &gt;</div>
						<div class="col-sm">
							Made with
							<a href="//vuejs.org" target="_blank">
								<vue-j-s-icon />
							</a>
							and
							<a href="//golang.org" target="_blank">
								<go-icon />
							</a>
						</div>
						<div class="col-sm text-sm-end">&copy; {{ new Date().getFullYear() }} António Raimundo</div>
					</div>
				</div>
			</footer>
		</transition>
	</div>
</template>
