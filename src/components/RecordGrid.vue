<script setup>
    import { useRecordsStore } from '../stores/records';
    import RecordLightbox from './RecordLightbox.vue';

    const RecordsStore = useRecordsStore();


</script>

<template>
    <div class="albumGallery">
        <img @click="RecordsStore.selectRecord(record)" v-for="record in RecordsStore.displayedRecords" :key="record.id" :src="record.cover" :alt="record.title" />
    </div>
</template>

<style scoped>
    .albumGallery{
    display: grid;
    gap: 10px;
    padding: 10px;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}

    img{
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
    border-radius: 8px;
    cursor: pointer;
}

img:hover{
    opacity: 1;
    transform: scale(1.1);
}
</style>