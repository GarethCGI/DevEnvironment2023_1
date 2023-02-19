<template>
	<div class="centered">
		<h1>Bienvenid@ al entorno de Desarrollo Web</h1>
		<div class="strongest">
			{{ runtimeConfig.brand }}
		</div>
		<div class="identification" v-if="!checkAuth()">
			<div class="indication">
				Ingresa tu Id
			</div>
			<!-- Input with placeholder -->
			<input type="text" v-model="id" placeholder="Ingresa tu Id" />
			<!-- Button with text, on click event run validate function -->
			<button @click.passive="validate">Ingresar</button>
		</div>
		<div class="navigation" v-else>
			<div class="list">
				<ul>
					<li v-for="place in places" :key="place.name">
						<div class="place">
							{{ place.name }} <br />
							<!-- Open in new window -->
							<a :href="place.href" target="_blank">{{ place.value }}</a>
						</div>
					</li>
				</ul>
			</div>
			<button @click.passive="signOut">Salir</button>
		</div>
	</div>
</template>
<style scoped>
:root {
	--color-sea: #ff1e62;
	--color-sea-2: #ff0000;
}

h1 {
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
	margin: 0%;
	height: 70px;
	padding: 0%;
}

.indication {
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
	font-weight: 900;
	font-size: 5rem;
	font-family: 'Oswald', sans-serif;
	max-height: fit-content;
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
	background-color: #ff1e1e;
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

.list ul {
	list-style-type: none;
	padding: 0;
}

.list ul li {
	margin: 0;
}

.list ul li a {
	color: #ff1e1e;
	text-decoration: none;
	margin: 0;
}

.list ul li a:hover {
	text-decoration: underline;
}

.place {
	font-size: 1.5rem;
	font-family: 'Oswald', sans-serif;
}
</style>
<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();
let id = "";
let isAuthenticated = ref(false);
let places = ref<{ name: string, value: string, href: string }[]>([]);
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
			setIdOnStorage();
		}
		else {
			alert("Id no valido");
		}
	}
};
function setIdOnStorage() {
	localStorage.setItem("Id", id);
	getPlaces();
}
function retrieveId() {
	id = localStorage.getItem("Id") || "";
	if (id != "") {
		isAuthenticated.value = true;
	}
}
function checkAuth() {
	return isAuthenticated.value;
}
function signOut() {
	localStorage.removeItem("Id");
	isAuthenticated.value = false;
}
async function getPlaces() {
	let res = await useFetch("/api/places", {
		method: "POST",
		body: JSON.stringify({ id: id }),
	})
	places.value = res.data.value as { name: string, value: string, href: string }[];
}
definePageMeta({
	title: "Bienvenid@ al entorno de Desarrollo Web",
});

retrieveId();
getPlaces();
</script>
