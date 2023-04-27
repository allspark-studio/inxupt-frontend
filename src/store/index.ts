import { defineStore } from 'pinia';

export const useTabBarStore = defineStore('tabbar', {
  state: () => ({
    selectIndex: 0,
  }),
  actions: {
    // state中的selectindex属性
    incrementSelectIndex(index) {
      this.selectIndex = index;
      console.log('state：selectindex=》', this.selectIndex);
    },
  },
});
