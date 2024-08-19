<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Movie } from '../Interfaces/Movie';
    import '/global.css';

    export let movie: Movie;

    const dispatch = createEventDispatcher();
    let leftClass = '';
    let rightClass = '';

    function next() {
        animate('next');
    }

    function prev() {
        animate('prev');
    }

    function animate(direction) {
        leftClass = 'swipe-up';
        rightClass = 'swipe-down';
        setTimeout(() => {
            dispatch(direction);
            leftClass = '';
            rightClass = '';
        }, 500);
    }
</script>

<div class="slide">
    <div class="left {leftClass}">
        <img src={movie.image} alt={movie.name} />
    </div>
    <div class="right {rightClass}">
        <h2>{movie.name}</h2>
        <div class="additional-info">
            <h2>Release Year: {movie.year}</h2>
            <h2>Duration: {movie.runtime} minutes</h2>
        </div>
    </div>
    <button on:click={prev} class="nav left-nav">&#9664;</button>
    <button on:click={next} class="nav right-nav">&#9654;</button>
</div>