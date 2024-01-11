<script setup>
import { ref, computed, onUpdated } from 'vue'

const emit = defineEmits(["filterItem"])

const category=ref([])
const min=ref(undefined)
const max=ref(undefined)
const rating=ref(undefined)
const tag=ref("")

let categoryArr = [
    {name:"Plant",value:'plant',selected:false},
    {name:"Flower",value:'flower',selected:false},
    {name:"Cactus",value:'cactus',selected:false},
    {name:"Seed",value:'seed',selected:false},
    {name:"Equirement",value:'equirement',selected:false},
    {name:"Meterial",value:'meterial',selected:false},
]
const tagArr = [
    {name:"Best Product", value:"best product"},
    {name:"New Arrivals", value:"new arrivals"},
    {name:"Plants", value:"plants"},
    {name:"Indoor Plants", value:"indoor plants"},
    {name:"Lilac", value:"lilac"},
    {name:"Jar", value:"jar"},
    {name:"Pot", value:"pot"},
]

const applyFilter=()=>{
    emit('filterItem', {
        category: category.value, 
        min: min.value, 
        max: max.value, 
        rating: rating.value, 
        tag: tag.value })
    console.log( categoryArr)
}
const clearFilterItem =() => {
    
    let checked=document.getElementsByName("category_check")
    // let checked=document.getElementsByClassName("category_check")
    checked.checked=false
    category.value = []
    min.value = undefined
    max.value = undefined
    rating.value = undefined
    tag.value = ""
    applyFilter()
    // categoryArr = categoryArr.map(cate=>{
    
    //     cate.selected=false 
    //     return cate
    // })
}
// function for select category
const categorySelector =(categoryName)=>{

    if (category.value.includes(categoryName)) {
        const index = category.value.indexOf(categoryName);
        if (index > -1) { // only splice array when item is found
            category.value.splice(index, 1); // 2nd parameter means remove one item only
        }
    } else {
        category.value.push(categoryName)
    }
    console.log(category.value)
}

onUpdated(()=>{
    // console.log("rating : "+rating.value)
})
</script>
<template>
    <div class="wrapper_filter">
        <div class="category">
            <h4>
                Category
            </h4>
            <div class="category_list">
                <div v-for="(cate, index) of categoryArr" :key="index" class="category_item">
                    <input   @click="categorySelector(cate.value)"   type="checkbox" name="category_check" >
                    <label :for="cate.name">{{ cate.name }}</label>
                    <label :for="cate.name">{{ cate.selected }}</label>
                </div>
            </div>
        </div>
        <hr>
        <div class="price">
            <h4>
                Filter by price
            </h4>
            <div class="price_filter">
                <input type="number" placeholder="฿Min" v-model="min" >
                <h4>
                    -
                </h4>
                <input type="number" placeholder="฿Max" v-model="max" >
                <!-- <button class="price_button">
                    &gt;
                </button> -->
            </div>
        </div>
        <hr>
        <div class="point">
            <h4>
                Point
            </h4>
            <div class="point_list">
                <!-- <input type="radio" id="5" value="5" v-model="filterItem.rating" />
                <label for="5">
                    <div>
                        ⭐⭐⭐⭐⭐
                    </div>
                </label>
                <input type="radio" id="4" value="4" v-model="filterItem.rating" />
                <label for="4">
                    <div>
                        ⭐⭐⭐⭐
                    </div>
                    <h4>
                        over
                    </h4>
                </label>
                <input type="radio" id="3" value="3" v-model="filterItem.rating" />
                <label for="3">
                    <div>
                        ⭐⭐⭐
                    </div>
                    <h4>
                        over
                    </h4>
                </label>
                <input type="radio" id="2" value="2" v-model="filterItem.rating" />
                <label for="2">
                    <div>
                        ⭐⭐
                    </div>
                    <h4>
                        over
                    </h4>
                </label> -->
                <div v-for="(value,index) in 5" :key="index">
                    <input  class="point_item" type="radio" :id="`rating_${value}`" name="rating"  :value="value" v-model="rating"/>
                    <label :for="`rating_${value}`">
                        <div v-for="(v,i) in value" :key="i">
                            ⭐
                        </div>  
                    </label>                    
                </div>
                
                <!-- <input class="point_item" v-model="rating" :value="1">
                    <div>
                        ⭐⭐⭐⭐⭐
                    </div>                    
                </input>
                <input class="point_item" @click="filterItem.rating = 4">
                    <div>
                        ⭐⭐⭐⭐
                    </div> 
                    <h4>
                        over
                    </h4>                   
                </input>
                <input class="point_item" @click="filterItem.rating = 3">
                    <div>
                        ⭐⭐⭐
                    </div>  
                    <h4>
                        over
                    </h4>                   
                </input>
                <input type="checkbox" class="point_item" @click="filterItem.rating = 2">
                <label for="">
                    <div>
                        ⭐⭐
                    </div>  
                    <h4>
                        over
                    </h4> 
                </label> -->
                                      
                <!-- </input> -->
            </div>
        </div>
        <hr>
        <div class="pop_tag">
            <h4>
                Popular Tags
            </h4>
            <div class="wrapper_tag">
                <ul class="tag_list">
                    <li v-for="tag in tagArr">
                        <!-- <button @click="filterItem.tag = tag.value">{{ tag.name }}</button> -->
                        <button >{{ tag.name }}</button>

                    </li>
                </ul>
            </div>

        </div>
        <hr>
        <div class="clear_b">
            <!-- <button
                @click="$emit('baseFilterItem', 1, filterItem.category, filterItem.min, filterItem.max, filterItem.rating, filterItem.tag)">
                apply {{ filterItem.rating }}
            </button> -->
            <button @click="applyFilter">
                 apply <!--{{ filterItem.rating }} -->
            </button>
        </div>
        <div class="clear_b">
            <!-- <button @click="$emit('clear')">
                Clear
            </button> -->
            <button @click="clearFilterItem">
                Clear
            </button>
        </div>
    </div>
