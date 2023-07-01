<template>
  <nut-image-preview
    class="preview"
    style="display: fixed"
    :autoplay="0"
    :init-no="showIndex"
    :show="showPreview"
    :images="previewImages"
    @close="hideImagePreview"
  />
  <div ref="imageListRef" id="js-image-list" class="image-list">
    <div
      v-for="(image, index) in displayImages"
      class="image-item"
      :key="index"
      :style="{ width: `${itemSize}px`, height: `${itemSize}px` }"
      @click="showImagePreview(index)"
    >
      <div v-if="sizeInit" class="delete-btn" @click.stop="handleRemoveClick(index)">×</div>
      <div v-if="maskShow(index) && sizeInit" class="image-mask">+{{ overflowCount }}</div>
      <image mode="aspectFill" :src="image.src" />
    </div>
    <div
      v-if="showUploadBtn && sizeInit"
      class="upload-btn"
      :style="{ width: `${itemSize}px`, height: `${itemSize}px` }"
      @click="handleAddClick"
    >
      +
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, onMounted, watch } from 'vue';
import { ImagePreview as NutImagePreview } from '@nutui/nutui-taro';
import Taro from '@tarojs/taro';

const imageListRef = ref<HTMLElement>();
// 图片最大宽度，单位 px
const MAX_ITEM_SIZE = 300;
// 图片间距
const ITEM_GAP = 15;

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  maxCount: {
    type: Number,
    required: false,
    default: 3,
  },
  uploadEnable: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['add-item', 'remove-item']);
const previewImages = computed(() => props.images.map((src: string) => ({ src })));
const displayImages = computed(() => previewImages.value.slice(0, props.maxCount));
const overflowCount = computed(() => Math.max(0, props.images.length - props.maxCount));
const showUploadBtn = computed(() => props.images.length < props.maxCount);
const itemSize = ref(0);
const showIndex = ref(0);
const showPreview = ref(false);
const sizeInit = ref(false);

const maskShow = (index: number) => {
  if (props.uploadEnable) return false;
  return overflowCount.value > 0 && index === displayImages.value.length - 1;
};

const showImagePreview = (index: number) => {
  showIndex.value = index;
  showPreview.value = true;
};
const hideImagePreview = () => {
  showPreview.value = false;
};
const handleAddClick = () => {
  emit('add-item');
};
const handleRemoveClick = (index: number) => {
  emit('remove-item', index);
};

// 根据容器大小动态计算图片大小，最大为 MAX_ITEM_SIZE (default: 300px)
const updateItemSize = () => {
  const query = Taro.createSelectorQuery();
  query
    .select('#js-image-list')
    .boundingClientRect((imageList) => {
      if (!imageList || Array.isArray(imageList)) return;
      itemSize.value = Math.min(MAX_ITEM_SIZE, Math.floor((imageList.width - ITEM_GAP) / 3));
    })
    .exec();
};

watch(
  props.images,
  () => {
    if (props.images.length > props.maxCount && props.uploadEnable) {
      // eslint-disable-next-line no-console
      console.error('图片数量不可大于 maxCount 值!');
    }
  },
  { immediate: true }
);

onMounted(() => {
  // nextTick 无法解决获取元素为 null 问题，暂时使用 setTimeout 解决
  setTimeout(() => {
    const current = Taro.getCurrentPages();
    if (current[0].route === 'pages/post/index') sizeInit.value = true;
    updateItemSize();
  }, 500);
  // 监听视窗变化
  Taro.onWindowResize(updateItemSize);
});
</script>

<style lang="scss">
.nut-image-preview-swiper {
  position: relative;
  height: 100vh;
}
.nut-image-preview-taro-img {
  width: 100vw;
  height: 80vh;
}
.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
}

.image-item {
  position: relative;
}

.image-item image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.image-mask {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.3rem;
  z-index: 10;
  border-radius: 10px;
}

.upload-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $disable-color;
  font-size: 1.3rem;
  border: 1px dashed $disable-color;
  border-radius: 10px;
  box-sizing: border-box;
}

.delete-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 36px;
  height: 36px;
  padding-bottom: 7px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}
</style>
