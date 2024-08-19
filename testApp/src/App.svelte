<!-- App.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Gallery from './Components/Gallery.svelte';
	import MovieDetail from './Components/MovieDetail.svelte';
	import NavBar from './Components/NavBar.svelte';
	import '/global.css';
	import type { Movie } from '/Interfaces/Movie';
	import type { Franchise } from '/Interfaces/Franchise';

	export let bearer: string;

	let movies: Movie[] = [];
	let currentIndex: number = -1;
	let showDetail: boolean = false;
	let currentMovie: Movie = null;
	let franchiseId: number = 17; // Default to Star Wars

	async function fetchFranchiseData(id: number) {
		try {
			const response = await fetch(`https://api4.thetvdb.com/v4/lists/${id}/extended`, {
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
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	function nextMovie() {
		currentIndex = (currentIndex + 1) % movies.length;
		currentMovie = movies[currentIndex];
		showDetail = true;
		setTimeout(() => {
			showDetail = false;
			setTimeout(() => {
				nextMovie();
			}, 10000);
		}, 30000);
	}

	function backToGallery() {
		showDetail = false;
	}

	function handleFranchiseSelected(event) {
		console.log('Franchise selected:', event.detail.id.detail.id);
		franchiseId = event.detail.id.detail.id;
		fetchFranchiseData(franchiseId);
	}

	onMount(() => {
		fetchFranchiseData(franchiseId);
		setTimeout(() => {
			nextMovie();
		}, 10000);
	});
</script>

<main>
	<NavBar on:franchiseSelected={handleFranchiseSelected} />
	<div class="content">
		{#if showDetail && currentMovie}
			<MovieDetail movie={currentMovie} on:backToGallery={backToGallery} />
		{:else}
			<Gallery {movies} on:showDetail={(e) => { currentMovie = e.detail.movie; showDetail = true; }} />
		{/if}
	</div>
</main>

<style>
	main {
		padding: 20px;
	}

	.content {
		margin-top: 20px;
	}

	@media (max-width: 768px) {
		main {
			padding: 10px;
		}

		.content {
			margin-top: 10px;
		}
	}
</style>