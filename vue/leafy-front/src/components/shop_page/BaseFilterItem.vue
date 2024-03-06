<script setup>
import { ref, computed, onUpdated, onMounted } from 'vue'
import validation from '../../JS/validation'
const emit = defineEmits(["filterItem", "closeFilter"])

const props = defineProps({
    isShowFilter: {
        type: Boolean,
        require: true,
        default: false
    },
    sortTypeArr: {
        type: Array,
        require: true
    }
})
const category = ref([])
const min = ref(undefined)
const max = ref(undefined)
const rating = ref(undefined)
const tag = ref([])

const sortBy = ref(undefined)
// const showFilter=computed(()=>props.isShowFilter)
// const isShowFilter=ref(showFilter.value)

const closeFilter = (i) => {
    // console.log(isShowFilter)
    // props.isShowFilter=!props.isShowFilter
    console.log('close from filter : ' + !props.isShowFilter)
    
    return emit('closeFilter', { show: i==undefined?false:i})
    // return emit('closeFilter', { show: i==undefined?!props.isShowFilter:i})
}
// this for show filter
// const showFilter=ref(true)
// const shoFIlterComputed=ref(window.innerWidth<1440?true:false)
// can use ref for dynamic value
const categoryArr = [
    { name: "Plant", value: 'plant' },
    { name: "Flower", value: 'flower' },
    { name: "Cactus", value: 'cactus' },
    { name: "Seed", value: 'seed' },
    { name: "Equirement", value: 'equirement' },
    { name: "Meterial", value: 'meterial' },
]
const tagArr = [
    { name: "Best Product", value: "best product" },
    { name: "New Arrivals", value: "new arrivals" },
    { name: "Plants", value: "plant" },
    { name: "Indoor Plants", value: "indoor plant" },
    { name: "Cactus Plants", value: "cactus" },
    { name: "Tree", value: "tree" },
    { name: "House Plants", value: "house plant" },
    { name: "Flower", value: "flower" },
]

const navigationTo = () => {
    // let element = document.getElementsByClassName("wrapper_filter")
    // return navigate.scrollIntoView({behavior:'smooth'})

    return window.scrollTo({ top: 0, behavior: "smooth" })
}

const applyFilter = (cf) => {
    if(cf!=undefined)closeFilter(cf);

    emit('filterItem', {
        category: category.value,
        min: min.value,
        max: max.value,
        rating: rating.value,
        tag: tag.value.join(),
        sortBy: sortBy.value
    })
    console.log(categoryArr)
    validation.navigationTo(top)
    
}



// function for select category
const arraySelector = (inputName = "", arr = [], cName) => {
    let eSelected = document.getElementsByClassName(cName)
    // console.log("thsi is "+inputName)
    // console.log("this is "+arr)
    console.log(cName)
    console.log(eSelected)
    if (arr.includes(inputName)) {
        const index = arr.indexOf(inputName);
        if (index > -1) { // only splice array when item is found
            arr.splice(index, 1); // 2nd parameter means remove one item only
        }
        //this for hinden select
        if (cName != undefined) {
            for (let i = 0; i < eSelected.length; i++) {
                eSelected[i].removeAttribute('style')
            }
        }
    } else {
        arr.push(inputName)
        //this for show selected
        if (cName != undefined) {
            for (let i = 0; i < eSelected.length; i++) {
                eSelected[i].setAttribute('style', "background-color:#26AC34;color:#FFF;")
            }
        }
        // if(cName!=undefined)eSelected.style.background-color='#26AC34'
    }
    console.log(arr)
}



const removeAllRatingSelecter=()=>{
    let pointList =document.getElementsByClassName('point_list')

    for(let i=0;i<pointList.length;i++){
        for(let p=0;p<pointList[i].getElementsByTagName('path').length;p++){
            pointList[i].getElementsByTagName('path')[p].setAttribute('style','stroke: #FFCE3D')
        }
    }
}

// for change color rating button
const ratingSelecter=(number,cName,full)=>{
    let eSelected=document.getElementsByClassName(`${cName}`)

    // remove all style first
    removeAllRatingSelecter()

    // change color and value
    if(number!=rating.value){
        // get position from selection of full start
        let pointFull =document.getElementsByClassName(full)

        // change stroke and fill color
        // first change windows and phone then loop change stroke and change only full star
        for(let i=0;i<eSelected.length;i++){
            for(let p=0;p<eSelected[i].getElementsByTagName('path').length;p++){
                eSelected[i].getElementsByTagName('path')[p].setAttribute('style','stroke: #26AC34;')
                for(let q=0;q<pointFull.length;q++){
                    pointFull[q].getElementsByTagName('path')[0].setAttribute('style','fill:#26AC34 ;')

                }
            }
        }

        rating.value=number
    }else{
        removeAllRatingSelecter()
        rating.value=undefined
    }
    console.log(rating.value)
}

