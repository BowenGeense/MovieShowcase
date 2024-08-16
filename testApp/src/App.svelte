<script lang="ts">
	import { onMount } from 'svelte';
	import type { Movie } from '/Interfaces/Movie';
	import type { Franchise } from '/Interfaces/Franchise';
	export let bearer: string;

	let movies: Movie[] = [];

	async function fetchFranchiseData() {
		try {
			const response = await fetch('https://api4.thetvdb.com/v4/lists/17/extended', {
				method: 'GET',
				headers: {
					'accept': 'application/json',
					'Authorization': bearer
				}
			});

			if (!response.ok) {
				console.error('Failed to fetch franchise data:', response.statusText);
				return;
			}

			const data = await response.json();
			const franchise: Franchise = data.data;
			console.log('franchise', franchise);

			// Fetch movie details for each entity with a movieId
			const moviePromises = franchise.entities
					.filter(entity => entity.movieId)
					.map(async entity => {
						const movieResponse = await fetch(`https://api4.thetvdb.com/v4/movies/${entity.movieId}`, {
							method: 'GET',
							headers: {
								'accept': 'application/json',
								'Authorization': bearer
							}
						});

						if (!movieResponse.ok) {
							console.error(`Failed to fetch movie data for ID ${entity.movieId}:`, movieResponse.statusText);
							return null;
						}

						const movieData = await movieResponse.json();
						return movieData.data;
					});

			const movieResults = await Promise.all(moviePromises);
			movies = movieResults.filter(movie => movie !== null);
			console.log('Movies array length:', movies.length);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	onMount(fetchFranchiseData);
</script>

<main>
	{#if movies.length > 0}
		{#each movies as movie}
			<div>
				<img src={movie.image} alt={movie.name} />
				<h2>{movie.name}</h2>
			</div>
		{/each}
	{:else}
		<h1>Loading...</h1>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #000000;
		text-transform: uppercase;
		font-size: 6em;
		font-weight: 1000;
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		text-shadow:
				-3px -3px 0 #ffe81f,
				3px -3px 0 #ffe81f,
				-3px 3px 0 #ffe81f,
				3px 3px 0 #ffe81f; /* Font border effect */
	}

	h1::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
		animation: loading 2s infinite;
	}

	@keyframes loading {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	img {
		max-width: 100%;
		height: auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>