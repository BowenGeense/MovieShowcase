<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import type { Movie } from '../Interfaces/Movie';
    import { scale } from 'svelte/transition';

    export let movie: Movie;
    const dispatch = createEventDispatcher();

    function backToGallery() {
        dispatch('backToGallery');
    }

    function getEnglishDescription(translations = movie.overviewTranslations) {
        const englishTranslation = translations.find(translation => translation.language === 'eng');
        return englishTranslation ? englishTranslation.overview : 'Description not available';
    }
    const englishDescription = getEnglishDescription(movie.overviewTranslations);

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            backToGallery();
        }
    }
    onMount(() => {
        window.addEventListener('keydown', handleKeydown);
    });

    onDestroy(() => {
        window.removeEventListener('keydown', handleKeydown);
    });
</script>

<div class="movie-detail" role="button" on:click={backToGallery} in:scale={{ duration: 500 }}
     out:scale={{ duration: 500 }}>
    <img src={movie.image} alt={movie.name}/>
    <h2>{movie.name}</h2>
    <div class="additional-info">
        <h2>Release Year: {movie.year}</h2>
        <h2>Duration: {movie.runtime} minutes</h2>
        <p>{englishDescription}</p>
    </div>
</div>

<style>
    .movie-detail {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.8);
        color: #cacaca;
        cursor: pointer;
        transform-origin: center;
    }

    .movie-detail img {
        max-width: 80%;
        max-height: 60%;
        border-radius: 10px;
        object-fit: contain;
    }

    .movie-detail h2 {
        margin: 10px 0;
    }

    .additional-info {
        text-align: center;
    }
</style>