const clearFilterItem = () => {
    //get element and change HTML tag attribute checked
    let check = document.getElementsByClassName("category_check")
    for (let i = 0; i < check.length; i++) {
        check[i].checked = false
    }

    for (let i = 0; i < tagArr.length; i++) {
        let eSelected = document.getElementsByClassName("tag_" + i)
        console.log(eSelected)
        for (let i = 0; i < eSelected.length; i++) {
            eSelected[i].removeAttribute("style")
        }
    }
    // remove all point
    removeAllRatingSelecter()

    category.value = []
    min.value = undefined
    max.value = undefined
    rating.value = undefined
    tag.value = []
    applyFilter()
}
onUpdated(() => {
    // console.log("rating : "+rating.value)
    // console.log("sort : "+sortBy.value)
})
</script>
<template>
    <div class="wrapper_filter">
        <div class="category">
            <h4>
                Category
            </h4>
            <!-- ยังทำไม่ได้ --> <!-- ผมแก้แล้ว -->
            <div class="category_list">
                <div v-for="(cate, index) of categoryArr" :key="index" class="category_item">
                    <input class="category_check" :id="cate.name"
                    @click="arraySelector(cate.value, category)"
                        type="checkbox" name="category_check">
                    <label :for="cate.name">{{ cate.name }}</label>
                    <!-- <label :for="cate.name">{{ cate.selected }}</label> -->
                </div>
            </div>
        </div>
        <div class="price">
            <h4>
                Filter by price
            </h4>
            <div class="price_filter">
                <input type="number" placeholder="฿Min" v-model="min">
                <h4>
                    -
                </h4>
                <input type="number" placeholder="฿Max" v-model="max">
                <!-- <button class="price_button">
                    &gt;
                </button> -->
            </div>
        </div>
        <div class="point">
            <h4>
                Point
            </h4>
            <div class="point_list">

                <div v-for="(value, index) in 5" class="point_item" :key="index">
                    <!-- <input type="radio" :id="`rating_${value}`" name="rating" :value="10 - (value + 4)" v-model="rating" /> -->
                    <div @click="ratingSelecter(10 - (value + 4),`rating_${value}`,`point_item_full_${index}`)"  :for="`rating_${value}`" :class="`rating_${value}`">

                        <div v-for="(vf, indexf) in 10 - (value + 4)" :key="indexf" :class="`point_item_full_${index}`">
                            <!-- {{ vf }} -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M9.04897 2.92708C9.34897 2.00608 10.652 2.00608 10.951 2.92708L12.021 6.21908C12.0863 6.41957 12.2134 6.59426 12.384 6.71818C12.5547 6.84211 12.7601 6.90892 12.971 6.90908H16.433C17.402 6.90908 17.804 8.14908 17.021 8.71908L14.221 10.7531C14.05 10.8771 13.9227 11.0521 13.8573 11.2529C13.7919 11.4538 13.7918 11.6702 13.857 11.8711L14.927 15.1631C15.227 16.0841 14.172 16.8511 13.387 16.2811L10.587 14.2471C10.4162 14.1231 10.2105 14.0563 9.99947 14.0563C9.78842 14.0563 9.58277 14.1231 9.41197 14.2471L6.61197 16.2811C5.82797 16.8511 4.77397 16.0841 5.07297 15.1631L6.14297 11.8711C6.20815 11.6702 6.20803 11.4538 6.14264 11.2529C6.07725 11.0521 5.94994 10.8771 5.77897 10.7531L2.97997 8.72008C2.19697 8.15008 2.59997 6.91008 3.56797 6.91008H7.02897C7.24002 6.91013 7.44568 6.84342 7.6165 6.71948C7.78732 6.59554 7.91455 6.42073 7.97997 6.22008L9.04997 2.92808L9.04897 2.92708Z"
                                    fill="#FFCE3D" />
                            </svg>
                        </div>
                        <div v-for="(ve, indexe) in value - 1" :key="indexe">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M10.4754 3.08147L10.4755 3.08163L11.5455 6.37363L11.5456 6.37408C11.6437 6.67481 11.8343 6.93685 12.0902 7.12273C12.3461 7.30862 12.6543 7.40884 12.9706 7.40908H12.971H16.433C16.9162 7.40908 17.1196 8.02875 16.7268 8.31481C16.7267 8.31482 16.7267 8.31483 16.7267 8.31484L13.9274 10.3484C13.9273 10.3484 13.9272 10.3485 13.9271 10.3485C13.6708 10.5346 13.4799 10.797 13.3819 11.0981C13.2838 11.3994 13.2836 11.724 13.3814 12.0254L13.3815 12.0256L14.4515 15.3176L14.4516 15.3179C14.6011 15.777 14.0749 16.1625 13.6808 15.8765C13.6808 15.8765 13.6808 15.8765 13.6808 15.8765L10.8808 13.8425L10.8807 13.8425C10.6245 13.6565 10.3161 13.5563 9.99947 13.5563C9.68289 13.5563 9.37441 13.6565 9.11822 13.8425L9.11811 13.8425L6.31811 15.8765L6.31795 15.8767C5.92675 16.1611 5.39886 15.779 5.54849 15.3176C5.5485 15.3176 5.54852 15.3175 5.54854 15.3175L6.61849 12.0256L6.61858 12.0254C6.71634 11.724 6.71616 11.3994 6.61808 11.0981C6.52002 10.797 6.32915 10.5346 6.07281 10.3485C6.07273 10.3485 6.07265 10.3484 6.07258 10.3484L3.27424 8.31584C3.27419 8.3158 3.27413 8.31576 3.27408 8.31572C2.88189 8.03 3.08518 7.41008 3.56797 7.41008H7.02884C7.02889 7.41008 7.02893 7.41008 7.02897 7.41008C7.3455 7.41013 7.65393 7.31006 7.91013 7.12418C8.16636 6.93827 8.35721 6.67605 8.45534 6.37508L8.45549 6.37463L9.52549 3.08263L9.5371 3.04692C9.70824 2.62075 10.3301 2.63398 10.4754 3.08147Z"
                                    stroke="#FFCE3D" />
                            </svg>
                        </div>
                    </div>
                    <h5 v-if="index != 0">
                        Over
                    </h5>
                </div>
            </div>
        </div>
        <div class="pop_tag">
            <h4>
                Popular Tags
            </h4>
            <div class="wrapper_tag">
                <ul class="tag_list">
                    <li v-for="(t, index) in tagArr" :key="index">
                        <!-- <button @click="filterItem.tag = tag.value">{{ tag.name }}</button> -->
                        <button @click="arraySelector(t.value, tag, `tag_${index}`)" :class="`tag_${index}`">
                            {{ t.name }}
                        </button>
                    </li>
                </ul>
            </div>

        </div>
        <!-- apply -->
        <div class="wrapper_apply_clear">
            <button @click="clearFilterItem">
                Clear
            </button>
            <button @click="applyFilter">
                Apply
            </button>
        </div>
    </div>


    <!-- for phone -->
    <div v-show="props.isShowFilter" class="overlay_filter">
        <div class="wrapper_filter_2">
            <div class="close_filter">
                <h4>
                    Filter
                </h4>
                <div @click="closeFilter(false)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6L18 18M6 18L18 6L6 18Z" stroke="#212121" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div class="sort">
                <h4>
                    Sort By
                </h4>
                <div class="sort_list">
                    <div v-for="(sort, index) of props.sortTypeArr" :key="index" class="sort_item">
                        <input type="radio" :id="`sort_${index}`" :value="sort.value" v-model="sortBy">
                        <label :for="`sort_${index}`">{{ sort.name }}</label>
                    </div>
                </div>
            </div>
            <div class="category">
                <h4>
                    Category
                </h4>
                <!-- ยังทำไม่ได้ --> <!-- ผมแก้แล้ว -->
                <div class="category_list">
                    <div v-for="(cate, index) of categoryArr" :key="index" class="category_item">
                        <input class="category_check" :id="cate.name + '_phone'" @click="arraySelector(cate.value, category)"
                            type="checkbox" name="category_check">
                        <label :for="cate.name + '_phone'">{{ cate.name }}</label>
                        <!-- <label :for="cate.name">{{ cate.selected }}</label> -->
                    </div>
                </div>
            </div>
            <div class="price">
                <h4>
                    Filter by price
                </h4>
                <div class="price_filter">
                    <input type="number" placeholder="฿Min" v-model="min">
                    <h4>
                        -
                    </h4>
                    <input type="number" placeholder="฿Max" v-model="max">
                    <!-- <button class="price_button">
                        &gt;
                    </button> -->
                </div>
            </div>
            <div class="point">
                <h4>
                    Point
                </h4>
                <div class="point_list">
                    <div v-for="(value, index) in 5" class="point_item" :key="index">
                        <!-- <input type="radio" :id="`rating_${value}`" name="rating" :value="10 - (value + 4)"
                            v-model="rating" /> -->
                        <div @click="ratingSelecter(10 - (value + 4),`rating_${value}`,`point_item_full_${index}`)" :for="`rating_${value}`" :class="`rating_${value}`">
                            <div v-for="(vf, indexf) in 10 - (value + 4)" :key="indexf" :class="`point_item_full_${index}`">
                                <!-- {{ vf }} -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                        d="M9.04897 2.92708C9.34897 2.00608 10.652 2.00608 10.951 2.92708L12.021 6.21908C12.0863 6.41957 12.2134 6.59426 12.384 6.71818C12.5547 6.84211 12.7601 6.90892 12.971 6.90908H16.433C17.402 6.90908 17.804 8.14908 17.021 8.71908L14.221 10.7531C14.05 10.8771 13.9227 11.0521 13.8573 11.2529C13.7919 11.4538 13.7918 11.6702 13.857 11.8711L14.927 15.1631C15.227 16.0841 14.172 16.8511 13.387 16.2811L10.587 14.2471C10.4162 14.1231 10.2105 14.0563 9.99947 14.0563C9.78842 14.0563 9.58277 14.1231 9.41197 14.2471L6.61197 16.2811C5.82797 16.8511 4.77397 16.0841 5.07297 15.1631L6.14297 11.8711C6.20815 11.6702 6.20803 11.4538 6.14264 11.2529C6.07725 11.0521 5.94994 10.8771 5.77897 10.7531L2.97997 8.72008C2.19697 8.15008 2.59997 6.91008 3.56797 6.91008H7.02897C7.24002 6.91013 7.44568 6.84342 7.6165 6.71948C7.78732 6.59554 7.91455 6.42073 7.97997 6.22008L9.04997 2.92808L9.04897 2.92708Z"
                                        fill="#FFCE3D" />
                                </svg>
                            </div>
                            <div v-for="(ve, indexe) in value - 1" :key="indexe">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <path
                                        d="M10.4754 3.08147L10.4755 3.08163L11.5455 6.37363L11.5456 6.37408C11.6437 6.67481 11.8343 6.93685 12.0902 7.12273C12.3461 7.30862 12.6543 7.40884 12.9706 7.40908H12.971H16.433C16.9162 7.40908 17.1196 8.02875 16.7268 8.31481C16.7267 8.31482 16.7267 8.31483 16.7267 8.31484L13.9274 10.3484C13.9273 10.3484 13.9272 10.3485 13.9271 10.3485C13.6708 10.5346 13.4799 10.797 13.3819 11.0981C13.2838 11.3994 13.2836 11.724 13.3814 12.0254L13.3815 12.0256L14.4515 15.3176L14.4516 15.3179C14.6011 15.777 14.0749 16.1625 13.6808 15.8765C13.6808 15.8765 13.6808 15.8765 13.6808 15.8765L10.8808 13.8425L10.8807 13.8425C10.6245 13.6565 10.3161 13.5563 9.99947 13.5563C9.68289 13.5563 9.37441 13.6565 9.11822 13.8425L9.11811 13.8425L6.31811 15.8765L6.31795 15.8767C5.92675 16.1611 5.39886 15.779 5.54849 15.3176C5.5485 15.3176 5.54852 15.3175 5.54854 15.3175L6.61849 12.0256L6.61858 12.0254C6.71634 11.724 6.71616 11.3994 6.61808 11.0981C6.52002 10.797 6.32915 10.5346 6.07281 10.3485C6.07273 10.3485 6.07265 10.3484 6.07258 10.3484L3.27424 8.31584C3.27419 8.3158 3.27413 8.31576 3.27408 8.31572C2.88189 8.03 3.08518 7.41008 3.56797 7.41008H7.02884C7.02889 7.41008 7.02893 7.41008 7.02897 7.41008C7.3455 7.41013 7.65393 7.31006 7.91013 7.12418C8.16636 6.93827 8.35721 6.67605 8.45534 6.37508L8.45549 6.37463L9.52549 3.08263L9.5371 3.04692C9.70824 2.62075 10.3301 2.63398 10.4754 3.08147Z"
                                        stroke="#FFCE3D" />
                                </svg>
                            </div>
                        </div>
                        <h5 v-if="index != 0">
                            Over
                        </h5>
                    </div>
                </div>
            </div>
            <div class="pop_tag">
                <h4>
                    Popular Tags
                </h4>
                <div class="wrapper_tag">
                    <ul class="tag_list">
                        <li v-for="(t, index) in tagArr" :key="index">
                            <!-- <button @click="filterItem.tag = tag.value">{{ tag.name }}</button> -->
                            <button @click="arraySelector(t.value, tag, `tag_${index}`)" :class="`tag_${index}`">
                                {{ t.name }}
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
            <!-- apply -->
            <div class="wrapper_apply_clear">
                <button @click="clearFilterItem">
                    Clear
                </button>
                <button @click="applyFilter(false)">
                    Apply
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
}

