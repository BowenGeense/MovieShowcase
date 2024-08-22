<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Movie } from '../interfaces/Movie';

    export let movies: Movie[];
    const dispatch = createEventDispatcher();

    function showDetail(movie: Movie, event: MouseEvent) {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const position = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        dispatch('showDetail', { movie, position });
    }

    function handleKeydown(event: KeyboardEvent, movie: Movie) {
        if (event.key === 'Enter' || event.key === ' ') {
            showDetail(movie, event as unknown as MouseEvent);
        }
    }
</script>

<div class="gallery">
    {#each movies as movie}
        <div class="movie" role="button" tabindex="0" on:click={(event) => showDetail(movie, event)} on:keydown={(event) => handleKeydown(event, movie)}>
            <img src={movie.image} alt={movie.name} />
            <h2>{movie.name}</h2>
            <span>Released {movie.year}</span>
        </div>
    {/each}
</div>

<style>
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;
    }

    .movie {
        cursor: pointer;
        text-align: center;
        transition: transform 0.3s, box-shadow 0.3s;
        border: 1px solid #ddd;
        border-radius: 10px;
        overflow: hidden;
        background-color: white;
    }

    .movie:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .movie img {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #ddd;
    }

    .movie h2 {
        margin: 5px 0;
        font-size: 1rem;
        font-weight: 900;
        color: #333;
    }

    .movie span {
        margin: 10px 0;
        font-size: 1rem;
        font-weight: 100;
        font-style: italic;
        color: #757575;
    }

    @media (max-width: 768px) {
        .gallery {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }

        .movie h2 {
            font-size: 0.9rem;
        }
    }
</style>