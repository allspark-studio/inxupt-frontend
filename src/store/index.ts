import { defineStore } from 'pinia';

export const useTabBarStore = defineStore('tabbar', {
  state: () => ({
    selectIndex: 0,
  }),
  actions: {
    // state中的 selectindex 属性
    incrementSelectIndex(index) {
      this.selectIndex = index;
    },
  },
});