.wrapper_filter {
    display: flex;
    flex-direction: column;
    width: min(17.778dvw, 256px);
    height: fit-content;
    padding: min(1.389dvw, 20px) 0px;
    gap: min(1.389dvw, 20px);
    background-color: #F5F5F5;
}

.category {
    display: flex;
    flex-direction: column;
    width: inherit;
    /* height: 248px; */
    height: fit-content;
    gap: min(0.833dvw, 12px);
    padding-bottom: min(1.389dvw, 20px);
    border-bottom: min(0.069dvw, 1px) solid;
    border-color: #E0E0E0;
}

.category h4 {
    width: inherit;
    height: min(2.5dvw, 36px);
    font-size: min(1.667dvw, 24px);
    font-weight: 700;
    line-height: 152%;
}

.category_list {
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
    gap: min(0.833dvw, 12px);
}

.category_item {
    display: flex;
    height: min(1.389dvw, 20px);
    width: fit-content;
    gap: min(0.556dvw, 8px);
    
}

.category_item input {
    /* display: flex; */
    width: min(1.111dvw, 16px);
    height: min(1.111dvw, 16px);
    margin: auto;
    accent-color: #168A22;
    cursor: pointer;
}

.category_list div label {
    font-size: min(0.972dvw, 14px);
    font-weight: 400;
    line-height: 144%;
    /* 20.16px */
    letter-spacing: min(0.014dvw, 0.2px);
    cursor: pointer;
}

