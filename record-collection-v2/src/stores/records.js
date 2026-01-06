/* Project Store */


/* Required imports, including the JSON file with the records collection */
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import vinyls from "../data/vinyls.json";

/*Store logic*/
export const useRecordsStore = defineStore("records", () => {
    /* Main object containing the records collection */
    const records = ref(vinyls);
   /* Currently selected record (used by the lightbox) */
    const selectedRecord = ref(null);
    /* Lightbox visibility trigger */
    const isLightboxOn = ref(false);
    /* Filter values selected by the user */
    const filterValue1 = ref("");
    const filterValue2 = ref("");
    /* 
    Filter 1 logic:
    Extracts all available keys (properties) from the first record.
    This works because all records share the same structure.
    */
    const keysValues = computed(() => {
        /* Keys not relevant for filtering from a user perspective */
        const filters = ["id", "tracklist", "cover"];
        return Object.keys(records.value[0]).filter(
        key => !filters.includes(key)
        );
    });
    /*
    Filter 2 logic:
    Generates the list of unique values based on the selected key
    from the first filter (e.g. artist, year, genre).
    */
    const keysValuesFilter2 = computed(() => {
        /* If no filter key is selected, no values are displayed */
        if (!filterValue1.value) return [];
        /* Extract values from the selected record property */
        const values = records.value.map(
            record => record[filterValue1.value]
        );
        /* Remove duplicated values (e.g. repeated artists or years) */
        return [...new Set(values)];
    });

    /*
    Records rendering logic:
    Displays all records by default.
    When both filters are selected, only matching records are shown.
    */
    const displayedRecords = computed(() => {
        if(!filterValue1.value || !filterValue2.value){
            return records.value;
        }else{
            const renderRecords = records.value.filter(record => record[filterValue1.value]===filterValue2.value);
            return renderRecords
        }
    });
    /* Selects a record and opens the lightbox */
    const selectRecord = (record) => {
        selectedRecord.value=record;
        isLightboxOn.value=true;
    };

    /* Closes the lightbox and clears the selected record */
    const closeLightBox = () => {
        isLightboxOn.value=false;
        selectedRecord.value=null;
    }


    return {
        records,
        keysValues,
        keysValuesFilter2,
        displayedRecords,
        filterValue1,
        filterValue2,
        selectedRecord,
        isLightboxOn,
        selectRecord,
        closeLightBox
    };
});

