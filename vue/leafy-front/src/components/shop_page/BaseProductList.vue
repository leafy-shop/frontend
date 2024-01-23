<script setup>
import{useRouter} from 'vue-router'

let props = defineProps({
    productList :{
        type:Object,
        require:true,
        default:{}
    }
    
})
const myRouter=useRouter()
const goProductDetail=(p)=>myRouter.push({name:'ProductDetail',params:{id:p}})

</script>
<template>
    <div class="wrapper_product_list">
        <div class="grid_container">
            <button @click="goProductDetail(product.itemId)" v-for="(product,index) of productList" :key="index" class="grid_item">
                <div class="product_img">
                    <img src="../../assets/vue.svg" :alt="product.name">
                </div>
                <div class="product_info">
                    <h4>
                        {{ product.name }}
                    </h4>
                    <div class="info_quality">
                        <h5>
                            <span>฿</span>{{ product.price }}
                        </h5>
                        <div>
                            <div  class="rating">
                                <div v-for="(n,index) of Math.floor(product.totalRating)" :key="index" class="rating_fill">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M5.42934 1.75625C5.60934 1.20365 6.39114 1.20365 6.57054 1.75625L7.21254 3.73145C7.25176 3.85174 7.32801 3.95655 7.43038 4.03091C7.53275 4.10526 7.65601 4.14535 7.78254 4.14545H9.85974C10.4411 4.14545 10.6823 4.88945 10.2125 5.23145L8.53254 6.45185C8.42995 6.52626 8.35357 6.63125 8.31434 6.75176C8.2751 6.87226 8.27503 7.0021 8.31414 7.12265L8.95614 9.09785C9.13614 9.65045 8.50314 10.1106 8.03214 9.76865L6.35214 8.54825C6.24966 8.47385 6.12627 8.43378 5.99964 8.43378C5.873 8.43378 5.74961 8.47385 5.64714 8.54825L3.96714 9.76865C3.49674 10.1106 2.86434 9.65045 3.04374 9.09785L3.68574 7.12265C3.72484 7.0021 3.72477 6.87226 3.68554 6.75176C3.6463 6.63125 3.56992 6.52626 3.46734 6.45185L1.78794 5.23205C1.31814 4.89005 1.55994 4.14605 2.14074 4.14605H4.21734C4.34396 4.14608 4.46736 4.10605 4.56985 4.03169C4.67234 3.95732 4.74868 3.85244 4.78794 3.73205L5.42994 1.75685L5.42934 1.75625Z" fill="#FFCE3D"/>
                                    </svg>
                                </div>
                                <div v-for="(n,index) of 5-Math.floor(product.totalRating)" :key="index" class="rating_empty">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M5.42934 1.75625C5.60934 1.20365 6.39114 1.20365 6.57054 1.75625L7.21254 3.73145C7.25176 3.85174 7.32801 3.95655 7.43038 4.03091C7.53275 4.10526 7.65601 4.14535 7.78254 4.14545H9.85974C10.4411 4.14545 10.6823 4.88945 10.2125 5.23145L8.53254 6.45185C8.42995 6.52626 8.35357 6.63125 8.31434 6.75176C8.2751 6.87226 8.27503 7.0021 8.31414 7.12265L8.95614 9.09785C9.13614 9.65045 8.50314 10.1106 8.03214 9.76865L6.35214 8.54825C6.24966 8.47385 6.12627 8.43378 5.99964 8.43378C5.873 8.43378 5.74961 8.47385 5.64714 8.54825L3.96714 9.76865C3.49674 10.1106 2.86434 9.65045 3.04374 9.09785L3.68574 7.12265C3.72484 7.0021 3.72477 6.87226 3.68554 6.75176C3.6463 6.63125 3.56992 6.52626 3.46734 6.45185L1.78794 5.23205C1.31814 4.89005 1.55994 4.14605 2.14074 4.14605H4.21734C4.34396 4.14608 4.46736 4.10605 4.56985 4.03169C4.67234 3.95732 4.74868 3.85244 4.78794 3.73205L5.42994 1.75685L5.42934 1.75625Z" fill="#E0E0E0"/>
                                    </svg>
                                </div>
                            </div>
                            <h6 class="sold">
                                {{ product.sold }} sold
                            </h6>
                        </div>
                    </div>
                    
                    
                </div>
            </button>
        </div>

    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_product_list{
    /* display: flex; */
    width: inherit;
    height: inherit;
}
.grid_container{
    display: grid;
    width: inherit;
    height: fit-content;
    grid-template-columns: auto auto auto;
    gap: min(2.222dvw,32px);
}
.grid_item{
    display: flex;
    width: min(17.778dvw,256px);
    height: min(23.333dvw,336px);
    flex-direction: column;
    border-radius: min(0.556dvw,8px);
    overflow: hidden;
    border: none;
    cursor: pointer;
}
.product_img{
    display: flex;
    width: inherit;
    height: min(15.278dvw,220px);
    overflow: hidden;
}
.product_img img{
    width: 100%;
    height: auto;
}

