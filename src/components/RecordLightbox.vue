<script setup>
    import { useRecordsStore } from '../stores/records';
    import { ref, watch } from 'vue';
    const recordStore = useRecordsStore();

    const bgColor = ref('rgb(20,20,20)');
    const textColor = ref('white');

    // cuando cambia el disco seleccionado
    watch(
    () => recordStore.selectedRecord,
    (record) => {
        if (!record) return;

        getAverageColor(record.cover, (color) => {
        bgColor.value = color;
        textColor.value = getTextColorFromBackground(color);
        });
    },
    { immediate: true }
    );

// ===============================
// Average color from image
// ===============================
    function getAverageColor(imgSrc, callback) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        let r = 0, g = 0, b = 0;
        let totalPixels = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        }

        r = Math.floor(r / totalPixels);
        g = Math.floor(g / totalPixels);
        b = Math.floor(b / totalPixels);

        callback(`rgb(${r}, ${g}, ${b})`);
    };

    img.src = imgSrc;
    }

    // ===============================
    // Text color based on luminance
    // ===============================
    function getTextColorFromBackground(rgbString) {
    const rgb = rgbString.match(/\d+/g).map(Number);
    const [r, g, b] = rgb;

    const luminance = (0.299 * r) + (0.587 * g) + (0.114 * b);
    return luminance > 150 ? 'black' : 'white';}
</script>

<template>
    <div class="recordLightbox" @click.self="recordStore.closeLightBox">
        <div class="lightBoxContent"
        :style="{
            '--bg-color': bgColor,
            '--text-color': textColor
            }">
            <div class="albumCover">
                <img :src="recordStore.selectedRecord.cover" :alt="recordStore.selectedRecord.title"></img>
            </div>
                <div class="recordInfo">
                    <h1>{{ recordStore.selectedRecord.title }}</h1>
                    <h2>{{ recordStore.selectedRecord.artist }}</h2>
                    <p>{{ recordStore.selectedRecord.year }}</p>
                    <div class="tracklist">
                        <ol v-for="(track, index) in recordStore.selectedRecord.tracklist" :key="index">{{ track }}</ol>
                    </div>
                </div>
                <div class="closeBtn">
                    <button @click="recordStore.closeLightBox">Close</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

.recordLightbox{
    inset: 0;
    display: flex;
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    align-items: center;
    opacity: 1;
    justify-content: center;
    z-index: 1000;
    
}

.lightBoxContent{
    background: var(--bg-color);
    color: var(--text-color);
    padding: 25px;
    border-radius: 10px;
    max-width: 900px;
    display: flex;
    gap: 30px;
    position: relative;
    align-items: center;
    justify-content: flex-start;

}

.lightBoxContent h1, h2, h3{
    margin: 0;
    font-family: 'Montserrat', sans-serif;
}

.lightBoxContent h2{
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    opacity: 0.9;
}

.lightBoxContent p {
    margin: 0 0 8px 0; /* menos separación */
}


.lightBoxContent h3{
    font-size: 1.1rem;
    font-weight: 600;
}
.lightBoxContent .recordInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
}

.albumCover img{
    height: 500px;
    width: 500px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}



.tracklist {
    margin-bottom: 1px;
    font-size: 1.2 rem;
}

.tracklist ol {
    padding-left: 20px;
}

.tracklist li {
    font-size: 0.9rem;
    margin-bottom: 1px;
}

#close-btn{
    
    cursor: pointer;
}

#close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 30px;
    cursor: pointer;
    opacity: 0.8;
    transition: 0.2s;
}

#close-btn:hover {
    opacity: 1;
    transform: scale(1.1);
}
</style>