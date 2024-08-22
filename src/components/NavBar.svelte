<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Sidebar from './Sidebar.svelte';
    import img from '$lib/image/Nav_Bar_Logo_For_StarWars_Franchise.jpeg';
    import img2 from '$lib/image/Nav_Bar_Logo_For_Marvel_Franchise.jpeg';

    const dispatch = createEventDispatcher();

    let logoPath = img;
    let sidebarOpen = false;
    let toggleButton;

    function selectFranchise(id: number) {
        if (id === 17) {
            logoPath = img;
        } else if (id === 4) {
            logoPath = img2;
        }
        dispatch('franchiseSelected', { id });
    }

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }

    function handleFranchiseSelected(event: CustomEvent<{ id: number }>) {
        selectFranchise(event.detail.id);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.code === 'Space') {
            toggleSidebar();
        }
    }
</script>

<nav class="navbar" aria-label="Main Navigation">
    <div class="navbar-left">
        <img src={logoPath} alt="Franchise-Logo" class="navbar-logo" />
    </div>
    <div class="navbar-right">
        <span class="nav-item">Shop the Collection</span>
        <i bind:this={toggleButton} class="fa-light fa-bars nav-icon" role="button" tabindex="0" on:click={toggleSidebar} on:keydown={handleKeydown}></i>
    </div>
</nav>

<div class="sidebar-wrapper">
    <Sidebar {sidebarOpen} {toggleButton} {selectFranchise} on:franchiseSelected={handleFranchiseSelected} />
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