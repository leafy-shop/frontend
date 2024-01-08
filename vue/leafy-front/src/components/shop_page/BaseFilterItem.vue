<script setup>
import {ref, computed}from 'vue'

const props = defineProps({
    category: {
        type: Array,
        default: []
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: Infinity
    },
    rating: {
        type: Number,
        default: 0
    },
    tag: {
        type: Array,
        default: []
    }
})

defineEmits(["categoryList"])

let filterItem = computed(()=>{
    console.log(props)
    return { category: props.category, min: props.min, max: props.max, rating: props.rating, tag: props.tag }
})

const categoryArr = [
    {name:"Plant",value:'plant', selected: false},
    {name:"Flower",value:'flower', selected: false},
    {name:"Cactus",value:'cactus', selected: false},
    {name:"Seed",value:'seed', selected: false},
    {name:"Equirement",value:'equirement', selected: false},
    {name:"Meterial",value:'meterial', selected: false},
]

const tagArr = [
    {name:"Best Product", value:"best product", selected: false},
    {name:"New Arrivals", value:"new arrivals", selected: false},
    {name:"Plants", value:"plants", selected: false},
    {name:"Indoor Plants", value:"indoor plants", selected: false},
    {name:"lilac", value:"lilac", selected: false}
]

</script>
<template>
    <div class="wrapper_filter">
        <div class="category">
            <h4>
                Category
            </h4>
            <div class="category_list">
                <div  v-for="(cate,index) of categoryArr" :key="index" class="category_item">
                    <input @click="$emit('categoryList',cate.name)" type="checkbox" :id="cate.name" :value="cate.value" v-model="cate.selected">
                    <label :for="cate.name">{{ cate.name }}</label> 
                </div>
            </div>
        </div>
        <hr>
        <div class="price">
            <h4>
                Filter by price
            </h4>
            <div class="price_filter">
                <input type="number" placeholder="฿Min" :v-model="min">
                <h4>
                    -
                </h4>
                <input type="number" placeholder="฿Max" :v-model="max">
                <button class="price_button">
                    &gt;
                </button>
            </div>
        </div>
        <hr>
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
        <hr>
        <div class="pop_tag">
            <h4>
                Popular Tags
            </h4>
            <div class="wrapper_tag">
                <ul class="tag_list" >
                    <li v-for="tag in tagArr">
                        <button>{{ tag.name }}</button>
                    </li>
                </ul>
            </div>
            
        </div>
        <hr>
        <div class="clear_b">
            <button>
                Clear
            </button>
        </div>
    </div>
</template>
<style scoped>
.wrapper_filter{
    width: 216px;
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
.category_item{
    /* display: flex; */
    height: fit-content;
    width: fit-content;
    margin: 12px 0px 0px 5px;
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
    width: 216px;
    height: fit-content;
    flex-direction: column;
    font-size: 24px;
}

.price_filter{
    display: flex;
    width: 216px;
    height: fit-content;
    margin-top: 12px;
    justify-content: center;
    align-items: center;
}
.price_filter h4{
    display: flex;
    height: auto;
    width: auto;
    align-items: center;
    margin: 0px 3px;
}
.price_filter input{
    width: 78px;
    height: 24px;
    padding: 0px 1px ;
    font-size: 14px;
    border: none;
}
.price_button{
    width: 28px;
    height: 28px;
    margin: auto 0px auto 8px;
    background-color: #26AC34;
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
}

.point{
    width: 216px;
    height: fit-content;
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

.pop_tag{
    font-size: 24px;
}
.wrapper_tag{

    width: 216px;
    height: fit-content;
   
}
.tag_list{

    list-style: none;
    margin: 8px 0px 0px 0px;

}
.tag_list li{
    
    display: inline-flex;
    margin: 4px;

}
.tag_list li button{
    padding: 8px;
    border: none;
    font-size: 12px;
    border-radius: 8px;
    background-color: #E0E0E0;
    color: #757575;
    cursor: pointer;
}

hr{
    margin: 20px 0px ;
}
.clear_b{
    width: 216px;
    height: 40px;
   
}
.clear_b button{
    width: inherit;
    height: inherit;
    background-color: #26AC34;
    color: white;
    border: none;
    border-radius: 4px;
    
}
</style>