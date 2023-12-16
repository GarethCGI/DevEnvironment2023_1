<script lang="ts" setup>

const runtimeConfig = useRuntimeConfig();
let id = "";
let isAuthenticated = ref(false);
let places = ref<{ name: string, value: string, href: string, bootable: boolean }[]>([]);
async function validate() {
	if (id == "") {
		alert("Ingresa tu Id");
	} else {
		let res = await useFetch("/api/validate", {
			method: "POST",
			body: JSON.stringify({ id: id }),
		})
		let v = res.data.value as { isValid: boolean, url?: string }
		if (v.isValid) {
			isAuthenticated.value = true;
			await useFetch("/api/cookieme", {
				method: "POST",
				body: JSON.stringify({ id: id }),
			})
		}
		else {
			alert("Id no valido");
		}
	}
	await retrieveId();
};
async function retrieveId() {
	let res = await useFetch("/api/whoami");
	if (res.data.value != null) {
		id = res.data.value!.id ? res.data.value.id : "";
		isAuthenticated.value = id != "";
	}
}
function signOut() {
	useFetch("/api/signout");
	id = "";
	isAuthenticated.value = false;
}
async function getPlaces() {
	let res = await useFetch("/api/places", {
		method: "POST",
		body: JSON.stringify({ id: id }),
	})
	places.value = res.data.value as { name: string, value: string, href: string, bootable: boolean }[];
}
definePageMeta({
	title: "Bienvenid@ al entorno de Desarrollo Web",
});

onMounted(() => {
	(async () => {
		await retrieveId();
		if (isAuthenticated.value) {
			await getPlaces();
		}
	})();
	setInterval(async () => {
		await retrieveId();
		if (isAuthenticated.value) {
			await getPlaces();
		}
	}, 10000);
});
</script>

<template>
	<div class="centered">
		<h1>Bienvenid@ al entorno de Desarrollo Web</h1>
		<div class="strongest">
			{{ runtimeConfig.public.brand }}
		</div>
		<div v-if="runtimeConfig.public.isGoodbye" class="deprecation">
			{{ runtimeConfig.public.goodbyeMessage }}
		</div>
		<div v-else>
			<div class="identification" v-if="!isAuthenticated">
				<div class="indication">
					Ingresa tu Id
				</div>
				<!-- Input with placeholder -->
				<input type="text" v-model="id" placeholder="Ingresa tu Id" />
				<!-- Button with text, on click event run validate function -->
				<button @click.passive="validate" class="separation">Ingresar</button>
			</div>
			<div class="navigation" v-else>
				<!-- Contains Cards -->
				<div class="place-container d-flex flex-wrap justify-content-center">
					<div v-for="preplace in places" :key="preplace.name">
						<Place
							:place="{ imageUrl: null, title: preplace.name, description: preplace.value, hostUrl: preplace.href, bootable: preplace.bootable }" />
					</div>
				</div>
				<button @click.passive="signOut" class="separation">Salir</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
h1 {
	color: var(--text-primary);
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
	margin: 0%;
	height: 70px;
	padding: 0%;
}

.place-container {
	width: 100%;
	height: 100%;
}

.indication {
	color: var(--text-primary);
	font-size: 1.5rem;
	font-family: 'Century Gothic', sans-serif;
	max-height: fit-content;
	margin: 1rem;
}

.centered {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.strongest {
	color: var(--text-primary);
	font-weight: 900;
	font-size: 5rem;
	font-family: 'Oswald', sans-serif;
	max-height: fit-content;
}

.deprecation {
	color: var(--text-primary);
	font-size: 1.5rem;
	font-family: 'Century Gothic', sans-serif;
	max-height: fit-content;
	margin: 1rem;
}

.separation {
	margin: 1rem;
}

@media screen and (max-width: 600px) {
	.strongest {
		visibility: hidden;
	}
}


.identification {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	margin: 0;
	padding: 0;
}

.navigation {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	margin: 0;
	padding: 0;
}

input {
	width: 70%;
	height: 50px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 12px 20px;
	box-sizing: border-box;
}

button {
	width: 70%;
	height: 50px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 12px 20px;
	box-sizing: border-box;
	background-color: var(--primary);
	color: white;
}

.list {
	width: 80%;
	height: 70%;
	border-radius: 4px;
	box-sizing: border-box;
	overflow-y: scroll;
	overflow-x: visible;
}
</style>