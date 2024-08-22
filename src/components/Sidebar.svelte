<script lang="ts">
    import { createEventDispatcher} from 'svelte';
    export let sidebarOpen: boolean;
    export let toggleButton: HTMLElement | null;
    export let selectFranchise: (id: number) => void;

    const dispatch = createEventDispatcher();
    let sidebar: HTMLElement | null;

    function handleSelectFranchise(id: number) {
        selectFranchise(id);
        dispatch('franchiseSelected', { id });
        sidebarOpen = !sidebarOpen;
    }

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape' || event.key === 'Enter' || event.code === 'Space') {
            toggleSidebar();
        }
    }
</script>

<div bind:this={sidebar} class="sidebar" class:open={sidebarOpen}>
    <div class="icons">
        <i class="fa-light fa-magnifying-glass nav-icon"></i>
        <i class="fa-light fa-shopping-cart nav-icon"></i>
        <i class="fal fa-user nav-icon"></i>
        <i bind:this={toggleButton} class="fal fa-xmark nav-icon" role="button" tabindex="-1" on:click={toggleSidebar} on:keydown={handleKeydown}></i>
    </div>
    <button on:click={() => handleSelectFranchise(17)}>Star Wars</button>
    <button on:click={() => handleSelectFranchise(4)}>Marvel</button>
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

    .sidebar button {
        padding: 12px 20px;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 600;
        color: black;
        display: block;
        transition: background-color 0.3s ease;
        border: none;
        background: none;
        outline: none;
        cursor: pointer;
    }

    .sidebar button:hover {
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