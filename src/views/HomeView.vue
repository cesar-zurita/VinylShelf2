

<script setup>
/*
This is the Vue version of my previous Vanilla JS Vinyl Shelf project.
The goal of this version is to practice and implement Vue concepts
on top of an existing project.
*/

/*
This file represents a main Vue view.
It is intentionally kept simple to allow scalability and
easy updates by modifying components independently.
*/

    import Header from '../components/Header.vue';
    import RecordGrid from '../components/RecordGrid.vue';
    import RecordLightbox from '../components/RecordLightbox.vue';
    import { useRecordsStore } from '../stores/records';

    const recordStore = useRecordsStore();

    console.log(recordStore.records);
</script>

<template>
    <body>
        <Header></Header>
        <RecordGrid></RecordGrid>
        <RecordLightbox v-if="recordStore.selectedRecord"></RecordLightbox>
    </body>
</template>

<style scoped>
    body{
        background-color: #f8f9fa;
        line-height: 1.6;
        overflow-x: hidden;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>