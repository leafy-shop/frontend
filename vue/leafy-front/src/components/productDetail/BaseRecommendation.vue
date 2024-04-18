<script setup>
import {ref, onBeforeMount}from 'vue'
import BaseProductList from '../shop_page/BaseProductList.vue';
import fetch from '../../JS/api';
const productList = ref([
    // {"itemId": 30010,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
    // {"itemId": 30011,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
    // {"itemId": 30012,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
    // {"itemId": 30013,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
    // {"itemId": 30014,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
    // {"itemId": 30014,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
    // {"itemId": 30014,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
    // {"itemId": 30014,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
    // {"itemId": 30014,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
    // {"itemId": 30014,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
    // {"itemId": 30014,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
    // {"itemId": 30014,"name": "small zee cactus","itemOwner": "piraphat123@gmail.com","type": "cactus","totalRating": 4,"sold": 0,"price": 32,"updatedAt": "1/12/2024, 21:18:26"},
])

const getProductList = async () => {
    let {status, data} = await fetch.getAllRecommendProduct(1, 12)
    productList.value=data.list
    console.log(data)
}

onBeforeMount(()=>{
    getProductList()
})

</script>
<template>
    <div v-show="true" class="wrapper_recommend">
        <h5>
            Recommended for You
        </h5>
        <div class="recommend_list">
            <div>
                <BaseProductList :productList="productList" :gridColumn="6" :size="62.5"/>
            </div>
            <!-- <button class="recommend_item">
                image
                <div>
                    <img src="../../assets/vue.svg" alt="product_img">
                </div>
                info
                <div>
                    <h5>
                        polyscias Fabian
                    </h5>
                    <div>
                        <h6>
                            ฿80
                        </h6>
                        rating and sold
                        <div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </button> -->
        </div>
    </div>
</template>
<style scoped>
.wrapper_recommend{
    display: flex;
    width: 100%;
    /* max-width: 100%; */
    
    flex-direction: column;
    gap: min(1.389dvw,20px);
}
.wrapper_recommend h5{
    display: flex;
    width: fit-content;
    height: min(2.5dvw,36px);
    font-weight: 500;
    font-size: min(1.667dvw,24px);
    color: #212121;
    align-items: center;
}
.recommend_list{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
}
.recommend_list>div{
    display: flex;
    justify-content: center;
}
</style>