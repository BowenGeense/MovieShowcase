<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Sidebar from './Sidebar.svelte';

    const dispatch = createEventDispatcher();
    let logoPath = '/images/movieshowcase.jpeg';
    let sidebarOpen = false;
    let toggleButton;

    function selectFranchise(id) {
        if (id === 17) {
            logoPath = '/images/movieshowcase.jpeg';
        } else if (id === 4) {
            logoPath = '/images/marvel_logo.jpeg';
        }
        dispatch('franchiseSelected', { id });
    }

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }
</script>

<nav class="navbar" aria-label="Main Navigation">
    <div class="navbar-left">
        <img src={logoPath} alt="TVDB Logo" class="navbar-logo" />
    </div>
    <div class="navbar-right">
        <span class="nav-item">Shop the Collection</span>
        <i bind:this={toggleButton} class="fa-light fa-bars nav-icon" on:click={toggleSidebar}></i>
    </div>
</nav>

<div class="sidebar-wrapper">
    <Sidebar {sidebarOpen} {toggleButton} on:franchiseSelected={selectFranchise} {selectFranchise} />
</div>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        background-size: cover;
        background-color: white;
        color: black;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .navbar-logo {
        width: 150px;
        border-radius: 10px;
        height: auto;
    }

    .navbar-right {
        display: flex;
        align-items: center;
    }

    .nav-item {
        margin-right: 20px;
        font-size: 1.5rem;
        font-style: italic;
        font-family: Crimson-Text;
        color: black;
    }

    .nav-icon {
        font-size: 2rem;
        margin-left: 10px;
        color: black;
        cursor: pointer;
    }

    .sidebar-wrapper {
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
    }
</style>