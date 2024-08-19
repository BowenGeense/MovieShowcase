<!-- Sidebar.svelte -->
<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    export let sidebarOpen: boolean;

    const dispatch = createEventDispatcher();

    function selectFranchise(id) {
        console.log('Franchise selected:', id);
        dispatch('franchiseSelected', { id });
        sidebarOpen = (false);
    }

    function handleClickOutside(event) {
        if (!event.target.closest('.sidebar, .fa-bars')) {
            sidebarOpen = (false);
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
    });

    onDestroy(() => {
        document.removeEventListener('click', handleClickOutside);
    });
</script>

<div class="sidebar" class:open={sidebarOpen}>
    <a href="#" on:click={() => selectFranchise(17)}>Star Wars</a>
    <a href="#" on:click={() => selectFranchise(4)}>Marvel</a>
</div>

<style>
    .sidebar {
        height: 100%;
        width: 250px;
        position: fixed;
        top: 0;
        right: -250px;
        background-color: white;
        box-shadow: -2px 0 5px rgba(0,0,0,0.5);
        transition: right 0.3s;
        padding-top: 60px;
        z-index: 1000;
    }

    .sidebar a {
        padding: 10px 15px;
        text-decoration: none;
        font-size: 1.5rem;
        color: black;
        display: block;
        transition: background-color 0.3s;
    }

    .sidebar a:hover {
        background-color: #ddd;
    }

    .sidebar.open {
        right: 0;
    }
</style>