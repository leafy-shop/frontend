<script setup>
</script>
<template>
    <div class="wrapper_Product_type">
        <div class="images">
            <div class="styles">
                <ul>
                    <li v-for="value in 10" :key="value">
                        <button>
                            <img src="../../assets/vue.svg" alt="image_style">
                        </button>
                    </li>
                </ul>
            </div>
            <div class="show_image">
                <img src="../../assets/vue.svg" alt="image_style">
                <div>
                    <button>
                        <!-- <img src="../../assets/home_p/icon/left.png" alt="previous"> -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M12.4001 15.5997L6.80011 9.99966L12.4001 4.39966" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button>
                        <!-- <img src="../../assets/home_p/icon/right.png" alt="next"> -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.6001 4.39966L13.2001 9.99966L7.6001 15.5997" stroke="#212121" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div> 
            </div>
        </div>
        <div class="container_information">
            <div class="information_header">
                <h4>
                    Prolyscias Fabian
                </h4>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_3219_22258" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="3" width="21" height="20">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3H22.4725V22.501H2V3Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_3219_22258)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.82371 12.1231C5.22571 16.4851 10.7647 20.0121 12.2367 20.8851C13.7137 20.0031 19.2927 16.4371 20.6497 12.1271C21.5407 9.34112 20.7137 5.81212 17.4277 4.75312C15.8357 4.24212 13.9787 4.55312 12.6967 5.54512C12.4287 5.75112 12.0567 5.75512 11.7867 5.55112C10.4287 4.53012 8.65471 4.23112 7.03771 4.75312C3.75671 5.81112 2.93271 9.34012 3.82371 12.1231ZM12.2377 22.5011C12.1137 22.5011 11.9907 22.4711 11.8787 22.4101C11.5657 22.2391 4.19271 18.1751 2.39571 12.5811C2.39471 12.5811 2.39471 12.5801 2.39471 12.5801C1.26671 9.05812 2.52271 4.63212 6.57771 3.32512C8.48171 2.70912 10.5567 2.98012 12.2347 4.03912C13.8607 3.01112 16.0207 2.72712 17.8867 3.32512C21.9457 4.63412 23.2057 9.05912 22.0787 12.5801C20.3397 18.1101 12.9127 22.2351 12.5977 22.4081C12.4857 22.4701 12.3617 22.5011 12.2377 22.5011Z" fill="#FF5E65"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1537 10.6248C17.7667 10.6248 17.4387 10.3278 17.4067 9.93578C17.3407 9.11378 16.7907 8.41978 16.0077 8.16678C15.6127 8.03878 15.3967 7.61578 15.5237 7.22278C15.6527 6.82878 16.0717 6.61478 16.4677 6.73878C17.8307 7.17978 18.7857 8.38678 18.9027 9.81378C18.9357 10.2268 18.6287 10.5888 18.2157 10.6218C18.1947 10.6238 18.1747 10.6248 18.1537 10.6248Z" fill="#FF5E65"/>
                </svg>
            </div>
            <div class="information_details" >
                <!-- for show rating and sold -->
                <div class="rating_list">
                    <div class="rating_item">
                        <p>4.6</p>
                        ⭐ ⭐ ⭐ ⭐ ⭐
                    </div>
                    <p>
                        1 sold
                    </p>
                </div>
                <!-- for show price -->
                <div class="price">
                    <h3>
                        ฿80 - ฿150
                    </h3>
                </div>
                <!-- for show type -->
                <div class="grid_container">
                    <button class="grid_item">
                        <div class="product_img">
                            <img src="../../assets/vue.svg" alt="product_type">
                        </div>
                    </button>
                </div>
                <!-- for select quantity and show stock -->
                <div class="stocks">
                    <h6>
                        Quantity
                    </h6>
                    <div class="stocks_list">
                        <button>
                            &lt;
                        </button>
                        <input type="number">
                        <button>
                            &gt;
                        </button>
                    </div>
                    <p>
                        13 pieces avaliable
                    </p>
                </div>
                <!-- button for add and buy -->
            </div>
                <div class="wrapper_apply_buy">
                    <button @click="addToClass">
                        Add to Cart
                    </button>
                    <button @click="buyNow">
                        Buy Now
                    </button>
                </div>
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_Product_type{
    display: flex;
    /* width: min(77.778dvw, 1120px); */
    /* height: fit-content; */
    height: min(33.611dvw, 484px);
    padding: min(1.389dvw, 20px);
    gap: min(1.389dvw, 20px);
    background-color: #fff;
    border-radius: min(0.556dvw, 8px);
}
.images{
    display: flex;
    width: min(27.5dvw, 396px);
    height: min(30.833dvw, 444px);
    gap: min(0.833dvw, 12px);
}
.styles{
    width: fit-content;
    height: inherit;
    overflow-y: auto;
}

.styles ul{
    display: flex;
    flex-direction: column;
    width: inherit;
    height: fit-content;
    gap: min(0.556dvw, 8px);
}
.styles ul li{
    width: min(5.556dvw, 80px);
    height: min(5.556dvw, 80px);
}
.styles ul li button{
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: min(0.278dvw, 4px);
    background-color: rgb(196, 196, 196);
}
.styles ul li button img{
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
}

