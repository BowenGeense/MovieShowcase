<script lang="ts">
    import { onMount } from 'svelte';
    import Gallery from '../components/Gallery.svelte';
    import MovieDetail from '../components/MovieDetail.svelte';
    import NavBar from '../components/NavBar.svelte';
    import '/src/global.css';
    import type { Movie } from '../interfaces/Movie';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let movies: Movie[] = [];
    let currentIndex = -1;
    let showDetail = false;
    let currentMovie: Movie | undefined;
    let franchiseId: number;
    let error: string | null = null;

    $: {
        const { movies: loadedMovies } = $page.data;
        if (loadedMovies) {
            movies = loadedMovies;
            error = null;
        } else {
            error = "No movies loaded";
        }
    }

    function nextMovie() {
        setInterval(() => {
            if (!showDetail) {
                currentIndex = (currentIndex + 1) % movies.length;
                currentMovie = movies[currentIndex];
            }
            showDetail = !showDetail;
        }, 20000);
    }

    function backToGallery() {
        showDetail = false;
        currentMovie = undefined;
    }

    function handleFranchiseSelected(event: CustomEvent<{ id: number }>) {
        franchiseId = event.detail.id;
        goto(`/?franchiseId=${franchiseId}`);
    }

    function handleShowDetail(movie: Movie) {
        currentMovie = movie;
        showDetail = true;
    }

    onMount(() => {
        setTimeout(() => {
            nextMovie();
        }, 7000);
    });
</script>

<main>
    <NavBar on:franchiseSelected={handleFranchiseSelected} />
    <div class="content">
        {#if error}
            <p class="error">{error}</p>
        {/if}
        {#if showDetail && currentMovie}
            <MovieDetail movie={currentMovie} on:backToGallery={backToGallery} />
        {/if}
        <Gallery {movies} on:showDetail={(e) => handleShowDetail(e.detail.movie)} />
    </div>
</main>

<style>
    main {
        padding: 20px;
    }

    .content {
        margin-top: 20px;
    }

    .error {
        color: red;
        font-weight: bold;
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