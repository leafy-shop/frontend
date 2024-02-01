<script setup>
import { computed, ref } from 'vue'

let origin = `${import.meta.env.VITE_BASE_URL}`;

let emit = defineEmits(["sortFilterReview"])

let props = defineProps({
    productReview: {
        type: Array,
        required: true
    },
    totalRating: {
        type: Number,
        required: true
    },
    sortFilter: {
        type: Object,
        required: true
    },
    allStyle: {
        type: Array,
        default: []
    }
})

let sortFilterValue = computed(() => {
    return {sort: props.sortFilter.sort, name: props.sortFilter.name}
})

// let sort = ref("")
// let filter = ref("")
let sortFilterReview = (sortFilter) => {
    console.log(sortFilter)
    emit('sortFilterReview',sortFilter.sort, sortFilter.name)
}

</script>
<template>
    <div class="wrapper_Review ">
        <!-- for show title and sort -->
        <div>
            <!-- title and show rating -->
            <div>
                <h5>
                    Product Ratings
                </h5>
                <div>
                    <!-- rating -->
                    <div>
                        {{ Math.floor(totalRating) === 5 ? "⭐⭐⭐⭐⭐" :
                            Math.floor(totalRating) === 4 ? "⭐⭐⭐⭐" :
                                Math.floor(totalRating) === 3 ? "⭐⭐⭐" :
                                    Math.floor(totalRating) === 2 ? "⭐⭐" :
                                        Math.floor(totalRating) === 1 ? "⭐" : "" }}
                    </div>
                    <h5>
                        {{totalRating}}/5
                    </h5>
                </div>
            </div>
            <!-- sort review -->
            <div>
                <button>
                    <h6>
                        Sort:
                    </h6>
                    <select name="Sort" v-model="sortFilterValue.sort" @click="sortFilterReview(sortFilterValue)">
                        <option value="oldest" selected>Oldest</option>
                        <option value="newest" selected>Newest</option>
                    </select>
                </button>
                <button v-if="allStyle.length !== 0" @click="sortFilterReview(sortFilterValue)">
                    <h6>
                        Filter by:
                    </h6>
                    <select name="Filter" v-model="sortFilterValue.name">
                        <option :value="`${style}`" v-for="style in allStyle" selected>{{ style }}</option>
                    </select>
                </button>
            </div>
        </div>

        <!-- Review list -->
        <div class="Review_list" v-for="review in productReview">

            <!-- review item -->
            <div class="Review_item">
                <!-- info -->
                <div>
                    <div>
                        <img v-if="review.image" :src="`${origin}/api/image/users/${review.userId}/${review.image}`" alt="use_img">
                        <img v-else src="../../assets/vue.svg" alt="use_img">
                    </div>
                    <div>
                        <h6>
                            {{ review.username }}
                        </h6>
                        <div>
                            {{ Math.floor(review.rating) === 5 ? "⭐⭐⭐⭐⭐" :
                            Math.floor(review.rating) === 4 ? "⭐⭐⭐⭐" :
                                Math.floor(review.rating) === 3 ? "⭐⭐⭐" :
                                    Math.floor(review.rating) === 2 ? "⭐⭐" :
                                        Math.floor(review.rating) === 1 ? "⭐" : "" }}
                        </div>
                    </div>
                </div>
                <!-- review text -->
                <div>
                    <p>
                        <!-- ได้รับสินค้าเรียบร้อย ตรงตามออเดอร์ แพ็คสินค้ามาดี ระยะเวลาในการจัดส่งไม่นาน คุณภาพดี ดูสวยงาม -->
                        {{ review.comment }}
                    </p>
                </div>
                <!-- img list ? -->
                <!-- <div>
                    <div>
                        <img src="../../assets/vue.svg" alt="product_img">
                    </div>
                </div> -->
                <!-- info about product  -->
                <div>
                    <h6>
                        <span v-if="review.size !== undefined">Size: {{ review.size }}</span>
                        Color: {{ review.style }}
                        <!-- Size: M, Color: Style 1 -->
                    </h6>
                </div>
                <!-- like for user -->
                <div>
                    <button>
                        <!-- <img src="../../assets/vue.svg" alt="like_icon"> -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M1.60001 8.39998C1.60001 8.24239 1.63105 8.08635 1.69135 7.94075C1.75166 7.79516 1.84005 7.66288 1.95148 7.55145C2.06291 7.44002 2.1952 7.35163 2.34079 7.29132C2.48638 7.23101 2.64242 7.19998 2.80001 7.19998C2.95759 7.19998 3.11364 7.23101 3.25923 7.29132C3.40482 7.35163 3.5371 7.44002 3.64853 7.55145C3.75996 7.66288 3.84836 7.79516 3.90866 7.94075C3.96897 8.08635 4.00001 8.24239 4.00001 8.39998V13.2C4.00001 13.5182 3.87358 13.8235 3.64853 14.0485C3.42349 14.2735 3.11827 14.4 2.80001 14.4C2.48175 14.4 2.17652 14.2735 1.95148 14.0485C1.72643 13.8235 1.60001 13.5182 1.60001 13.2V8.39998ZM4.80001 8.26638V12.6104C4.79987 12.9077 4.88258 13.1992 5.03887 13.4521C5.19516 13.7051 5.41883 13.9095 5.68481 14.0424L5.72481 14.0624C6.16872 14.2842 6.65814 14.3998 7.15441 14.4H11.4872C11.8572 14.4001 12.2159 14.272 12.5021 14.0375C12.7882 13.8029 12.9843 13.4764 13.0568 13.1136L14.0168 8.31358C14.0632 8.08147 14.0575 7.84197 14.0002 7.61233C13.9428 7.38269 13.8352 7.16863 13.6852 6.98558C13.5351 6.80254 13.3463 6.65507 13.1324 6.5538C12.9184 6.45254 12.6847 6.4 12.448 6.39998H9.60001V3.19998C9.60001 2.77563 9.43144 2.36866 9.13138 2.0686C8.83132 1.76855 8.42435 1.59998 8.00001 1.59998C7.78783 1.59998 7.58435 1.68426 7.43432 1.83429C7.28429 1.98432 7.20001 2.1878 7.20001 2.39998V2.93358C7.20001 3.62596 6.97544 4.29967 6.56001 4.85358L5.44001 6.34638C5.02458 6.90028 4.80001 7.57399 4.80001 8.26638Z"
                                fill="#BDBDBD" />
                        </svg>
                    </button>
                    <h6>
                        0
                    </h6>
                </div>
            </div>
        </div>

        <!-- move page -->
        <div>
            &lt; 1 2 3 4 &gt;
        </div>
    </div>
</template>
<style scoped>
* {
    box-sizing: border-box;
}

.wrapper_Review {
    display: flex;
    width: inherit;
    height: fit-content;
    flex-direction: column;
}</style>