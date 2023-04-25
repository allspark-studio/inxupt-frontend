import { defineStore } from 'pinia'
export const useTabbarStore=defineStore({
state:()=>{
    return {
        select:0
    }
}
})