.price {
    display: flex;
    width: inherit;
    height: min(7.222dvw, 104px);
    flex-direction: column;
    padding-bottom: min(1.389dvw, 20px);
    gap: min(0.833dvw, 12px);
    border-bottom: min(0.069dvw, 1px) solid;
    border-color: #E0E0E0;
}

.price h4 {
    width: inherit;
    height: min(2.5dvw, 36px);
    font-size: min(1.667dvw, 24px);
}

.price_filter {
    display: flex;
    width: inherit;
    height: min(2.5dvw, 36px);
    justify-content: center;
    align-items: center;
    gap: min(0.556dvw, 8px);
}

.price_filter h4 {
    display: flex;
    height: min(1.667dvw, 24px);
    width: min(0.556dvw, 8px);
    font-size: min(1.111dvw, 16px);
    align-items: center;
    /* margin: 0px 3px; */
}

.price_filter input {
    /* width: min(6.528dvw, 94px); */
    width: 100%;
    height: min(2.5dvw, 36px);
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    border-radius: min(0.278dvw, 4px);
    font-size: min(0.972dvw, 14px);
    /* border: none; */
    border: min(0.069dvw, 1px) solid #E0E0E0;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.price_filter input:hover {
    border: min(0.069dvw, 1px) solid #26AC34;
}
.price_filter input:active {
    border: min(0.069dvw, 1px) solid #26AC34;
}

