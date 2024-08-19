<script lang="ts">
	import { onMount } from 'svelte';
	import Slide from './Components/Slide.svelte';
	import type { Movie } from '/Interfaces/Movie';
	import type { Franchise } from '/Interfaces/Franchise';
	import '/global.css';
	export let bearer: string

	let movies: Movie[] = [];
	let currentIndex: number = 0;

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

	function nextMovie() {
		currentIndex = (currentIndex + 1) % movies.length;
	}

	function prevMovie() {
		currentIndex = (currentIndex - 1 + movies.length) % movies.length;
	}

	onMount(fetchFranchiseData);
</script>

<main>
	{#if movies.length > 0}
		<Slide movie={movies[currentIndex]} on:next={nextMovie} on:prev={prevMovie} />	{:else}
		<h1>Loading...</h1>
	{/if}
</main>
