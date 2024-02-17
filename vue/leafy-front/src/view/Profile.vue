<script setup>
import { useRoute } from 'vue-router';
import BaseMenu from '../components/BaseMenu.vue';
import BaseFooter from '../components/BaseFooter.vue';
import BaseProductList from '../components/shop_page/BaseProductList.vue';
import BaseFilterItem from '../components/shop_page/BaseFilterItem.vue';
import Basesortitem from '../components/shop_page/BaseSortItem.vue';
let {params}=useRoute()
const productList=[
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
]
const recommendProduct=[
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
    {itemId: 300040,name: "small zee cactus",itemOwner: "piraphat123@gmail.com",type: "cactus",totalRating: 0,sold: 0,price: "32.00",updatedAt: "1/10/2024, 14:42:15"},
]
// let id=params.id
</script>
<template>
    <!-- this is profile page {{ params.id }} -->
    <BaseMenu/>
    <div class="wrapper_profile">
            <!-- username & description -->
        <!-- picture -->
        <div class="container_user_info">
            <div class="big_image">
                <img src="../assets/shop_p/shop_title.jpg" alt="big_img">
            </div>
            <!-- <img src="../assets/vue.svg" alt="soybean"> -->
            <!-- wrapper 1 -->
            <div class="wrapper_user">
                <!-- user img & username -->
                <div class="user">
                    <div class="user_img">
                        <img src="../assets/icon/user_icon.png" alt="user_img">
                    </div>
                    <div class="user_info">
                        <h5>
                            Username
                        </h5>
                        <!-- chat & follower -->
                        <div>
                            <button>
                                Chat Now
                            </button>
                            <button>
                                Follow
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
          
        <!-- detail and recommend -->
        <div class="wrapper_details">
            <div class="container_details">
                <!-- suplier detail -->
                <div class="suplier_details">
                    <!-- rating & products -->
                    <div>
                        <!-- ratings -->
                        <div>
                            <h6>
                                Ratings
                            </h6>
                            <h6>
                                4
                            </h6>
                        </div>
                        <!-- products -->
                        <div>
                            <h6>
                                Products
                            </h6>
                            <h6>
                                5
                            </h6>
                        </div> 
                        <!-- response rate -->                        
                        <div>
                            <h6>
                                Response Rate
                            </h6>
                            <h6>
                                100%
                            </h6>
                        </div> 
                    </div>

                    <!-- response rate & response time -->
                    <div>
                        <!-- response rate -->
                        <div>
                            <h6>
                                Response Rate
                            </h6>
                            <h6>
                                100%
                            </h6>
                        </div>  
                        <!-- response time -->
                        <div>
                            <h6>
                                Response Time
                            </h6>
                            <h6>
                                within hours
                            </h6>
                        </div>
                        
                    </div>
                    
                    <!-- follower & joind -->
                    <div>
                        <!-- follower -->
                        <div>
                            <h6>
                                Follower
                            </h6>
                            <h6>
                                1
                            </h6>
                        </div>
                        
                        <!-- joined -->
                        <div>
                            <h6>
                                Joined
                            </h6>
                            <h6>
                                2 days ago
                            </h6>
                        </div>    
                    </div>
                    
                </div>
                <div class="recommedation">
                    <!-- recommendation -->
                    <h5>
                        Recommended for You
                    </h5>
                    <BaseProductList :product-list="recommendProduct"  :gridColumn="4"  />    
                </div>
            </div>
        </div>

        <!-- product list and filter -->
        <div class="container_product">
            <BaseFilterItem/>
            <div class="wrapper_product">
                <div class="product_list">
                    <Basesortitem/>
                    <BaseProductList :product-list="productList"  :gridColumn="3"  />
                </div>
                <div class="product_sold_out">
                    <h5>
                        Sold Out
                    </h5>
                    <BaseProductList :product-list="productList"  :gridColumn="3" :sold-out="true" />
                </div>
            </div>
        </div>       
        <!-- <div class="container_product">
            <BaseFilterItem/>
            <div class="wrapper_product">
                <Basesortitem/>
                <BaseProductList :product-list="productList"  :gridColumn="3"  />
            </div>
        </div> -->
    </div>
    <BaseFooter/>  
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_profile {
    display: flex;
    flex-direction: column;
    width: auto;
    height: fit-content;
    gap: min(1.389dvw,20px);
    background-color: #F5F5F5;
    justify-content: center;
    align-items: center;

}
.container_user_info{
    display: flex;
    position: relative;
    flex-direction: column;
    width: inherit;
    height: min(17.778dvw, 256px);
}
.big_image{
    display: flex;
    width: auto;
    height: min(13.333dvw, 192px);
    overflow: hidden;
    justify-content: center;
    align-items: center;
}
.big_image img{
    width: 100%;
    height: auto;
    z-index: 0;
}
.wrapper_user{
    display: flex;
    position: absolute;
    flex-direction: column;
    width: auto;
    height: fit-content;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 50%;
    right: 50%;
    z-index: 1;
}

