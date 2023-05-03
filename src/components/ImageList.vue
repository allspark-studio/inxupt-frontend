<template>
    <nut-image-preview :show="showPreview" :images="imgData" @close="hideFn" />
    <nut-cell isLink :showIcon="true" @click="showFn">
        <div class="image-list">
            <div class="image-item" v-for="(image, index) in imgData " :key="index">
                <img :src="image.src" />
            </div>
            <div class="image-mask" v-if="overflowCount > 0">
                +{{ overflowCount }}
            </div>
        </div>
    </nut-cell>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
    props: {
        images: {
            type: Array,
            required: true,
        }
    };
    setup(props) {
        const imageCount = props.images.length;
        const displayImages = props.images.slice(0, 3);
        const overflowCount = Math.max(0, props.images.length - 3);

        const resData = reactive({
            showPreview: false,
            imgData: imageCount <= 3 ? props.images : displayImages
        });
        const showFn = () => {
            resData.showPreview = true;
        }
        const hideFn = () => {
            resData.showPreview = false;
        }
        return {
            ...toRefs(resData),
            showFn,
            hideFn,
            displayImages,
            overflowCount,
        }
    }
}

</script>

<style lang="scss">
.image-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.image-item {
    position: relative;
    width: 100px;
    height: 100px;
    cursor: pointer;
}

.image-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-mask {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    font-size: 20px;
    cursor: pointer;
    margin-left: -110px;
    z-index: 10;
}
</style>