/* .price_button {
    width: min(1.944dvw,28px);
    height: min(1.944dvw,28px);
    margin: auto 0px auto min(0.556dvw,8px);
    background-color: #26AC34;
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
} */

.point {
    display: flex;
    flex-direction: column;
    width: inherit;
    height: min(12.778dvw, 184px);
    gap: min(0.833dvw, 12px);
    padding-bottom: min(1.389dvw, 20px);
    border-bottom: min(0.069dvw, 1px) solid;
    border-color: #E0E0E0;
}

.point h4 {
    height: min(2.5dvw, 36px);
    font-size: min(1.667dvw, 24px);
}

.point_list {
    display: flex;
    flex-direction: column;
    width: inherit;
    height: min(8.056dvw, 116px);
    gap: min(0.278dvw, 4px);
    padding-inline: min(0.833dvw, 12px);
}

.point_item {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: min(1.389dvw, 20px);
    border: none;
    gap: min(0.278dvw, 4px);
    cursor: pointer;
}

.point_item input {
    display: none;
}

.point_item div {
    display: flex;
    gap: min(0.278dvw, 4px);
    cursor: pointer;
    justify-content: center;
    align-items: center;
    height: min(1.389dvw, 20px);
}

.point_item div div {
    height: fit-content;
    width: fit-content;
}

.point_item div div svg {
    width: min(1.389dvw, 20px);
    height: min(1.389dvw, 20px);
}
.point_item:hover div div svg path {
    fill: #26AC34;
    stroke: #26AC34;
}

.point_item h5 {
    width: fit-content;
    height: fit-content;
    margin: auto 0px;
    font-size: min(0.833dvw, 12px);
    font-weight: 400;
    line-height: 136%;
    /* 16.32px */
    letter-spacing: min(0.014dvw, 0.2px);
}

.pop_tag {
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
    gap: min(0.833dvw, 12px);
    padding-bottom: min(1.389dvw, 20px);
    border-bottom: min(0.069dvw, 1px) solid;
    border-color: #E0E0E0;
}

.pop_tag h4 {
    width: inherit;
    height: min(2.5dvw, 36px);
    font-size: min(1.667dvw, 24px);
}

.wrapper_tag {
    width: inherit;
    height: fit-content;
}

.tag_list {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: min(0.556dvw, 8px);
    align-self: stretch;
    flex-wrap: wrap;
    width: inherit;
    height: inherit;
    list-style: none;
}

.tag_list li {
    display: flex;
    width: fit-content;
    height: fit-content;
    /* display: inline-flex;
    margin: min(0.278dvw,4px); */
}

.tag_list li button {
    height: min(1.667dvw, 24px);
    width: fit-content;
    padding: min(0.278dvw, 4px) min(0.556dvw, 8px);
    border: none;
    font-size: min(0.833dvw, 12px);
    border-radius: min(0.556dvw, 8px);
    background-color: #E0E0E0;
    color: #757575;
    cursor: pointer;
}
.tag_list li button:hover {
    background-color: #26AC34;
    color: #fff;
}


.wrapper_apply_clear {
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
    gap: min(0.556dvw, 8px);
    /* margin: 8px 0px; */
}

