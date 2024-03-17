<script setup>
import BaseStar from '../../../components/productDetail/BaseStar.vue';
import { useRouter } from 'vue-router';
// link
const myRouter=useRouter()
const goAdd=()=>myRouter.push({name:'Shop_AS_add'})
// Common attribute
const sortTypeArr =[
    {name:"Popular",value: {name: "popular", type: 'desc'}},
    {name:"New Arrival",value: {name: "new_arrival", type: 'desc'}},
    {name:"Sold Out",value: {name: "price", type: 'desc'}},
    {name:"Top Sales",value: {name: "sales", type: 'desc'}},
    {name:"Point",value: {name: "price", type: 'asc'}},
    {name:"Price",value: {name: "price", type: 'desc'}},
]
// ดึงข้อมูลเกี่ยวกับรูปภาพ

// ดึงข้อมูลเกี่ยวกับ Product
</script>
<template>
<div class="wrapper_my_shop">
    <div class="my_shop">
        <!-- header -->
        <div class="header_shop">
            <h4>
                Products
            </h4>
            <button @click="goAdd">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z" fill="white"/>
                </svg>
                New Product
            </button>
            
        </div>
        <!-- sorter -->
        <div class="sort_shop">
            <div class="sort_list">
                <button v-for="(type,index) of sortTypeArr" :index="index" class="sort_item">
                    {{type.name}}
                    <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99896 5.99957C9.26446 5.99957 9.51908 5.89426 9.70685 5.70679C9.89455 5.51926 10 5.26495 10 4.99979C10 4.73462 9.89455 4.48031 9.70685 4.29279L5.70184 0.292787C5.51408 0.105316 5.25945 0 4.99396 0C4.72846 0 4.47383 0.105316 4.28607 0.292787L0.281064 4.29279C0.0986777 4.48139 -0.00224324 4.73399 3.80267e-05 4.99619C0.0023193 5.25838 0.10762 5.5092 0.29326 5.6946C0.478901 5.88001 0.730027 5.98518 0.992552 5.98746C1.25508 5.98974 1.508 5.88894 1.69683 5.70679L4.99396 2.41379L8.29108 5.70679C8.47884 5.89426 8.73347 5.99957 8.99896 5.99957ZM0.998581 7.01248C0.733736 7.01248 0.479735 7.11758 0.292433 7.30468C0.105189 7.49183 0 7.74562 0 8.01025C0 8.27489 0.105189 8.52868 0.292433 8.71583L4.28761 12.7078C4.47491 12.8949 4.72891 13 4.99376 13C5.2586 13 5.5126 12.8949 5.6999 12.7078L9.69508 8.71583C9.79047 8.62377 9.86656 8.51365 9.91891 8.39189C9.97126 8.27013 9.99881 8.13918 9.99996 8.00666C10.0011 7.87415 9.97584 7.74274 9.92562 7.62009C9.8754 7.49744 9.80124 7.38601 9.70746 7.2923C9.61368 7.1986 9.50216 7.1245 9.37941 7.07432C9.25667 7.02414 9.12515 6.99889 8.99253 7.00004C8.85991 7.00119 8.72885 7.02872 8.60699 7.08102C8.48513 7.13333 8.37492 7.20936 8.28278 7.30468L4.99376 10.5911L1.70473 7.30468C1.51743 7.11758 1.26342 7.01248 0.998581 7.01248Z" fill="#212121"/>
                    </svg>
                </button>
            </div>
        </div>
        <!-- product list -->
        <div class="content_shop">
            <div class="product_list">
                <div class="product_item">
                    <!-- image -->
                    <div class="product_img">
                        <img src="../../../assets/home_p/home_design_content_japanese.png" alt="product_img">
                    </div>
                    <!-- information -->
                    <div class="product_info">
                        <!-- name, star, button -->
                        <div class="product_title">
                            <!-- left -->
                            <div>
                                <h4>
                                    Polyscias Fabian
                                </h4>
                                <!-- start -->
                                <div>
                                    <!-- <BaseStar :rating="4" name="myShop"  /> -->
                                </div>
                            </div>
                            <!-- right -->
                            <div>
                                <button>
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.16671 3.16664H3.00004C2.55801 3.16664 2.13409 3.34223 1.82153 3.65479C1.50897 3.96736 1.33337 4.39128 1.33337 4.83331V14C1.33337 14.442 1.50897 14.8659 1.82153 15.1785C2.13409 15.491 2.55801 15.6666 3.00004 15.6666H12.1667C12.6087 15.6666 13.0327 15.491 13.3452 15.1785C13.6578 14.8659 13.8334 14.442 13.8334 14V9.83331M12.655 1.98831C12.8088 1.82912 12.9927 1.70215 13.196 1.6148C13.3994 1.52746 13.6181 1.48148 13.8394 1.47956C14.0607 1.47763 14.2801 1.5198 14.485 1.6036C14.6898 1.6874 14.8759 1.81116 15.0324 1.96765C15.1889 2.12414 15.3126 2.31022 15.3964 2.51505C15.4802 2.71988 15.5224 2.93934 15.5205 3.16064C15.5185 3.38194 15.4726 3.60064 15.3852 3.80398C15.2979 4.00732 15.1709 4.19123 15.0117 4.34497L7.85671 11.5H5.50004V9.14331L12.655 1.98831Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button>
                                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.33337 8.16667V13.1667M9.66671 8.16667V13.1667M1.33337 4.83333H14.6667M13.8334 4.83333L13.1109 14.9517C13.0809 15.3722 12.8928 15.7657 12.5843 16.053C12.2758 16.3403 11.8699 16.5 11.4484 16.5H4.55171C4.13016 16.5 3.72426 16.3403 3.41578 16.053C3.10729 15.7657 2.91914 15.3722 2.88921 14.9517L2.16671 4.83333H13.8334ZM10.5 4.83333V2.33333C10.5 2.11232 10.4122 1.90036 10.256 1.74408C10.0997 1.5878 9.88772 1.5 9.66671 1.5H6.33337C6.11236 1.5 5.9004 1.5878 5.74412 1.74408C5.58784 1.90036 5.50004 2.11232 5.50004 2.33333V4.83333H10.5Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>

                        </div>
                        <!-- price -->
                        <div class="product_price">
                            $80.00
                        </div>
                        <!-- available -->
                        <div class="product_available">
                            <!-- left -->
                            <div>
                                <h5>
                                    Stocks
                                </h5>
                                <p>
                                    13 
                                    <span>
                                        pieces available
                                    </span>
                                </p>
                            </div>
                            <!-- right -->
                            <p>
                                1 sold
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_my_shop{
    display: flex;
    width: 100%;
    height: fit-content;
    padding: 20px;
    gap: 24px;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    border: none;
    border-radius: 8px;
    background-color: #fff;
}
.my_shop{
    display: flex;
    width: 100%;
    height: inherit;
    flex-direction: column;
    gap: 24px;
}
.header_shop{
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    align-items: center;
}
.header_shop h4{
    width: fit-content;
    font-size: 18px;
    font-weight: 500;
    color: #212121;
}
.header_shop  button{
    display: flex;
    width: 133px;
    height: 36px;
    border-radius: 4px;
    border: none;
    padding: 8px 12px 8px 8px;
    gap: 4px;
    background-color: #26AC34;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0px 1px 2px 0px #0000000D;
    align-items: center;
    justify-content: start;
    cursor: pointer;
}
.header_shop  button svg{
    width: 10px;
    height: 10px;
    margin: 5px;
}
.sort_shop{
    width: 100%;
    height: fit-content;
    overflow-x: auto;
}
.sort_list{
    display: flex;
    width: fit-content;
    height: fit-content;
    gap: 12px;
}
.sort_item{
    display: flex;
    width: fit-content;
    height: 36px;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 4px;
    border-color: #E0E0E0;
    box-shadow: 0px 1px 2px 0px #0000000D;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    color: #212121;
    background-color: #fff;
    gap: 8px;
}
.content_shop{
    display: flex;
    width: 100%;
    height: fit-content;
}
.product_list{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    /* gap: 24px; */
    border-bottom: 1px solid;
    padding-bottom: 24px;
}
.product_item{
    display: flex;
    width: inherit;
    height: inherit;
    justify-content: start;
    align-items: center;
    gap: 24px;
}
.product_item .product_img{
    display: flex;
    width: 76px;
    height: 76px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 4px;
}
.product_img img{
    width: 100%;
    height: auto;
}
.product_item .product_info{
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
}
.product_title{
    display: flex;
    width: inherit;
    height: inherit;
    justify-content: space-between;
    align-items: center;
}
.product_title div:nth-child(1){
    display: flex;
    width: fit-content;
    height: 24px;
    justify-content: start;
    align-items: center;
    gap: 8px;
}
.product_title div:nth-child(1) h4{
    font-size: 16px;
    font-weight: 500;
    color: #212121;
}
/* .product_title div:nth-child(1) div{
    width: fit-content;
    height: 12px;
} */
.product_title div:nth-child(2){
    display: flex;
    width: fit-content;
    height: fit-content;
    justify-content: center;
    gap: 8px;
}
.product_title div:nth-child(2) button{
    display: flex;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    background-color: #fff;
}
.product_item .product_price{
    display: flex;
    width: fit-content;
    height: 24px;
    font-size: 16px;
    font-weight: 500;
    color: #26AC34;
    align-items: center;
}
.product_available{
    display: flex;
    width: 100%;
    height: fit-content;
    align-items: center;
    justify-content: space-between;

}
.product_available div{
    display: flex;
    width: fit-content;
    height: fit-content;
    gap: 12px;
}
.product_available div h5{
    width: fit-content;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #212121;
}
.product_available div p{
    width: fit-content;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #616161;
}
.product_available p{
    width: fit-content;
    height: 16px;
    font-size: 12px;
    font-weight: 400;
    color: #616161;
}
</style>