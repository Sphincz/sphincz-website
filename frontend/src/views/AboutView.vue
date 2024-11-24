<script setup>
import { useI18n } from "vue-i18n"
const { t } = useI18n()
</script>
<template>
	<section class="pt-page">
		<div class="container">
			<div class="row mb-4">
				<div class="col">
					<h1>{{ t("about.title") }}</h1>
				</div>
			</div>
			<div class="row mb-3">
				<div class="col-auto me-auto text-start">
					<div class="m-2 mx-auto d-block mx-auto" style="width: 180px">
						<img class="img-fluid rounded-circle" src="../assets/me.png" alt="Raimundo's Avatar" />
					</div>
					<p>{{ t("about.subtitle") }}</p>
					<p>{{ t("about.desc1") }}</p>
					<p>{{ t("about.desc2") }}</p>
					<p>
						<i18n-t keypath="about.desc3">
							<template #projectLink>
								<router-link to="/projects">{{ t("navbar.projects") }}</router-link>
							</template>
						</i18n-t>
					</p>
					<p>
						<i18n-t keypath="about.desc4">
							<template #contactMe>
								<router-link to="/contact">{{ t("about.contactme") }}</router-link>
							</template>
						</i18n-t>
					</p>
				</div>
			</div>
		</div>
	</section>
</template>
