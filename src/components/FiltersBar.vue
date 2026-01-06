<script setup>
    /*
    FiltersBar Component
    Handles user input for filtering records.
    */

    /*
    Includes required inputs, a store reference,
    and temporary debug logs.
    */
    import { useRecordsStore } from '../stores/records';

    const recordStore = useRecordsStore();

    console.log(recordStore.keysValues)
</script>

<template>
    <!-- TEMPLATE FOR FILTERS BAR-->
    <div class="actions">
            <p>Add Records</p>
        </div>
        <div><!-- First filter: record property selector -->
            <label>Select the first filter</label>
            <!-- Updates filterValue1 in the store via v-model -->
            <select v-model="recordStore.filterValue1">
                <option value="">All</option>
                <!-- Display available record properties as options -->
                <option v-for="key in recordStore.keysValues" :key="key" :value="key">{{ key }}</option>
            </select>
            <!-- Second filter: value selector based on first filter -->
            <label>Select the second filter</label>
            <!-- Updates filterValue2 in the store via v-model -->
            <select v-model="recordStore.filterValue2">
                <!-- Display unique values derived from the first filter-->
                <option v-for="filter in recordStore.keysValuesFilter2" :key="filter" :value="filter">{{ filter }}</option>
            </select>
        </div>
        <div>
            <!--Search input (planned feature, not implemented yet)-->
            <input type="text" placeholder="Write a band name or album" />
        </div>
</template>

<style>
    /* Styles for FiltersBar (to be implemented) */
</style>