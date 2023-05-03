<template>
  <div class="content">{{ content }}</div>
</template>
<script>
export default {
  name: 'more',
  props: {
    content: {
      type: String,
      default: '2',
    },
  },
};
</script>

<style lang="less">
.content {
  font-size: 25px;
  line-height: 60px;
}
</style>
