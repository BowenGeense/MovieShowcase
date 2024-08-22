<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    export let sidebarOpen: boolean;
    export let toggleButton;
    export let selectFranchise: (id: number) => void;

    const dispatch = createEventDispatcher();
    let sidebar;

    function handleSelectFranchise(id) {
        selectFranchise(id);
        sidebarOpen = !sidebarOpen;
    }

    function handleClickOutside(event) {
        if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
            sidebarOpen = false;
        }
    }

    function closeSidebar() {
        sidebarOpen = !sidebarOpen;
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
    });

    onDestroy(() => {
        document.removeEventListener('click', handleClickOutside);
    });
</script>

<div bind:this={sidebar} class="sidebar" class:open={sidebarOpen}>
    <div class="icons">
        <i class="fa-light fa-magnifying-glass nav-icon"></i>
        <i class="fa-light fa-shopping-cart nav-icon"></i>
        <i class="fal fa-user nav-icon"></i>
        <i class="fal fa-xmark nav-icon" on:click={closeSidebar}></i>
    </div>
    <a href="#" on:click={() => handleSelectFranchise(17)}>Star Wars</a>
    <a href="#" on:click={() => handleSelectFranchise(4)}>Marvel</a>
</div>

<style>
    .sidebar {
        height: 100%;
        width: 250px;
        position: fixed;
        top: 0;
        right: -250px;
        background-color: white;
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
        transition: right 0.3s ease;
        padding-top: 60px;
        z-index: 1000;
        border-radius: 50px 0 0 50px;
    }

    .sidebar a {
        padding: 12px 20px;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 600;
        color: black;
        display: block;
        transition: background-color 0.3s ease;
    }

    .sidebar a:hover {
        background-color: #f0f0f0;
    }

    .sidebar.open {
        right: 0;
    }

    .icons {
        display: flex;
        flex-direction: row;
        gap: 20px;
        margin: 20px;
    }

    .nav-icon {
        font-size: 2rem;
        margin: 10px 0;
        color: black;
        cursor: pointer;
    }
</style>