<script setup>
import{ref,onBeforeMount, computed} from'vue'
import api from '../../JS/api'
import validation from '../../JS/validation'
const productList=ref([])

const currentPage=ref(1)
const maxPage=computed(()=>{
    let page = 16/15
    // allItems.value
    return Math.ceil(page)
})
const allItems=ref(0)

const getProduct=async(page)=>{

    let {status,data} =await api.getAllProduct(page)
    // console.log(data)
    productList.value=data.productList
    allItems.value=data.allItems
}

// if change page input must be a number only
const changePage=(number)=>{
    console.log(typeof(number))
    
    let status =validation.number(number,true)
    currentPage.value = status==true?number:Math.abs(parseInt(number))
    
    // currentPage.value=Math.abs(parseInt(number))
    getProduct(currentPage.value)
}

onBeforeMount(()=>{
    getProduct(1)
})
// const productList=[
//     {name:"Good Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
//     {name:"Plants",price:80,sold:8,star:5},
    
// ]
</script>
<template>
    <div class="wrapper_product_list">
        <div class="grid_container">
            <div v-for="(product,index) of productList" :key="index" class="grid_item">
                <img src="../../assets/vue.svg" :alt="product.name">
                <div class="product_info">
                    <h4>
                        {{ product.name }}
                    </h4>
                    <h4>
                        ฿ {{ product.price }}
                    </h4>
                    <div>
                        <div>
                            ⭐⭐⭐
                        </div>
                        <h5>
                            {{ product.sold }} sold
                        </h5>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="link_page_container">
            <ul>
                <li v-for="(link,index) of maxPage" :key="index">
                    <button @click="changePage(index+1)">
                        {{ link }}
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.wrapper_product_list{
    width: 832px;
    height: inherit;
    margin-left: 32px;
}
.grid_container{
    display: grid;
    grid-template-columns: auto auto auto;

    gap: 32px;
}
.grid_item{
    display: flex;
    width: 256px;
    height: 366px;
    flex-direction: column;
}
.grid_item img{
    width: 256px;
    height: 220px;
}

.product_info{
    background-color: gray;
}
.product_info h4:nth-child(1){
    font-size: 20px;
    font-weight: 500;
}
.product_info h4:nth-child(2){
    font-size: 16px;
    font-weight: 500;
    color: #26AC34;
}
.product_info h4:nth-child(3){
    font-size:12px;
    font-weight: 400;
}
.product_info div{
    display: flex;
}
</style>