.user{
    display: flex;
    position: relative;
    width: fit-content;
    height: min(8.889dvw,128px);
    /* position: absolute; 
    bottom: -50px;*/
    justify-content: center;
    align-items: center;
    gap: min(1.389dvw,20px);
    bottom: 0;
}
.user_img{
    width: min(8.889dvw,128px);
    height: min(8.889dvw,128px);
    border-radius: 50%;
    border: min(0.278dvw,4px) solid #FFF;
    overflow: hidden;
    background-color: #FAFAFA;
}
.user_img img{
    width: 100%;
    height: auto;
}
.user_info{
    display: flex;
    width: min(67.5dvw,972px);
    height: 100%;
    justify-content: space-between;
    align-items: end;
    gap: min(0.833dvw,12px);
}
.user_info h5{
    width: fit-content;
    height: min(2.5dvw,36px);
    font-size: min(1.667dvw,24px);
    font-weight: 700;
    color: #111827;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.user_info div{
    display: flex;
    width: fit-content;
    height: fit-content;
    gap: min(0.833dvw,12px);
}
.user_info div button{
    display: flex;
    width: min(8.611dvw,124px);
    height: min(2.778dvw,40px);
    font-size: min(1.111dvw,16px);
    border: min(0.069dvw,1px) solid;
    border-color: #26AC34;
    color: #26AC34;
    background-color: #FFF;
    border-radius: min(0.278dvw,4px);
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.user_info div button:hover {
    border-color: #26AC34;
    color: #fff;
    background-color: #26AC34;
}
.user_info div button:active {
    background-color: #58d264;
    border-color: #58d264;
}
.wrapper_details{
    display: flex;
    width: auto;
    flex-direction: column;
    height: fit-content;
    justify-content: center;
    align-items: center;
}
.container_details{
    display: flex;
    flex-direction: column;
    width: min(77.778dvw,1120px);
    height: fit-content;
    gap: min(1.389dvw,20px);
    justify-content: center;
    align-items: center;
}
.recommedation{
    display: flex;
    flex-direction: column;
    width: inherit;
    height: fit-content;

}
.recommedation h5{
    display: flex;
    width: inherit;
    height: min(2.5dvw,36px);
    font-weight: 700;
    font-size: min(1.667dvw,24px);
    color: #252525;
    align-items: center;
}

.suplier_details{
    display: flex;
    width: inherit;
    height: fit-content;
    background-color: white;
    padding: min(1.389dvw,20px);
    gap: min(4.167dvw,60px);
    border-radius: min(0.556dvw,8px);
}
.suplier_details div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: min(0.833dvw,12px);

}
.suplier_details div div{
    display: flex;
    width: min(22.222dvw,320px);
    height: min(1.389dvw,20px);
    flex-direction: row;
    gap: min(0.833dvw,12px);
    text-align: center;
    align-items: center;
}
.suplier_details div > div:nth-child(3){
    display: none;
}
.suplier_details div div h6{
    font-size: min(0.972dvw,14px);
    font-weight: 400;
    color: #9E9E9E;
}
.suplier_details div div h6:nth-child(2){
    color: #26AC34;
}
.container_product{
    display: flex;
    width: min(77.778dvw,1120px);
    height: fit-content;
    justify-content: center;
    padding-bottom: min(1.389dvw,20px);
    gap: min(2.222dvw,32px);
}
.wrapper_product{
    display: flex;
    width: min(57.778dvw,832px);
    flex-direction: column;
    gap: min(2.778dvw,40px);
}
.product_list{
    display: flex;
    flex-direction: column;
    gap: min(2.222dvw,32px);
}
.product_sold_out{
    display: flex;
    flex-direction: column;
    gap:min(2.222dvw,32px);
}
.product_sold_out h5{
    font-size: min(1.667dvw,24px);
    font-weight: 700;
    color: #252525;
}