.styles::-webkit-scrollbar{
    display: none;
}
.show_image{
    display: flex;
    width: min(21.111dvw, 304px);
    height: min(30.833dvw, 444px);
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: min(0.278dvw, 4px);
    background-color: rgb(196, 196, 196);
}
.show_image div{
    display: flex;
    width: fit-content;
    height: fit-content;
    padding: min(0.833dvw, 12px);
    position: absolute;
    gap:  min(0.556dvw, 8px);
    right: 0;
    bottom: 0;
}
.show_image div button{
    display: flex;
    width: min(2.222dvw, 32px);
    height: min(2.222dvw, 32px);
    border-radius: 50%;
    border: none;
    justify-content: center;
    align-items: center;
    /* flex-grow: 1; */
}
.show_image div button svg {
    width: min(1.389dvw, 20px);
    height: min(1.389dvw, 20px);
}
.show_image img {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
}

.container_information {
    display: flex;
    /* width: fit-content; */
    /* width: min(46.111dvw, 664px); */
    width: 100%;
    height: fit-content;
    flex-direction: column;
    gap: min(1.111dvw, 16px);
}
.container_information h4 {
    font-size: min(1.667dvw, 24px);
    line-height: 152%;
    color: #212121;
}
.information_header {
    display: flex;
    justify-content: space-between;
}
.information_header svg {
    display: flex;
    width: min(21.667dvw, 24px);
    height: min(21.667dvw, 24px);
}
.information_details {
    display: flex;
    flex-direction: column;
    height: min(23.333dvw, 336px);
    gap: min(1.111dvw, 16px);
    /* background-color: aquamarine; */
}
.rating_list {
    display: flex;
    gap: min(0.556dvw, 8px);
    font-size: min(0.833dvw, 12px);
    align-items: center;
    text-align: center;
    color: #212121;
}
.rating_item {
    display: flex;
    gap: min(0.278dvw, 4px);
    padding-right: min(0.556dvw, 8px);
    border-right: min(0.069dvw, 1px) solid;
    border-color: #E0E0E0;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: min(0.833dvw, 12px);
    letter-spacing: min(0.014dvw, 0.2px);
    color: #212121;
}
.rating_item p {
    text-decoration: underline;
}
.price h3 {
    font-size: min(2.222dvw, 32px);
    color: #26AC34;
}
.grid_container{
    display: grid;
    width: inherit;
    height: fit-content;
    grid-template-columns: v-bind(changeGridT()) ;
    gap: min(0.556dvw, 8px);
}
.grid_item {
    display: flex;
    /* width: min(v-bind(changeSize(6.111,'dvw')),v-bind(changeSize(88)));
    height: min(v-bind(changeSize(6.111,'dvw')),v-bind(changeSize(88))); */
    width: min(6.111dvw, 88px);
    height: min(6.111dvw, 88px);
    flex-direction: column;
    border-radius: min(0.278dvw, 4px);
    overflow: hidden;
    border: none;
    cursor: pointer;
}
.product_img{
    display: flex;
    width: inherit;
    height: min(6.111dvw, 88px);
    /* height: min(v-bind(changeSize(15.278,'dvw')),v-bind(changeSize(220))); */
    overflow: hidden;
}
/* .grid_container button {
    width: min(6.111dvw, 88px);
    height: min(6.111dvw, 88px);
    border-radius: min(0.278dvw, 4px);
}
.grid_container button img {
    width: max-content;
    height: min-content;
} */
.stocks {
    display: flex;
    align-items: center;
    text-align: center;
    gap: min(0.556dvw, 8px);
}
.stocks h6 {
    font-size: min(1.111dvw, 16px);
    color: #212121;
    font-weight: 400;
}
.stocks p {
    font-size: min(0.972dvw, 14px);
    letter-spacing: min(0.014dvw, 0.2px);
    color: #9E9E9E;
}
.stock_list button input{
    height: min(2.5dvw, 36px);
}
.wrapper_apply_buy {
    display: flex;
    width: inherit;
    height: fit-content;
    /* flex-direction: column; */
    gap: min(0.833dvw, 12px);
}

.wrapper_apply_buy button:nth-child(1) {
    background: #fff;
    color: #26AC34;
    border: min(0.069dvw, 1px) solid;
    border-color: #26AC34;
    border-radius: min(0.278dvw, 4px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.wrapper_apply_buy button:nth-child(1):hover {
    background: #26AC34;
    color: #fff;
}

.wrapper_apply_buy button {
    /* width: min(15dvw, 216px); */
    width: 100%;
    height: min(2.778dvw, 40px);
    margin: auto;
    background-color: #26AC34;
    color: white;
    border: min(0.069dvw, 1px) solid;
    border-color: #26AC34;
    border-radius: min(0.278dvw, 4px);
    cursor: pointer;
    font-size: min(1.111dvw, 16px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.wrapper_apply_buy button:hover {
    color: #26AC34;
    background: #fff;
}
</style>