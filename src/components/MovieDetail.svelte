<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import type { Movie } from '../interfaces/Movie';
    import type { OverviewTranslation } from '../interfaces/OverviewTranslation';

    export let movie: Movie;
    const dispatch = createEventDispatcher();

    function backToGallery() {
        dispatch('backToGallery');
    }

    const englishOverview = getEnglishOverview(movie.translations.overviewTranslations);

    function getEnglishOverview(translations: OverviewTranslation[]) {
        const englishTranslation = translations.find(translation => translation.language === 'eng');
        return englishTranslation ? englishTranslation.overview : 'Description not available';
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape' || event.key === 'Enter' || event.code === 'Space') {
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

<div class="movie-detail" role="button" tabindex="0" on:click={backToGallery} on:keydown={handleKeydown}>
    <img src={movie.image} alt={movie.name}/>
    <h2>{movie.name}</h2>
    <div class="additional-info">
        <h2>Release Year: {movie.year},  Duration: {movie.runtime} </h2>
        <p class="overview">{englishOverview}</p>
    </div>
</div>

<style>
    .movie-detail {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
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
        margin: 5px 0;
        font-size: 1.2em;
    }

    .additional-info {
        text-align: center;
        max-width: 80%;
        margin: 0 auto;
    }

    .overview {
        margin: 10px 0;
        padding: 0 20px;
        text-align: justify;
    }
</style>