@media (width<=744px){
    .wrapper_profile{
        gap: min(2.688dvw,20px);
    }
    .container_user_info{
        height: min(34.409dvw,256px);
    }
    .big_image{
        height: min(25.806dvw,192px);
    }
    .user{
        height: min(17.204dvw,128px);
        gap: min(2.688dvw,20px);
    }
    .user_img{
        width: min(17.204dvw,128px);
        height: min(17.204dvw,128px);
    }
    .user_info{
        width: min(68.28dvw,508px);
    }
    .user_info h5{
        height: min(4.839dvw, 36px);
        font-size: min(3.226dvw,24px);
    }
    .user_info div{
        gap: min(1.613dvw,12px);
    }
    .user_info div button{
        width: min(16.667dvw,124px);
        height: min(5.376dvw,40px);
        font-size: min(2.151dvw,16px);
        border: min(0.134dvw,1px) solid;
        border-radius: min(0.538dvw,4px);
        padding: min(1.075dvw,8px) min(1.613dvw,12px);  
    }
    .container_details{
        width: min(88.172dvw,656px);
        gap: min(2.688dvw,20px);
    }
    .container_details h5{
        height: min(4.301dvw,32px);
        font-size: min(2.688dvw,20px);
    }
    .suplier_details{
        padding: min(2.151dvw,16px);
        gap: min(1.613dvw,12px);
        border-radius: min(0.538dvw,4px);
    }
    .suplier_details div{
        gap: min(1.613dvw,12px);
    }
    .suplier_details div div{
        width: min(26.882dvw,200px);
        height: min(2.151dvw,16px);
        gap: min(1.613dvw,12px);
    }
    .suplier_details div div h6{
        font-size: min(1.613dvw,12px);
    }
    .container_product{
        width: min(88.172dvw,656px);
        padding-bottom: min(2.688dvw,20px);
        gap: min(2.151dvw,16px);
    }
    .wrapper_product{
        width: min(65.591dvw,488px);
        gap: min(2.688dvw,20px);
    }
    .product_list{
        gap: min(2.688dvw,20px);
    }
    .product_sold_out{
        gap: min(2.688dvw,20px);
        
    }
    .product_sold_out h5{
        font-size: min(2.688dvw,20px);
    }

}

@media (width<=376px){
    .wrapper_profile{
        gap: min(3.191dvw,12px);
    }
    .container_user_info{
        height: min(61.702dvw,232px);
    }
    .big_image{
        height: min(34.043dvw,128px);
    }
    .user{
        width: min(100dvw,376px);
        height: min(40.426dvw,152px);
        gap: min(5.319dvw,20px);
    }
    .user_img{
        position: absolute;
        width: min(25.532dvw,96px);
        height: min(25.532dvw,96px);
        left: min(4.255dvw,16px);
        top: 0;
    }
    .user_info{
        flex-direction: column;
        justify-content: end;
        align-items: center;
        width: 100%;
        gap: min(3.191dvw,12px);
    }
    .user_info h5{
        width: 65%;
        height: min(9.574dvw,36px);
        margin-left: 35%;        
        font-size: min(6.383dvw,24px);
        
    }
    .user_info div{
        gap: min(3.191dvw,12px);
    }
    .user_info div button{
        width: min(44.149dvw,166px);
        /* width: 100%; */
        height: min(9.574dvw,36px);
        font-size: min(3.723dvw,14px);
        border: min(0.266dvw,1px) solid ;
        border-radius: min(1.064dvw,4px);
        padding: min(2.128dvw,8px) min(3.191dvw,12px);  
    }
    .container_details{
        width: min(100dvw,376px);
        gap: min(3.191dvw,12px);
    }
    .recommedation{
        width: min(91.489dvw,344px);
    }
    .recommedation h5{
        width: min(91.489dvw,344px);
        height: min(7.447dvw,28px);
        font-size: min(4.787dvw,18px);
    }
    .suplier_details{
        padding: min(4.255dvw,16px);
        gap: min(3.191dvw,12px);
        border-radius: 0px;
        justify-content: space-between;
    }
    .suplier_details div:nth-child(1){
        width: 100%;
        flex-direction: row;
        gap: min(3.191dvw,12px);
        justify-content: space-between;
    }
    .suplier_details div:nth-child(1) div{
        flex-direction: row;
        width: fit-content;
        height: min(4.255dvw,16px);
        justify-content: center;
        gap: min(2.128dvw,8px);
    }
    .suplier_details div:nth-child(1)> div:nth-child(3){
        display: flex;
    }
    .suplier_details >div:nth-child(2),.suplier_details >div:nth-child(3){
        display: none;
    }
    .suplier_details div div h6{
        font-size: min(3.191dvw,12px);
    }
    .container_product{
        width: min(100dvw,376px);
        gap: min(3.191dvw,12px);
        padding: 0px min(4.255dvw,16px);
    }
    .wrapper_product{
        width: min(100dvw,376px);
        gap: min(3.191dvw,12px);
    }
    .product_list{
        gap: min(3.191dvw,12px);
    }
    .product_sold_out{
        padding-bottom: min(4.255dvw,16px);
        gap: min(3.191dvw,12px);
    }
    .product_sold_out h5{
        font-size:  min(4.787dvw,18px);
        text-align: center;
    }
    
}
</style>