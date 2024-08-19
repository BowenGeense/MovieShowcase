<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Movie } from '../Interfaces/Movie';
    import { scale } from 'svelte/transition';

    export let movie: Movie;
    const dispatch = createEventDispatcher();

    function backToGallery() {
        dispatch('backToGallery');
    }
</script>

<div class="movie-detail" on:click={backToGallery} in:scale={{ duration: 500 }} out:scale={{ duration: 500 }}>
    <img src={movie.image} alt={movie.name} />
    <h2>{movie.name}</h2>
    <div class="additional-info">
        <h2>Release Year: {movie.year}</h2>
        <h2>Duration: {movie.runtime} minutes</h2>
    </div>
    <div class="old-school-ad">
        Now on 4K, Blu-Ray & Digital
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
        object-fit: contain;
    }

    .movie-detail h2 {
        margin: 10px 0;
    }

    .additional-info {
        text-align: center;
    }

    .old-school-ad {
        margin-top: 20px;
        padding: 10px 20px;
        background: #318edc;
        color: white;
        display: none;
        font-size: 1.5rem;
        font-weight: bold;
        border-radius: 5px;
        text-align: center;
        position: relative;
    }
</style>