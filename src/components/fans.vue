<template>
  <div>动态：{{ dynNum }} &nbsp;&nbsp;粉丝：{{ fansNum }}</div>
</template>
<script>
export default {
  name: 'fans',
  props: {
    dynNum: {
      type: String,
      default: '23',
    },
    fansNum: {
      type: String,
      default: '23',
    },
  },
};
</script>

<style lang="less">
</style>
