<template>
  <div>
    <nut-image-preview
      :autoplay="0"
      :init-no="showIndex"
      :show="showPreview"
      :images="previewImages"
      @close="hideImagePreview"
    />
    <div ref="imageListRef" id="js-image-list" class="image-list">
      <div
        v-for="(image, index) in props.images"
        class="image-item"
        :key="index"
        @click="showImagePreview(index)"
      >
        <div v-if="mode !== 'preview'" class="delete-btn" @click.stop="emit('removeItem', index)">
          ×
        </div>
        <image mode="aspectFill" :src="image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { ImagePreview as NutImagePreview } from '@nutui/nutui-taro';

const imageListRef = ref<HTMLElement>();

const props = defineProps<{
  images: string[];
  mode?: 'preview' | 'modify';
}>();

const previewImages = computed(() => props.images.map((src: string) => ({ src })));
const showIndex = ref(0);
const showPreview = ref(false);

const showImagePreview = (index: number) => {
  showIndex.value = index;
  showPreview.value = true;
};
const hideImagePreview = () => {
  showPreview.value = false;
};

const emit = defineEmits(['removeItem']);
</script>

<style lang="scss">
.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  height: 200rpx;
  padding: 0 24rpx;
}

.image-item {
  position: relative;
  cursor: pointer;
}

.image-item image {
  object-fit: cover;
  border-radius: 10px;
  width: 176rpx;
  height: 176rpx;
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
  cursor: pointer;
  z-index: 10;
  border-radius: 10px;
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
