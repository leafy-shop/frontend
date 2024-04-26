<script setup>
import { computed } from 'vue';
import{useRouter} from 'vue-router'
import validation from '../../JS/validation'

let origin = `${import.meta.env.VITE_BASE_URL}`;

let props = defineProps({
    productList :{
        type:Object,
        require:true,
        default:{}
    },
    size:{
        type:Number,
        require:true,
        default:100
    },
    gridColumn:{
        type:Number,
        require:true,
        default:3
    },
    soldOut:{
        type:Boolean,
        require:true,
        default:false
    }
    
})
// for change css style
const changeGridT=()=>{
    let gridT=''
    for(let i=0;i<props.gridColumn;i++){
        gridT=gridT+'1fr '
    }
    console.log(gridT)
    return gridT
}
const changeSize=(number,unit='px')=>{
        let changed = (props.size/100)*number
        return `${changed+unit}`
    }

const myRouter=useRouter()
const goProductDetail=(p)=>{
    return myRouter.push({name:'ProductDetail',params:{id:validation.encrypt(''+p)}})
}

</script>
<template>
    <div class="wrapper_product_list">
        <div class="grid_container">
            <button @click="goProductDetail(product.itemId)" v-for="(product,index) of productList" :key="index" class="grid_item">
                <div class="product_item">
                    <div class="product_img">
                        <img v-if="product.image" :src="`${origin}/api/image/products/${product.itemId}`" :alt="product.name" loading="lazy">
                        <img v-else src="../../assets/default_image.png" :alt="product.name" >
                        <div v-show="soldOut" class="sold_out">
                            Sold Out
                        </div>
                    </div>
                    <div class="product_info">
                        <h4>
                            {{ product.name }}
                        </h4>
                        <div class="info_quality">
                            <h5>
                                <span>฿</span>{{ product.minPrice }} {{ product.maxPrice > product.minPrice ? `- ${product.maxPrice}` : '' }}
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
    width: 100%;
    /* max-width: min(77.778dvw,1120px); */
    height: fit-content;
}
.grid_container{
    display: grid;
    /* display: flex; */
    width: 100%;
    /* min-width: min(57.778dvw,832px); */
    /* max-width: min(77.778dvw,1120px); */
    /* min-width: 100%; */
    height: fit-content;
    /* flex-wrap: wrap;  */
    /*justify-content: center;
    align-items: center; */
    grid-template-columns: v-bind(changeGridT());
    gap: min(v-bind(changeSize(2.222,'dvw')),v-bind(changeSize(32)));
}
.grid_item{
    display: flex;
    /* width: min(17.778dvw,256px); */
    /* width: min(v-bind(changeSize(17.778,'dvw')),v-bind(changeSize(256))); */
    width: 100%;
    height: min(v-bind(changeSize(23.333,'dvw')),v-bind(changeSize(336)));
    /* height: fit-content; */
    flex-direction: column;
    border-radius: min(v-bind(changeSize(0.556,'dvw')),v-bind(changeSize(8)));
    overflow: hidden;
    border: none;
    cursor: pointer;
}
.product_item {
    display: flex;
    flex-direction: column;
    /* width: min(v-bind(changeSize(17.778,'dvw')),v-bind(changeSize(256)));;  */
    width: 100%;
    /* height: min(23.333dvw,336px); */
    height: fit-content;
    border-radius: min(v-bind(changeSize(0.556,'dvw')),v-bind(changeSize(8)));
    border: min(v-bind(changeSize(0.069,'dvw')),v-bind(changeSize(1))) solid;
    border-color: #FFFFFF;
    box-sizing: border-box;
    overflow: hidden;
}
.product_item:hover {
    border-color: #26AC34;
    box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);
}
.product_item:active {
    border-color: #58d264;
}
.product_img{
    display: flex;
    width: 100%;
    height: min(v-bind(changeSize(15.278,'dvw')),v-bind(changeSize(220)));
    overflow: hidden;
    position: relative;
    justify-content: center;
    align-items: center;
}

