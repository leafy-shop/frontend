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
                                Chat
                            </button>
                            <button>
                                Follower
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
        
              
    </div>
    <BaseFooter/>  
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_profile{
    display: flex;
    flex-direction: column;
    width: auto;
    height: fit-content;
    gap: 20px;
    background-color: #F5F5F5;
    justify-content: center;
    align-items: center;

}
.container_user_info{
    display: flex;
    position: relative;
    flex-direction: column;
    width: inherit;
    height: 256px;
}
.big_image{
    display: flex;
    width: auto;
    height: 192px;
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
    height: 128px;
    /* position: absolute; 
    bottom: -50px;*/
    justify-content: center;
    align-items: center;
    gap: 20px;
    bottom: 0;
}
.user_img{
    width: 128px;
    height: 128px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fff;
}
.user_img img{
    width: 100%;
    height: auto;
}
.user_info{
    display: flex;
    width: 972px;
    height: 100%;
    justify-content: space-between;
    align-items: end;
    gap: 12px;
}
.user_info h5{
    width: fit-content;
    height: 36px;
    font-size: 24px;
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
    gap: 12px;
}
.user_info div button{
    display: flex;
    width: 124px;
    height: 40px;
    font-size: 16px;
    border: 1px solid ;
    border-color: #26AC34;
    color: #26AC34;
    background-color: #FFF;
    border-radius: 4px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
    width: 1120px;
    height: fit-content;
    gap: 20px;
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
    height: 36px;
    font-weight: 700;
    font-size: 24px;
    color: #252525;
    align-items: center;
}

.suplier_details{
    display: flex;
    width: inherit;
    height: fit-content;
    background-color: white;
    padding: 20px;
    gap: 60px;
    border-radius: 4px;
    
}
.suplier_details div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;

}
.suplier_details div div{
    display: flex;
    width: 320px;
    height: 20px;
    flex-direction: row;
    gap: 12px;
}
.suplier_details div > div:nth-child(3){
    display: none;
}
.suplier_details div div h6{
    font-size: 14px;
    font-weight: 400;
    color: #9E9E9E;
}
.suplier_details div div h6:nth-child(2){
    color: #26AC34;
}
.container_product{
    display: flex;
    width: 1120px;
    height: fit-content;
    justify-content: center;
    padding-bottom: 20px ;
    gap: 32px;
}
.wrapper_product{
    display: flex;
    flex-direction: column;
    gap: 40px;
}
.product_list{
    display: flex;
    flex-direction: column;
    gap: 32px;
}
.product_sold_out{
    display: flex;
    flex-direction: column;
    gap: 32px;
}
.product_sold_out h5{
    font-size: 24px;
    font-weight: 700;
    color: #252525;
}

@media (width<=744px){
    .wrapper_profile{
        gap: 20px;
    }
    .container_user_info{
        height: 256px;
    }
    .big_image{
        height: 192px;
    }
    .user{
        height: 128px;
        gap: 20px;
    }
    .user_img{
        width: 128px;
        height: 128px;
    }
    .user_info{
        width: 508px;
    }
    .user_info h5{
        height: 36px;
        font-size: 24px;
    }
    .user_info div{
        gap: 12px;
    }
    .user_info div button{
        width: 124px;
        height: 40px;
        font-size: 16px;
        border: 1px solid ;
        border-radius: 4px;
        padding: 8px 12px;  
    }
    .container_details{
        width: 656px;
        gap: 20px;
    }
    .container_details h5{
        height: 32px;
        font-size: 20px;
    }
    .suplier_details{
        padding: 16px;
        gap: 12px;
        border-radius: 4px;
    }
    .suplier_details div{
        gap: 12px;
    }
    .suplier_details div div{
        width: 200px;
        height: 16px;
        gap: 12px;
    }
    .suplier_details div div h6{
        font-size: 12px;
    }
    .container_product{
        width: 656px;
        padding-bottom: 20px ;
        gap: 16px;
    }
    .wrapper_product{
        gap: 20px;
    }
    .product_list{
        gap: 20px;
    }
    .product_sold_out{
        gap: 20px;
        
    }
    .product_sold_out h5{
        font-size: 20px;
    }

}

@media (width<=376px){
    .wrapper_profile{
        gap: 12px;
    }
    .container_user_info{
        height: 232px;
    }
    .big_image{
        height: 128px;
    }
    .user{
        width: 376px;
        height: 152px;
        gap: 20px;
    }
    .user_img{
        position: absolute;
        width: 96px;
        height: 96px;
        left: 16px;
        top: 0;
    }
    .user_info{
        flex-direction: column;
        justify-content: end;
        align-items: center;
        width: 100%;
        gap: 12px;
    }
    .user_info h5{
        width: 65%;
        height: 36px;
        margin-left: 35%;        
        font-size: 24px;
        
    }
    .user_info div{
        gap: 12px;
    }
    .user_info div button{
        width: 166px;
        height: 36px;
        font-size: 14px;
        border: 1px solid ;
        border-radius: 4px;
        padding: 8px 12px;  
    }
    .container_details{
        width: 376px;
        gap: 12px;
        
    }
    .recommedation{
        width: 344px;
    }
    .recommedation h5{
        width: 344px;
        height: 28px;
        font-size: 18px;
    }
    .suplier_details{
        padding: 16px;
        gap: 12px;
        border-radius: 0px;
        justify-content: space-between;
    }
    .suplier_details div:nth-child(1){
        width: 100%;
        flex-direction: row;
        gap: 12px;
        justify-content: space-between;
    }
    .suplier_details div:nth-child(1) div{
        flex-direction: row;
        width: fit-content;
        height: 16px;
        justify-content: center;
        gap: 8px;
    }
    .suplier_details div:nth-child(1)> div:nth-child(3){
        display: flex;
    }
    .suplier_details >div:nth-child(2),.suplier_details >div:nth-child(3){
        display: none;
    }
    .suplier_details div div h6{
        font-size: 12px;
    }
    .container_product{
        width: 376px;
        gap: 12px;
    }
    .wrapper_product{
        gap:12px;
    }
    .product_list{
        gap:12px;
    }
    .product_sold_out{
        padding-bottom: 16px;
        gap: 12px;
    }
    .product_sold_out h5{
        font-size: 18px;
        text-align: center;
    }
    
}
</style>