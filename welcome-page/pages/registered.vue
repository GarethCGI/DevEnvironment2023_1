<template>
	<div class="centered">
		<h1>Registro al Entorno de desarrollo</h1>
		<div class="spacer"></div>
		<div class="strongest">
			{{ runtimeConfig.brand }}
		</div>
		<div class="navigation">
			<div class="list">
				<ul>
					<div class="id-container">
						<span class="marked">Id: </span>
						<span>{{ id }}</span>
					</div>
					<div class="passwd-container">
						<span class="marked">Contraseña: </span>
						<span>{{ passwd }}</span>
					</div>

				</ul>
			</div>
			<!-- Button that opens the url in a new window -->
			<a :href="'/'" target="_blank" class="button">
				<button>Ir al Sitio</button>
			</a>
		</div>
	</div>
</template>
<style scoped>
h1 {
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
	margin: 0%;
	height: 70px;
	padding: 0%;
	text-align: center;
}

li {
	list-style-type: none;
}

.list {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	margin: 0;
	padding: 0;
	font-family: Arial, Helvetica, sans-serif;
}

.id-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	font-size: 1.5rem;
}

.passwd-container {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	font-size: 1.5rem;
}

.marked {
	font-weight: 900;
}

.list {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	margin: 0;
	padding: 0;
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

.navigation {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	margin: 0;
	padding: 0;
}

.button {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100vw;
	margin: 0;
	padding: 0;
	text-decoration: none;
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
	text-decoration: none;
}
</style>
<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();
const { query, path } = useRoute();
console.log(query);
console.log(runtimeConfig);
let id = ref(query.id);
let passwd = ref(query.passwd);
definePageMeta({
	title: 'Registro al Entorno de desarrollo',
	meta: [
		{
			name: 'description',
			content: 'Registro al Entorno de desarrollo',
		},
	],
	layout: 'bare',
});
</script>