.product_img .sold_out{
    display: flex;
    width: 100%;
    height: min(v-bind(changeSize(2.778,'dvw')),v-bind(changeSize(40)));
    position: absolute;
    padding: min(v-bind(changeSize(0.556,'dvw')),v-bind(changeSize(8)));
    top: 50%;
    left: 0;
    justify-content: center;
    align-items: center;
    background-color: #FFCE3D;
    color: #FFFFFF;
    font-size: min(v-bind(changeSize(1.111,'dvw')),v-bind(changeSize(16)));
    font-weight: 700;
    z-index: 2;
}
.product_img img{
    width: 100%;
    height: 100%;
    object-fit:cover;
}
.product_info{
    display: flex;
    /* width: inherit; */
    /* width: min(17.778dvw,256px); */
    width: 100%;
    /* height: min(v-bind(changeSize(8.056,'dvw')),v-bind(changeSize(116))); */
    height: fit-content;
    flex-direction: column;
    padding: min(v-bind(changeSize(0.833,'dvw')),v-bind(changeSize(12)));
    gap: min(v-bind(changeSize(0.833,'dvw')),v-bind(changeSize(12)));
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: #FFFFFF;
}
.product_info h4{
    display: flex;
    width: 100%;
    height: min(v-bind(changeSize(2.222,'dvw')),v-bind(changeSize(32)));
    font-size: min(v-bind(changeSize(1.389,'dvw')),v-bind(changeSize(20)));
    font-weight: 500;
    line-height: 160%; /* 32px */
    text-overflow: ellipsis;
    text-align: start;
    overflow: hidden;
}

.info_quality{
    display: flex;
    width: 100%;
    height: min(v-bind(changeSize(3.333,'dvw')),v-bind(changeSize(48)));
    flex-direction: column;
    gap: min(v-bind(changeSize(0.556,'dvw')),v-bind(changeSize(8)));

}
.info_quality h5{
    display: flex;
    width: fit-content;
    height: min(v-bind(changeSize(1.667,'dvw')),v-bind(changeSize(24)));
    font-size: min(v-bind(changeSize(1.111,'dvw')),v-bind(changeSize(16)));
    font-weight: 500;
    line-height: 150%; /* 24px */
    letter-spacing: min(v-bind(changeSize(0.014,'dvw')),v-bind(changeSize(0.2)));
    color: #26AC34;
}
.info_quality h5 span{
    font-size: min(v-bind(changeSize(0.833,'dvw')),v-bind(changeSize(12)));
    font-weight: 400
}
.info_quality div{
    display: flex;
    width: auto;
    height: min(v-bind(changeSize(1.111,'dvw')),v-bind(changeSize(16)));
    justify-content: space-between;
}
.rating{
    display: flex;
    width: fit-content;
    height: fit-content;
}
.rating svg{
    width: min(v-bind(changeSize(0.833,'dvw')),v-bind(changeSize(12)));
    height: min(v-bind(changeSize(0.833,'dvw')),v-bind(changeSize(12)));
}
.sold{
    width: fit-content;
    height: inherit;
    font-size: min(v-bind(changeSize(0.833,'dvw')),v-bind(changeSize(12)));
}

