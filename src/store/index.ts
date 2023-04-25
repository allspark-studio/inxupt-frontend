import { defineStore } from 'pinia'
export const useTabbarStore=defineStore('tabbar',{
state:()=>{
    return {
        selectIndex:0
    }
},
actions:{
    //state中的selectindex属性
    incrementSelectIndex(index){
        this.selectIndex=index
        console.log('state：selectindex=》',this.selectIndex)
    }
}
})