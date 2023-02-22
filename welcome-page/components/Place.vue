<!-- Place.vue -->
<template>
	<div class="place card shadow-sm">
		<div class="place__image card-img-top text-center p-3" v-if="place.imageUrl">
			<img :src="place.imageUrl" alt="place image" />
		</div>
		<div class="place__info card-body">
			<h2 class="place__title card-title">{{ place.title }}</h2>
			<p class="place__description card-text">{{ place.description }}</p>
			<div class="place__status d-flex align-items-center">
				<span class="place__status-text me-2">
					Estado:
				</span>
				<span class="place__status-icon">
					<i :class="{
						'fas fa-circle': online === 'online',
						'fas fa-circle text-danger': online === 'offline',
						'fas fa-circle-notch fa-spin': online === 'loading',
					}"
					:style="{
						color: online === 'online' ? 'green' : online === 'offline' ? 'red' : 'orange',
					}"
					></i>
				</span>
				<span class="place__status-text ms-2">
					{{ online === 'online' ? 'Online' : online === 'offline' ? 'Offline' : 'Cargando' }}
				</span>
			</div>
			<div class="place__actions d-flex justify-content-between">
				<div class="place__button place__button--boot" v-if="place.bootable && online == 'offline'">
					<button class="btn btn-primary" @click="startService">
						<i class="fas fa-power-off"></i>
						<span class="ms-2">Iniciar</span>
					</button>
				</div>
				<a :href="place.hostUrl" class="place__button place__button--open">
					<button class="btn btn-primary">
						<i class="fas fa-external-link-alt"></i>
						<span class="ms-2">Abrir</span>
					</button>
				</a>
			</div>
		</div>
	</div>
</template>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css');

button {
	background-color: var(--primary);
	border-color: var(--primary);
}
.place {
	background-color: var(--background);
	margin-left: 0.5rem;
	margin-right: 0.5rem;
	margin-bottom: 1rem;
	width: 90%;
	height: 100%;
	border-color: var(--text-primary);
}
.place__image {
	background-color: var(--background);
}
.place__image img {
	max-width: 100%;
	max-height: 100%;
}
.place__info {
	padding: 1rem;
}
.place__title {
	color: var(--text-primary);
	font-family: 'Oswald', sans-serif;
	font-size: 1.5rem;
}
.place__description {
	color: var(--text-primary);
	font-size: 1rem;
}
.place__status {
	color: var(--text-primary);
	font-size: 0.8rem;
}
.place__status-icon {
	font-size: 0.8rem;
}
.place__actions {
	margin-top: 1rem;
}
.place__button {
	margin-left: 0.5rem;
	margin-right: 0.5rem;
	margin-top: 0.5rem;
}
.place__button--boot {
	margin-left: 0;
}
</style>
<script lang="ts" setup>
import axios from 'axios';
type Place = {
	imageUrl: string | null;
	title: string;
	description: string;
	hostUrl: string;
	bootable: boolean;
};
const props = defineProps({
	place: {
		type: Object as PropType<Place>,
		required: true,
	},
});
let online = ref("loading");
const { hostUrl } = toRefs(props.place);
const checkOnline = async () => {
	online.value = "loading";
	const response = await axios.post("/api/servicestatus", {
		hostUrl: hostUrl.value,
	});
	if (!response.data) {
		online.value = "offline";
		return;
	}
	const data = response.data as { online: boolean };
	console.log(hostUrl.value);
	console.log(data);
	online.value = data.online ? "online" : "offline";
};
async function startService() {
	const res0 = await useFetch("/api/whoami");
	if (!res0.data.value) {
		alert("Sin sesión iniciada");
		return;
	}
	const res = await useFetch("/api/go", {
		method: "POST",
		body: JSON.stringify({ id: res0.data.value.id }),
	});
	if (res.data.value?.online) {
		alert("Servicio iniciando");
		setTimeout(() => {
			checkOnline();
		}, 1000 * 5);
	} else {
		alert("Error al solicitar inicio de servicio");
	}
}
checkOnline();
setInterval(() => {
	checkOnline();
}, 1000 * 60 * 5);
</script>