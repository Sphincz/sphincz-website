import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import SkillsView from "../views/SkillsView.vue"
import ProjectsView from "../views/ProjectsView.vue"
import ContactView from "../views/ContactView.vue"
import NotFoundView from "../views/NotFoundView.vue"
import { ApiPath } from "../config/api"
import { i18n } from "../plugins/i18n"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	linkActiveClass: "active",
	routes: [
		{
			path: "/",
			component: HomeView,
			meta: { title: "misc.homepage" },
		},
		{
			path: "/about",
			component: AboutView,
			meta: { title: "navbar.about" },
		},
		{
			path: "/skills",
			component: SkillsView,
			meta: { title: "navbar.skills" },
		},
		{
			path: "/projects",
			component: ProjectsView,
			meta: { title: "navbar.projects" },
		},
		{
			path: "/contact",
			component: ContactView,
			meta: { title: "navbar.contact" },
		},
		{
			path: "/_",
			redirect() {
				window.location.href = ApiPath("/_")
			},
		},
		{
			path: "/:wildcard(.*)",
			component: NotFoundView,
			meta: { title: "Not Found" },
		},
	],
})

router.beforeEach((to, from, next) => {
	if (to.meta.title && to.meta.title !== "Home") {
		const translatedTitle = i18n.global.t(to.meta.title) // Use the i18n instance
		document.title = `${translatedTitle} @ Sphincz Personal Website`
	} else {
		document.title = "Sphincz Personal Website"
	}
	next()
})

export default router
