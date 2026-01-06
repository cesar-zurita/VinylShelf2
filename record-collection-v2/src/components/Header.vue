<script setup>
import FiltersBar from './FiltersBar.vue';


</script>

<template>
    
    <header>
        <div class="title">
            <h1>Vinyl Shelf 2.0</h1>
        </div>
        <FiltersBar />
    </header>
</template>

<style scoped>
    header{
        background: linear-gradient(145deg, var(--primary), var(--secondary));
        padding: 1.2rem;
        position: relative;
        z-index: 100;
        box-shadow: var(--shadow);
        display: flex;
        flex-direction: column;
        width: 100%;
    }
</style>