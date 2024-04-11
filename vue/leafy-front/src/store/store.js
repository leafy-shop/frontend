import { defineStore, acceptHMRUpdate } from 'pinia'
import {ref} from 'vue'

export const useCartStore = defineStore('cartCount',() => {
  // arrow function recommended for full type inference
  const cartCount = ref(0)
  const addCartCount = (qty) => (cartCount.value += qty)
  // console.log(cartCount)
  return {cartCount, addCartCount}
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}