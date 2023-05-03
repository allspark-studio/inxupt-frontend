<template>
  <div class="hour">{{ hour }}小时前</div>
</template>
<script>
export default {
  name: 'times',
  props: {
    hour: {
      type: String,
      default: '2',
    },
  },
};
</script>

<style lang="less">
</style>