.wrapper_apply_clear button:nth-child(1) {
    background: #fff;
    color: #212121;
    border: min(0.069dvw, 1px) solid;
    border-color: #E0E0E0;
    border-radius: min(0.278dvw, 4px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.wrapper_apply_clear button:nth-child(1):hover {
    border-color: #26AC34;
    background-color: #fff;
    color: #26AC34;
}
.wrapper_apply_clear button:nth-child(1):active {
    background-color: #58d264;
    border-color: #58d264;
    color: #FFF;
}
.wrapper_apply_clear button {
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
.wrapper_apply_clear button:hover {
    /* color: #26AC34; */
    background: #168A22;
    border-color: #168A22;
}
.wrapper_apply_clear button:active {
    /* color: #26AC34; */
    background: #58d264;
    border-color: #58d264;
}
.wrapper_filter_2 {
    display: none;
}

@media (width<=744px) {
    .wrapper_filter {
        width: min(20.43dvw, 152px);
        padding: min(1.613dvw, 12px) 0px;
        gap: min(1.075dvw, 8px);
    }

    .category {
        gap: min(1.075dvw, 8px);
        padding-bottom: min(1.613dvw, 12px);
    }

    .category h4 {
        height: min(3.763dvw, 28px);
        font-size: min(2.419dvw, 18px);
    }

    .category_list {
        gap: min(1.075dvw, 8px);
    }

    .category_item {
        height: min(2.151dvw, 16px);
        gap: min(1.075dvw, 8px);
    }

    .category_item input {
        width: min(1.613dvw, 12px);
        height: min(1.613dvw, 12px);
    }

    .category_list div label {
        font-size: min(1.613dvw, 12px);
    }

    .price {
        height: fit-content;
        /* height: 104px; */
        padding-bottom: min(1.613dvw, 12px);
        gap: min(1.075dvw, 8px);
    }

    .price h4 {
        height: min(3.763dvw, 28px);
        font-size: min(2.419dvw, 18px);
    }

    .price_filter {
        height: min(3.226dvw, 24px);
        gap: min(0.538dvw, 4px);
    }

    .price_filter h4 {
        width: min(1.075dvw, 8px);
        height: min(3.226dvw, 24px);
        font-size: min(2.151dvw, 16px);
    }

    .price_filter input {
        width: min(9.14dvw, 68px);
        height: min(3.226dvw, 24px);
        padding: min(0.538dvw, 4px) min(1.075dvw, 8px);
        font-size: min(1.613dvw, 12px);
        border: min(0.134dvw, 1px) solid #E0E0E0;
        border-radius: min(0.538dvw, 4px);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    }
    /* .price_button{
        width: ;
    } */
    .point {
        height: min(19.355dvw, 144px);
        gap: min(1.075dvw, 8px);
        padding-bottom: min(1.613dvw, 12px);
    }

    .point h4 {
        height: min(3.763dvw, 28px);
        font-size: min(2.419dvw, 18px);
    }

    .point_list {
        height: min(12.903dvw, 96px);
        gap: min(0.538dvw, 4px);
        padding-inline: min(0.538dvw, 4px);
    }

    .point_item {
        height: min(2.151dvw, 16px);
        gap: min(0.538dvw, 4px);
    }

    .point_item div {
        gap: min(0.538dvw, 4px);
        height: min(2.151dvw, 16px);
    }
    .point_item div div {
        height: fit-content;
        width: fit-content;
    }
    .point_item div div svg {
        width: min(2.151dvw, 16px);
        height: min(2.151dvw, 16px);
    }

    .point_item h5 {
        font-size: min(1.344dvw, 10px);
    }

    .pop_tag {
        gap: min(1.075dvw, 8px);
        padding-bottom: min(1.613dvw, 12px);
    }

    .pop_tag h4 {
        height: min(3.763dvw, 28px);
        font-size: min(2.419dvw, 18px);
    }

    .tag_list {
        gap: min(1.075dvw, 8px);
    }

    .tag_list li {
        height: fit-content;
    }

    .tag_list li button {
        height: min(2.688dvw, 20px);
        padding: min(0.538dvw, 4px) min(1.075dvw, 8px);
        font-size: min(1.344dvw, 10px);
        border-radius: min(1.075dvw, 8px);
    }

    .wrapper_apply_clear {
        gap: min(1.075dvw, 8px);
    }
    .wrapper_apply_clear button:nth-child(1) {
        color: #212121;
        border: min(0.134dvw, 1px) solid;
        border-color: #E0E0E0;
        border-radius: min(0.538dvw, 4px);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    }

    .wrapper_apply_clear button {
        width: min(20.43dvw, 152px);
        height: min(4.839dvw, 36px);
        font-size: min(1.882dvw, 14px);
        border-radius: min(0.538dvw, 4px);
    }
}

@media (width<=432px) {
    .overlay_filter {
        width: 100dvw;
        height: 100dvh;
        padding: min(4.63dvw,20px);
        overflow: auto;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 999;
        background-color: white;
    }

    .wrapper_filter {
        display: none;
    }

    .wrapper_filter_2 {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        gap: min(2.778dvw,12px);
    }

    .close_filter {
        display: flex;
        width: 100%;
        height: min(5.556dvw,24px);
        justify-content: space-between;
    }

    .close_filter h4 {
        font-size: min(3.704dvw,16px);
        font-weight: 700;
        line-height: 150%;
        /* 24px */
        letter-spacing: min(0.046dvw, 0.2px);
    }

    .close_filter div {
        display: flex;
        width: min(5.556dvw,24px);
        height: min(5.556dvw,24px);
    }

    .close_filter div svg {
        width: inherit;
        height: inherit;
    }

    .sort {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        gap: min(2.778dvw,12px);
        padding-bottom: min(3.704dvw,16px);
        border-bottom: min(0.231dvw,1px) solid;
        border-color: #E0E0E0;
    }

    .sort h4 {
        width: inherit;
        height: min(3.241dvw,14px);
        font-size: min(3.241dvw,14px);
        font-weight: 700;
        line-height: 144%;
        /* 20.16px */
        letter-spacing: min(0.046dvw, 0.2px);
    }

    .sort_list {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: inherit;
        gap: min(1.852dvw,8px);
    }

    .sort_item {
        display: flex;
        width: fit-content;
        height: min(3.704dvw,16px);
        gap: min(1.852dvw,8px);
    }

    .sort_item input {
        width: min(2.778dvw,12px);
        height: min(2.778dvw,12px);
        margin: auto;
        accent-color: #168A22;
    }

    .sort_item label {
        font-size: min(2.778dvw,12px);
    }

    .category {
        width: 100%;
        height: fit-content;
        gap: min(2.778dvw,12px);
        padding-bottom: min(3.704dvw,16px);
    }

    .category h4 {
        width: inherit;
        height: min(4.63dvw,20px);
        font-size: min(3.241dvw,14px);
    }

    .category_list {
        width: inherit;
        height: fit-content;
        gap: min(1.852dvw,8px);
    }

    .category_item {
        width: fit-content;
        height: min(3.704dvw,16px);
        gap: min(1.852dvw,8px);
    }

    .category_item input {
        width: min(2.778dvw,12px);
        height: min(2.778dvw,12px);
    }

    .category_list div label {
        font-size: min(2.778dvw,12px);
    }

    .price {
        width: 100%;
        height: fit-content;
        padding-bottom: min(3.704dvw,16px);
        gap: min(2.778dvw,12px);
    }

    .price h4 {
        height: min(4.63dvw,20px);
        font-size: min(3.241dvw,14px);
    }

    .price_filter {
        height: min(5.556dvw,24px);
        gap: min(0.926dvw,4px);
    }

    .price_filter input {
        /* width: min(43.617dvw, 164px); */
        width: 100%;
        height: min(5.556dvw,24px);
        padding: min(0.926dvw,4px) min(1.852dvw, 8px);
        font-size: min(2.778dvw,12px);
    }

    .price_filter h4 {
        width: min(1.852dvw, 8px);
        height: min(5.556dvw,24px);
        font-size: min(3.704dvw,16px);
    }

    .point {
        display: flex;
        width: 100%;
        height: fit-content;
        gap: min(1.852dvw, 8px);
        padding-bottom: min(3.704dvw,16px);
    }

    .point h4 {
        height: min(4.63dvw,20px);
        font-size: min(3.241dvw,14px);
    }

    .point_list {
        /* height: min(25.532dvw, 96px); */
        height: fit-content;
        padding-inline: min(0.926dvw,4px);
        gap: min(0.926dvw,4px);
    }

    .point_item {
        height: min(3.704dvw,16px);
        gap: min(0.926dvw,4px);
    }

    .point_item label {
        gap: min(0.926dvw,4px);
    }

    .point_item div div svg {
        height: min(3.704dvw,16px);
        width: min(3.704dvw,16px);
    }

    .point_item h5 {
        font-size: min(2.315dvw,10px);
    }

    .pop_tag {
        width: 100%;
        /* height: min(25.532dvw, 96px); */
        height: fit-content;
        gap: min(2.778dvw,12px);
        padding-bottom: min(3.704dvw,16px);
    }

    .pop_tag h4 {
        height: min(4.63dvw,20px);
        font-size: min(3.241dvw,14px);
    }

    .tag_list {
        gap: min(1.852dvw,8px);
    }

    .tag_list li button {
        height: min(4.63dvw,20px);
        padding: min(0.926dvw,4px) min(1.852dvw,8px);
        font-size: min(2.315dvw,10px);
        border-radius: min(1.852dvw,8px);
    }

    .wrapper_apply_clear {
        width: 100%;
        flex-direction: row;
        gap: min(1.852dvw,8px);
        border-radius: min(0.926dvw,4px);
    }

    .wrapper_apply_clear button {
        width: min(44.444dvw,192px);
        height: min(8.333dvw, 36px);
        padding: min(1.852dvw,8px) min(2.778dvw,12px);
        font-size: min(3.241dvw,14px);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        border-radius: min(0.926dvw,4px);
    }
}

/* @media (width<=376px) {
    .overlay_filter {
        width: 100dvw;
        height: 100dvh;
        padding: min(4.255dvw, 16px);
        overflow: auto;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 999;
        background-color: white;
    }

    .wrapper_filter {
        display: none;
    }

    .wrapper_filter_2 {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        gap: min(3.191dvw, 12px);
    }

    .close_filter {
        display: flex;
        width: 100%;
        height: min(6.383dvw, 24px);
        justify-content: space-between;
    }

    .close_filter h4 {
        font-size: min(4.255dvw, 16px);
        font-weight: 700;
        line-height: 150%;
        letter-spacing: min(0.053dvw, 0.2px);
    }

    .close_filter div {
        display: flex;
        width: min(6.383dvw, 24px);
        height: min(6.383dvw, 24px);
    }

    .close_filter div svg {
        width: inherit;
        height: inherit;
    }

    .sort {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: fit-content;
        gap: min(3.191dvw, 12px);
        padding-bottom: min(4.255dvw, 16px);
        border-bottom: min(0.069dvw, 1px) solid;
        border-color: #E0E0E0;
    }

    .sort h4 {
        width: inherit;
        height: min(3.723dvw, 14px);
        font-size: min(3.723dvw, 14px);
        font-weight: 700;
        line-height: 144%;
        letter-spacing: min(0.053dvw, 0.2px);
    }

    .sort_list {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: inherit;
        gap: min(2.128dvw, 8px);
    }

    .sort_item {
        display: flex;
        width: fit-content;
        height: min(4.255dvw, 16px);
        gap: min(2.128dvw, 8px);
    }

    .sort_item input {
        width: min(3.191dvw, 12px);
        height: min(3.191dvw, 12px);
        margin: auto;
        accent-color: #168A22;
    }

    .sort_item label {
        font-size: min(3.191dvw, 12px);
    }

    .category {
        width: 100%;
        height: fit-content;
        gap: min(3.191dvw, 12px);
        padding-bottom: min(4.255dvw, 16px);
    }

    .category h4 {
        width: inherit;
        height: min(5.319dvw, 20px);
        font-size: min(3.723dvw, 14px);
    }

    .category_list {
        width: inherit;
        height: fit-content;
        gap: min(2.128dvw, 8px);
    }

    .category_item {
        width: fit-content;
        height: min(4.255dvw, 16px);
        gap: min(2.128dvw, 8px);
    }

    .category_item input {
        width: min(3.191dvw, 12px);
        height: min(3.191dvw, 12px);
    }

    .category_list div label {
        font-size: min(3.191dvw, 12px);
    }

    .price {
        width: 100%;
        height: fit-content;
        padding-bottom: min(4.255dvw, 16px);
        gap: min(3.191dvw, 12px);
    }

    .price h4 {
        height: min(5.319dvw, 20px);
        font-size: min(3.723dvw, 14px);
    }

    .price_filter {
        height:  min(6.383dvw, 24px);
        gap: min(1.064dvw, 4px);
    }

    .price_filter input {
        width: 100%;
        height: min(6.383dvw, 24px);
        padding: min(1.064dvw, 4px) min(2.128dvw, 8px);
        font-size: min(3.191dvw, 12px);
    }

    .price_filter h4 {
        width: min(2.128dvw, 8px);
        height: min(6.383dvw, 24px);
        font-size: min(4.255dvw, 16px);
    }

    .point {
        display: flex;
        width: 100%;
        height: fit-content;
        gap: min(2.128dvw, 8px);
        padding-bottom: min(4.255dvw, 16px);
    }

    .point h4 {
        height: min(5.319dvw, 20px);
        font-size: min(3.723dvw, 14px);
    }

    .point_list {
        height: fit-content;
        padding-inline: min(1.064dvw, 4px);
        gap: min(1.064dvw, 4px);
    }

    .point_item {
        height: min(4.255dvw, 16px);
        gap: min(1.064dvw, 4px);
    }

    .point_item label {
        gap: min(1.064dvw, 4px);
    }

    .point_item div div svg {
        height: min(4.255dvw, 16px);
        width: min(4.255dvw, 16px);
    }

    .point_item h5 {
        font-size: min(2.66dvw, 10px);
    }

    .pop_tag {
        width: 100%;
        height: fit-content;
        gap: min(3.191dvw, 12px);
        padding-bottom: min(4.255dvw, 16px);
    }

    .pop_tag h4 {
        height: min(5.319dvw, 20px);
        font-size: min(3.723dvw, 14px);
    }

    .tag_list {
        gap: min(2.128dvw, 8px);
    }

    .tag_list li button {
        height: min(5.319dvw, 20px);
        padding: min(1.064dvw, 4px) min(2.128dvw, 8px);
        font-size: min(2.66dvw, 10px);
        border-radius: min(2.128dvw, 8px);
    }

    .wrapper_apply_clear {
        width: 100%;
        flex-direction: row;
        gap: min(2.128dvw, 8px);
        border-radius: min(1.064dvw, 4px);
    }

    .wrapper_apply_clear button {
        width: min(44.681dvw, 168px);
        height: min(9.574dvw, 36px);
        padding: min(2.128dvw, 8px) min(3.191dvw, 12px);
        font-size: min(3.723dvw, 14px);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        border-radius: min(1.064dvw, 4px);
    }


} */
</style>