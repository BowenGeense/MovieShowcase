<script lang="ts">
	import { onMount } from 'svelte';
	import Gallery from './Components/Gallery.svelte';
	import MovieDetail from './Components/MovieDetail.svelte';
	import NavBar from './Components/NavBar.svelte';
	import '/global.css';
	import type { Movie } from '/Interfaces/Movie';
	import type { Franchise } from '/Interfaces/Franchise';

	const apiUrl = '__API_URL__';
	let bearer = apiUrl;

	export let apiBaseURL: string;

	let movies: Movie[] = [];
	let currentIndex: number = -1;
	let showDetail = false;
	let currentMovie = movies[currentIndex];
	let franchiseId: number = 17; // Default to Star Wars

	async function fetchFranchiseData(id: number) : Promise<Movie[]> {
		try {
			console.log( 'bearer HERE : ' + apiUrl);
			const response = await fetch(`${apiBaseURL}lists/${id}/extended`, {
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
						const movieResponse = await fetch(`${apiBaseURL}movies/${entity.movieId}/extended?meta=translations`, {
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
						const movie: Movie = movieData.data;

						console.log('Fetched movie:', movie);

						return movie;
					});

			const movieResults = await Promise.all(moviePromises);
			movies = movieResults.filter(movie => movie !== null);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	function nextMovie() {
		setInterval(() => {
			if(!showDetail) {
				currentIndex = (currentIndex + 1) % movies.length;
			}
			currentMovie = movies[currentIndex];
			showDetail = !showDetail;
		}, 5000);
	}

	function backToGallery() {
		showDetail = false;
	}

	function handleFranchiseSelected(event) {
		franchiseId = event.detail.id;
		fetchFranchiseData(franchiseId);
	}

	onMount(() => {
		fetchFranchiseData(franchiseId);
		setTimeout(() => {
			nextMovie();
		}, 7000);
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