@media(width<=744px){
    .grid_container{
        gap: min(v-bind(changeSize(2.151,'dvw')),v-bind(changeSize(16)));
    }
    .grid_item{
        /* width: min(v-bind(changeSize(20.43,'dvw')),v-bind(changeSize(152))); */
        height: min(v-bind(changeSize(32.796,'dvw')),v-bind(changeSize(244)));
    }
    .product_item {
        /* width: min(v-bind(changeSize(20.43,'dvw')),v-bind(changeSize(152))); */
        border-radius: min(v-bind(changeSize(1.075,'dvw')),v-bind(changeSize(8)));
        border: min(v-bind(changeSize(0.134,'dvw')),v-bind(changeSize(1))) solid;
        border-color: rgb(0, 0, 0, 0.01);
    }
    .product_img{
        height: min(v-bind(changeSize(19.892,'dvw')),v-bind(changeSize(148)));
    }
    .product_img div{ 
        height: min(v-bind(changeSize(4.301,'dvw')),v-bind(changeSize(32)));  
        padding: min(v-bind(changeSize(1.075,'dvw')),v-bind(changeSize(8)));  
        font-size: min(v-bind(changeSize(2.151,'dvw')),v-bind(changeSize(16)));
    }
    .product_info{
        height: min(v-bind(changeSize(12.903,'dvw')),v-bind(changeSize(96)));
        padding: min(v-bind(changeSize(1.613,'dvw')),v-bind(changeSize(12))) min(v-bind(changeSize(1.075,'dvw')),v-bind(changeSize(8)));
        gap: min(v-bind(changeSize(1.075,'dvw')),v-bind(changeSize(8)));
    }
    .product_info h4{
        height: min(v-bind(changeSize(3.226,'dvw')),v-bind(changeSize(24)));
        font-size: min(v-bind(changeSize(2.151,'dvw')),v-bind(changeSize(16)));
    }
    .info_quality{
        height: min(v-bind(changeSize(5.376,'dvw')),v-bind(changeSize(40)));
        gap: min(v-bind(changeSize(1.075,'dvw')),v-bind(changeSize(8)));
    }
    .info_quality h5{
        height: min(v-bind(changeSize(2.688,'dvw')),v-bind(changeSize(20)));
        font-size: min(v-bind(changeSize(1.882,'dvw')),v-bind(changeSize(14)));
    }
    .info_quality h5 span{
        font-size: min(v-bind(changeSize(1.613,'dvw')),v-bind(changeSize(12)));
    }
    .info_quality div{
        height: min(v-bind(changeSize(1.613,'dvw')),v-bind(changeSize(12)));
    }
    .rating svg{
        width: min(v-bind(changeSize(1.613,'dvw')),v-bind(changeSize(12)));
        height: min(v-bind(changeSize(1.613,'dvw')),v-bind(changeSize(12)));
    }
    .sold{
        font-size: min(v-bind(changeSize(1.344,'dvw')),v-bind(changeSize(10)));
    }
}

@media (width<=432px){
    .grid_container{
        grid-template-columns: auto auto;
        gap: min(1.852dvw,8px);
    }
    .grid_item{
        width: min(44.444dvw,192px);
        /* height: min(70.213dvw,264px); */
        height: fit-content;
        border-radius: min(0.926dvw,4px);
    }
    .product_item {
        width: min(44.444dvw,192px);
        border-radius: min(0.926dvw,4px);
        border: min(0.231dvw,1px) solid;
        border-color: rgb(0, 0, 0, 0.01);
    }
    .product_img{
        height: min(44.444dvw,192px);
    }
    .product_img div{ 
        height: min(v-bind(changeSize(7.407,'dvw')),v-bind(changeSize(32)));  
        padding: min(v-bind(changeSize(1.852,'dvw')),v-bind(changeSize(8)));  
        font-size: min(v-bind(changeSize(2.778,'dvw')),v-bind(changeSize(12)));
    }
    .product_info{
        height: min(22.222dvw,96px);
        padding: min(2.778dvw,12px);
    }
    .product_info h4{
        height: min(5.556dvw,24px);
        font-size: min(3.704dvw,16px);
    }
    .info_quality{
        height: min(9.259dvw,40px);
        gap: min(1.852dvw,8px);
    }
    .info_quality h5{
        height: min(4.63dvw,20px);
        font-size: min(3.241dvw,14px);
    }
    .info_quality h5 span{
        font-size: min(2.778dvw,12px);
    }
    .info_quality div{
        height: min(2.778dvw,12px);
    }
    .rating svg{
        width: min(2.778dvw,12px);
        height: min(2.778dvw,12px);
    }
    .sold{
        font-size: min(2.315dvw,10px);
    }
}
/* @media (width<=376px){
    .grid_container{
        grid-template-columns: auto auto;
        gap: min(2.128dvw,8px);
    }
    .grid_item{
        width: min(44.681dvw,168px);
        height: fit-content;
        border-radius: min(1.064dvw,4px);
    }
    .product_item {
        width: min(44.681dvw,168px);
        border-radius: min(1.064dvw,4px);
        border: min(0.266dvw,1px) solid;
        border-color: rgb(0, 0, 0, 0.01);
    }
    .product_img{
        height: min(44.681dvw,168px);
    }
    .product_img div{ 
        height: min(v-bind(changeSize(8.511,'dvw')),v-bind(changeSize(32)));  
        padding: min(v-bind(changeSize(2.128,'dvw')),v-bind(changeSize(8)));  
        font-size: min(v-bind(changeSize(3.191,'dvw')),v-bind(changeSize(12)));
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
} */
</style>