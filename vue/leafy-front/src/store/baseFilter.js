// import {defineStore, acceptHMRUpdate} from 'pinia';
// import { ref, computed } from 'vue';

// export const productFilterStore = defineStore('productFilterStore', () => {
    
//     const storeSearch = ref(baseFilter.searchItem())
//     const storeFilter = ref({
//         store: baseFilter
//     })
//     //   state: () => {
//     //     return { count: 0 }
//     //   },
//     //   // could also be defined as
//     //   // state: () => ({ count: 0 })
//     //   actions: {
//     //     increment() {
//     //       this.count++
//     //     },
//     //   },
//     return { storeSearch, storeFilter }
// })

// if(import.meta.hot){
//     import.meta.hot.accept(acceptHMRUpdate(productFilterStore, import.meta.hot))
// }