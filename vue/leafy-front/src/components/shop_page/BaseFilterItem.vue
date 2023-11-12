<script setup>
import {ref}from 'vue'
const categoryInput=ref(undefined)

const categoryArr =[
    {name:"Plant",value:'plant'},
    {name:"Flower",value:'flower'},
    {name:"Cactus",value:'cactus'},
    {name:"Seed",value:'seed'},
    {name:"Equirement",value:'equirement'},
    {name:"Meterial",value:'meterial'},
]
</script>
<template>
    <div class="wrapper_filter">
        <div class="category">
            <h4>
                Category
            </h4>
            <div class="category_list">
                <div @click="categoryInput=cate.value"  v-for="(cate,index) of categoryArr" :key="index" class="category_item">
                    <input  type="checkbox" :id="cate.name" >
                    <label :for="cate.name">{{ cate.name }}</label> 
                </div>
            </div>
        </div>
        <div class="price">
            <h4>
                Filter by price
            </h4>
            <div class="price_filter">
                <input type="number" placeholder="฿Min">
                <h4>
                    -
                </h4>
                <input type="number" placeholder="฿Max">
                <button class="price_button">
                    &gt;
                </button>
            </div>
        </div>
        <div class="point">
            <h4>
                Point
            </h4>
            <div class="point_list">
                <button class="point_item">
                    <div>
                        ⭐⭐⭐⭐⭐
                    </div>                    
                </button>
                <button class="point_item">
                    <div>
                        ⭐⭐⭐⭐
                    </div> 
                    <h4>
                        over
                    </h4>                   
                </button>
                <button class="point_item">
                    <div>
                        ⭐⭐⭐
                    </div>  
                    <h4>
                        over
                    </h4>                   
                </button>
                <button class="point_item">
                    <div>
                        ⭐⭐
                    </div>  
                    <h4>
                        over
                    </h4>                   
                </button>
            </div>
        </div>

        <div class="pop_tag">
            <h4>
                Popular Tags
            </h4>
            <div class="tag_list">
                <button>testing2</button>
                <button>testin</button>
                <button>testing55</button>
                <button>tes</button>
                <button>testing2</button>
                <button>testin</button>
                <button>testing55</button>
                <button>tes</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.wrapper_filter{
    width: fit-content;
    height: fit-content;
    margin: 20px;
    
}

.category{
    width: 216px;
    height: 248px;
}
.category h4{
    font-size: 24px;
}
.category_list{
    display: flex;
    flex-direction: column;
}
.category_list div{
    /* display: flex; */
    height: fit-content;
    width: fit-content;
    margin-top: 12px;
}
.category_list div input{
    /* display: flex; */
    width: 16px;
    height: 16px;
    margin: auto;
    border-color: #26AC34;
}
.category_list div label{
    font-size: 14px;
    margin-left: 8px;
} 

.price{
    display: flex;
    width: fit-content;
    height: 96px;
    flex-direction: column;
    font-size: 24px;
}

.price_filter{
    display: flex;
    width: fit-content;
    height: fit-content;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
}
.price_filter h4{
    display: flex;
    height: auto;
    width: auto;
    align-items: center;
    margin: 0px 8px;
}
.price_filter input{
    width: 78px;
    height: 28px;
    padding: 1px 3px;
    font-size: 14px;
}
.price_button{
    width: 28px;
    height: 28px;
    margin: auto 8px;
    background-color: #26AC34;
    color: white;
    border-radius: 4px;
    border: none;
}

.point{
    width: fit-content;
    height: 184px;
    font-size: 24px;
}

.point_list{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}
.point_item{
    display: flex;
    width: 216px;
    border: none;
}
.point_item div{
    /* flex-grow: 5; */
    width: 60%;
}
.point_item h4{
    width: 40%;
}

.tag_list{
    display: inline-flex;
    width: 216px;
    height: fit-content;
}
</style>