.product_info{
    display: flex;
    width: inherit;
    height: min(8.056dvw,116px);
    flex-direction: column;
    padding: min(0.833dvw,12px);
    gap: min(0.833dvw,12px);
    background-color: white;
    overflow: hidden;
    text-overflow: ellipsis;
}
.product_info h4{
    display: flex;
    width: 100%;
    height: min(2.222dvw,32px);
    font-size: min(1.389dvw,20px);
    font-weight: 500;
    line-height: 160%; /* 32px */
}

.info_quality{
    display: flex;
    width: 100%;
    height: min(3.333dvw,48px);
    flex-direction: column;
    gap: min(0.556dvw,8px);

}
.info_quality h5{
    display: flex;
    width: fit-content;
    height: min(1.667dvw,24px);
    font-size: min(1.111dvw,16px);
    font-weight: 500;
    line-height: 150%; /* 24px */
    letter-spacing: min(0.014dvw,0.2px);
    color: #26AC34;
}
.info_quality h5 span{
    font-size: min(0.833dvw,12px);
    font-weight: 400
}
.info_quality div{
    display: flex;
    width: auto;
    height: min(1.111dvw,16px);
    justify-content: space-between;
}
.rating{
    display: flex;
    width: fit-content;
    height: fit-content;
}
.rating svg{
    width: min(0.833dvw,12px);
    height: min(0.833dvw,12px);
}
.sold{
    width: fit-content;
    height: inherit;
    font-size: min(0.833dvw,12px);
}

@media(width<=744px){
    .grid_container{
        gap: min(2.151dvw,16px);
    }
    .grid_item{
        width: min(20.43dvw,152px);
        height: min(32.796dvw,244px);
    }
    .product_img{
        height: min(19.892dvw,148px);
    }
    .product_info{
        height: min(12.903dvw,96px);
        padding: min(1.613dvw,12px) min(1.075dvw,8px);
        gap: min(1.075dvw,8px);
    }
    .product_info h4{
        height: min(3.226dvw,24px);
        font-size: min(2.151dvw,16px);
    }
    .info_quality{
        height: min(5.376dvw,40px);
        gap: min(1.075dvw,8px);
    }
    .info_quality h5{
        height: min(2.688dvw,20px);
        font-size: min(1.882dvw,14px);
    }
    .info_quality h5 span{
        font-size: min(1.613dvw,12px);
    }
    .info_quality div{
        height: min(1.613dvw,12px);
    }
    .rating svg{
        width: min(1.613dvw,12px);
        height: min(1.613dvw,12px);
    }
    .sold{
        font-size: min(1.344dvw,10px);
    }
}

@media (width<=376px){
    .grid_container{
        grid-template-columns: auto auto;
        gap: min(2.128dvw,8px);
    }
    .grid_item{
        width: min(44.681dvw,168px);
        height: min(70.213dvw,264px);
    }
    .product_img{
        height: min(44.681dvw,168px);
    }
    .product_info{
        height: min(25.532dvw,96px);
        padding: min(3.191dvw,12px);
    }
    .product_info h4{
        height: min(6.383dvw,24px);
        font-size: min(4.255dvw,16px);
    }
    .info_quality{
        height: min(10.638dvw,40px);
        gap: min(2.128dvw,8px);
    }
    .info_quality h5{
        height: min(5.319dvw,20px);
        font-size: min(3.723dvw,14px);
    }
    .info_quality h5 span{
        font-size: min(3.191dvw,12px);
    }
    .info_quality div{
        height: min(3.191dvw,12px);
    }
    .rating svg{
        width: min(3.191dvw,12px);
        height: min(3.191dvw,12px);
    }
    .sold{
        font-size: min(2.66dvw,10px);
    }
}
</style>