</template>
<style scoped>
.wrapper_filter {
    width: 216px;
    height: fit-content;
    margin: 20px;

}

.category {
    width: 216px;
    height: 248px;
}

.category h4 {
    font-size: 24px;
}

.category_list {
    display: flex;
    flex-direction: column;
}

.category_item {
    /* display: flex; */
    height: fit-content;
    width: fit-content;
    margin: 12px 0px 0px 5px;
}

.category_list div input {
    /* display: flex; */
    width: 16px;
    height: 16px;
    margin: auto;
    border-color: #26AC34;
}

.category_list div label {
    font-size: 14px;
    margin-left: 8px;
}

.price {
    display: flex;
    width: 216px;
    height: fit-content;
    flex-direction: column;
    font-size: 24px;
}

.price_filter {
    display: flex;
    width: 216px;
    height: fit-content;
    margin-top: 12px;
    justify-content: center;
    align-items: center;
}

.price_filter h4 {
    display: flex;
    height: auto;
    width: auto;
    align-items: center;
    margin: 0px 3px;
}

.price_filter input {
    width: 78px;
    height: 24px;
    padding: 0px 1px;
    font-size: 14px;
    border: none;
}

.price_button {
    width: 28px;
    height: 28px;
    margin: auto 0px auto 8px;
    background-color: #26AC34;
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
}

.point {
    width: 216px;
    height: fit-content;
    font-size: 24px;
}

.point_list {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}

.point_item {
    display: flex;
    width: 216px;
    border: none;
}

.point_item div {
    /* flex-grow: 5; */
    width: 60%;
}

.point_item h4 {
    width: 40%;
}

.pop_tag {
    font-size: 24px;
}

.wrapper_tag {

    width: 216px;
    height: fit-content;

}

.tag_list {

    list-style: none;
    margin: 8px 0px 0px 0px;

}

.tag_list li {

    display: inline-flex;
    margin: 4px;

}

.tag_list li button {
    padding: 8px;
    border: none;
    font-size: 12px;
    border-radius: 8px;
    background-color: #E0E0E0;
    color: #757575;
    cursor: pointer;
}

hr {
    margin: 20px 0px;
}

.clear_b {
    width: 216px;
    height: 40px;
    margin: 8px 0px;
}

.clear_b button {
    width: inherit;
    height: inherit;
    background-color: #26AC34;
    color: white;
    border: none;
    border-radius: 4px;

}
</style>