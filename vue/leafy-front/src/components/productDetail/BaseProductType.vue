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
        <div class="information">
            <h4>
                Prolyscias Fabian
            </h4>
            <div class="" >
                <!-- for show rating and sold -->
                <div>
                    <div>
                        <h5>4.6</h5>
                        ⭐⭐⭐
                    </div>
                    <h5>
                        1 sold
                    </h5>
                </div>
                <!-- for show price -->
                <div>
                    <h5>
                        80.00
                    </h5>
                </div>
                <!-- for show type -->
                <div>
                    <button>
                        <img src="../../assets/vue.svg" alt="product_type">
                    </button>
                    <button>
                        <img src="../../assets/vue.svg" alt="product_type">
                    </button>
                </div>
                <!-- for select quantity and show stock -->
                <div>
                    <h5>
                        quantity
                    </h5>
                    <div>
                        <button>
                            &lt;
                        </button>
                        <input type="number">
                        <button>
                            &gt;
                        </button>
                    </div>
                    <h5>
                        13 pieces avaliable
                    </h5>
                </div>
                <!-- button for add and buy -->
                <div>
                    <button>
                        Add to Cart
                    </button>
                    <button>
                        Buy Now
                    </button>
                </div>
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
    width: 1120px;
    height: fit-content;
    padding: 20px;
    gap: 20px;
}
.images{
    display: flex;
    width: 396px;
    height: 448px;
    gap: 12px;
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
    gap: 8px;
}
.styles ul li{
    width: 80px;
    height: 80px;
}
.styles ul li button{
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    border: none;
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
    width: 304px;
    height: 448px;
    position: relative;
    justify-content: center;
    align-items: center;
}
.show_image div{
    display: flex;
    width: fit-content;
    height: fit-content;
    padding: 12px;
    position: absolute;
    gap: 8px;
    right: 0;
    bottom: 0;
}
.show_image div button{
    display: flex;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    justify-content: center;
    align-items: center;
    /* flex-grow: 1; */
}
.show_image div button svg{
    width: 19px;
    height: 19px;
}
.show_image img{
    display: flex;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: center;
}

.information{
    display: flex;
    width: fit-content;
    height: fit-content;
    flex-direction: column;
}

/* Chrome, Safari, Edge, Opera */
/* input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
} */
</style>