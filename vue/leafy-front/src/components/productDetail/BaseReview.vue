<script setup>
import { computed, ref, onUpdated, onBeforeMount } from 'vue'
import validation from '../../JS/validation'
import BaseStar from './BaseStar.vue';
import cookie from '../../JS/cookie';
import { useRouter } from 'vue-router';

let origin = `${import.meta.env.VITE_BASE_URL}`
let keyPass = ref({})
let myRouter = useRouter()

let emit = defineEmits(["sortFilterReview", "likeReview"])

let props = defineProps({
    productReview: {
        type: Array,
        required: true
    },
    totalRating: {
        type: Number,
        required: true,
        default: 0

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

const goSignin = () => myRouter.push({ name: 'SignIn' })

const totalRating = computed(() => {
    // console.log(props.productReview)
    return props.totalRating
})

let sortFilterValue = computed(() => {
    return { sort: props.sortFilter.sort, name: props.sortFilter.name }
})

// let sort = ref("")
// let filter = ref("")
let sortFilterReview = (sortFilter) => {
    // console.log(sortFilter)
    emit('sortFilterReview', sortFilter.sort, sortFilter.name)
}

let likeReview = (review) => {
    // console.log(review)
    if (keyPass.value) {
        emit("likeReview", review.itemReviewId)
    } else {
        goSignin()
    }
}

onBeforeMount(async () => {
    keyPass.value = cookie.decrypt()
    console.log('keyPass is : ' + keyPass.value)
})

onUpdated(() => {
    // console.log("Testing",props.totalRating)
    validation.ratingStar(totalRating.value)
})
</script>
<template>
    <div class="wrapper_Review ">
        <!-- for show title and sort -->
        <div class="container_header">
            <!-- title and show rating -->
            <div class="container_rating">
                <h5>
                    Product Ratings
                </h5>
                <div class="rating_score">
                    <!-- rating -->
                    <div class="wrapper_rating_list">
                        <BaseStar :rating="totalRating" :size="100" name="allReview" />
                    </div>
                    <h5>
                        <span>
                            {{ totalRating }}
                        </span>
                        /5
                    </h5>
                </div>
            </div>
            <!-- sort review -->
            <div class="wrapper_sort_filter">
                <button class="filter">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.00004 12C5.00004 12.2652 5.1054 12.5196 5.29293 12.7071C5.48047 12.8947 5.73482 13 6.00004 13C6.26526 13 6.51961 12.8947 6.70715 12.7071C6.89468 12.5196 7.00004 12.2652 7.00004 12V6.41403L8.29304 7.70703C8.48164 7.88919 8.73425 7.98998 8.99644 7.9877C9.25864 7.98543 9.50945 7.88026 9.69486 7.69485C9.88027 7.50944 9.98544 7.25863 9.98771 6.99643C9.98999 6.73424 9.8892 6.48163 9.70704 6.29303L6.70704 3.29303C6.51951 3.10556 6.26521 3.00024 6.00004 3.00024C5.73488 3.00024 5.48057 3.10556 5.29304 3.29303L2.29304 6.29303C2.11088 6.48163 2.01009 6.73424 2.01237 6.99643C2.01465 7.25863 2.11981 7.50944 2.30522 7.69485C2.49063 7.88026 2.74144 7.98543 3.00364 7.9877C3.26584 7.98998 3.51844 7.88919 3.70704 7.70703L5.00004 6.41403V12ZM15 8.00003C15 7.73481 14.8947 7.48046 14.7071 7.29292C14.5196 7.10539 14.2653 7.00003 14 7.00003C13.7348 7.00003 13.4805 7.10539 13.2929 7.29292C13.1054 7.48046 13 7.73481 13 8.00003V13.586L11.707 12.293C11.5184 12.1109 11.2658 12.0101 11.0036 12.0124C10.7414 12.0146 10.4906 12.1198 10.3052 12.3052C10.1198 12.4906 10.0146 12.7414 10.0124 13.0036C10.0101 13.2658 10.1109 13.5184 10.293 13.707L13.293 16.707C13.4806 16.8945 13.7349 16.9998 14 16.9998C14.2652 16.9998 14.5195 16.8945 14.707 16.707L17.707 13.707C17.8892 13.5184 17.99 13.2658 17.9877 13.0036C17.9854 12.7414 17.8803 12.4906 17.6949 12.3052C17.5095 12.1198 17.2586 12.0146 16.9964 12.0124C16.7342 12.0101 16.4816 12.1109 16.293 12.293L15 13.586V8.00003Z"
                            fill="#9E9E9E" />
                    </svg>
                    <div class="filter_title">
                        <h6>
                            Sort:
                        </h6>
                        <!-- <h5>
                            Newest
                        </h5> -->
                        <select class="selected" v-model="sortFilter.sort" @click="sortFilterReview(sortFilterValue)">
                            <option value="newest">
                                <h5>
                                    Newest
                                </h5>
                            </option>
                            <option value="oldest">
                                <h5>
                                    Oldest
                                </h5>
                            </option>
                            <option value="" hidden selected>
                                <h5>your time</h5>
                            </option>
                        </select>

                        <!-- <div>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.292433 0.304675C0.479735 0.117581 0.733736 0.0124767 0.998581 0.0124767C1.26342 0.0124767 1.51743 0.117581 1.70473 0.304675L4.99376 3.59106L8.28278 0.304675C8.37492 0.209357 8.48513 0.133328 8.60699 0.0810238C8.72885 0.0287201 8.85991 0.00118918 8.99253 3.76812e-05C9.12515 -0.00111382 9.25667 0.0241369 9.37941 0.0743168C9.50216 0.124497 9.61368 0.198601 9.70746 0.292305C9.80124 0.386009 9.8754 0.497437 9.92562 0.620086C9.97584 0.742736 10.0011 0.874151 9.99996 1.00666C9.99881 1.13918 9.97126 1.27013 9.91891 1.39189C9.86656 1.51365 9.79047 1.62377 9.69508 1.71583L5.6999 5.7078C5.5126 5.8949 5.2586 6 4.99376 6C4.72891 6 4.47491 5.8949 4.28761 5.7078L0.292433 1.71583C0.105189 1.52868 0 1.27489 0 1.01026C0 0.745624 0.105189 0.491826 0.292433 0.304675Z"
                                    fill="#9E9E9E" />
                            </svg>
                        </div> -->
                    </div>


                    <!-- <select name="Sort" >
                        <option value="" selected>Newest</option>
                    </select> -->
                </button>
                <button class="filter">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.74408 2.74408C2.5878 2.90036 2.5 3.11232 2.5 3.33333V5.48833C2.50005 5.70933 2.58788 5.92126 2.74417 6.0775L8.08917 11.4225C8.24546 11.5787 8.33329 11.7907 8.33333 12.0117V15.0858C8.33333 15.9767 9.41048 16.4229 10.0404 15.7929L11.3738 14.4596C11.5613 14.272 11.6667 14.0177 11.6667 13.7525V12.0117C11.6667 11.7907 11.7545 11.5787 11.9108 11.4225L17.2558 6.0775C17.4121 5.92126 17.5 5.70933 17.5 5.48833V3.33333C17.5 3.11232 17.4122 2.90036 17.2559 2.74408C17.0996 2.5878 16.8877 2.5 16.6667 2.5H3.33333C3.11232 2.5 2.90036 2.5878 2.74408 2.74408Z"
                            stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="filter_title">
                        <h6>
                            Filter by:
                        </h6>
                        <!-- <h5>
                            All
                        </h5> -->
                        <select class="selected" v-model="sortFilter.name" @click="sortFilterReview(sortFilterValue)">
                            <option :value="style" v-for="style in allStyle">
                                <h5>
                                    {{ style }}
                                </h5>
                            </option>
                            <option value="" selected>
                                <h5>All</h5>
                            </option>
                        </select>
                        <!-- <div>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M0.292433 0.304675C0.479735 0.117581 0.733736 0.0124767 0.998581 0.0124767C1.26342 0.0124767 1.51743 0.117581 1.70473 0.304675L4.99376 3.59106L8.28278 0.304675C8.37492 0.209357 8.48513 0.133328 8.60699 0.0810238C8.72885 0.0287201 8.85991 0.00118918 8.99253 3.76812e-05C9.12515 -0.00111382 9.25667 0.0241369 9.37941 0.0743168C9.50216 0.124497 9.61368 0.198601 9.70746 0.292305C9.80124 0.386009 9.8754 0.497437 9.92562 0.620086C9.97584 0.742736 10.0011 0.874151 9.99996 1.00666C9.99881 1.13918 9.97126 1.27013 9.91891 1.39189C9.86656 1.51365 9.79047 1.62377 9.69508 1.71583L5.6999 5.7078C5.5126 5.8949 5.2586 6 4.99376 6C4.72891 6 4.47491 5.8949 4.28761 5.7078L0.292433 1.71583C0.105189 1.52868 0 1.27489 0 1.01026C0 0.745624 0.105189 0.491826 0.292433 0.304675Z"
                                    fill="#9E9E9E" />
                            </svg>
                        </div> -->


                    </div>
                    <!-- <select name="Filter">
                        <option value="" selected>All</option>
                    </select> -->
                </button>
            </div>
        </div>
        <div v-if="productReview.length == 0" class="review_list">
            <div class="no_review">
                <img src="../../assets/shop_p/finger.png" alt="finger_img">
            </div>
            <h5>
                No Rating Yet
            </h5>
        </div>
        <!-- Review list -->
        <div v-else class="review_list" v-for="(review, index) in productReview" :key="index">

            <!-- review item -->
            <div class="review_item">
                <!-- info -->
                <div class="review_info">
                    <div class="user_img">
                        <img v-if="review.image" :src="`${origin}/api/image/users/${review.userId}`" draggable="false"
                            alt="user_img">
                        <img v-else src="../../assets/shop_p/avatar_userProfile.png" draggable="false" alt="user_img">
                    </div>
                    <div class="user_info">
                        <h6>
                            {{ review.username }}
                        </h6>
                        <div>
                            <BaseStar :rating="review.rating" :size="100"
                                :name="`user_review_${review.itemReviewId}`" />
                            <!-- {{ review.rating }} -->
                        </div>
                    </div>
                </div>
                <!-- review text -->
                <div class="review_des">
                    <p>
                        <!-- ได้รับสินค้าเรียบร้อย ตรงตามออเดอร์ แพ็คสินค้ามาดี ระยะเวลาในการจัดส่งไม่นาน คุณภาพดี ดูสวยงาม -->
                        {{ review.comment }}
                    </p>
                </div>
                <!-- img list ? -->
                <!-- <div class="style_list">
                    <div >
                        <img src="../../assets/vue.svg" draggable="false" alt="product_img">
                    </div>
                </div> -->
                <!-- info about product  -->
                <div class="style_type">
                    <h6>
                        <span v-if="review.size !== undefined">Size: {{ review.size }}</span>
                        Color: {{ review.style }}
                        <!-- Size: M, Color: Style 1 -->
                    </h6>
                </div>
                <!-- like for user -->
                <div class="wrapper_like">
                    <!-- <img src="../../assets/vue.svg" alt="like_icon"> -->
                    <h6>
                        <svg v-if="review.isLike" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
                            @click="likeReview(review)">
                            <path
                                d="M1.60001 8.39998C1.60001 8.24239 1.63105 8.08635 1.69135 7.94075C1.75166 7.79516 1.84005 7.66288 1.95148 7.55145C2.06291 7.44002 2.1952 7.35163 2.34079 7.29132C2.48638 7.23101 2.64242 7.19998 2.80001 7.19998C2.95759 7.19998 3.11364 7.23101 3.25923 7.29132C3.40482 7.35163 3.5371 7.44002 3.64853 7.55145C3.75996 7.66288 3.84836 7.79516 3.90866 7.94075C3.96897 8.08635 4.00001 8.24239 4.00001 8.39998V13.2C4.00001 13.5182 3.87358 13.8235 3.64853 14.0485C3.42349 14.2735 3.11827 14.4 2.80001 14.4C2.48175 14.4 2.17652 14.2735 1.95148 14.0485C1.72643 13.8235 1.60001 13.5182 1.60001 13.2V8.39998ZM4.80001 8.26638V12.6104C4.79987 12.9077 4.88258 13.1992 5.03887 13.4521C5.19516 13.7051 5.41883 13.9095 5.68481 14.0424L5.72481 14.0624C6.16872 14.2842 6.65814 14.3998 7.15441 14.4H11.4872C11.8572 14.4001 12.2159 14.272 12.5021 14.0375C12.7882 13.8029 12.9843 13.4764 13.0568 13.1136L14.0168 8.31358C14.0632 8.08147 14.0575 7.84197 14.0002 7.61233C13.9428 7.38269 13.8352 7.16863 13.6852 6.98558C13.5351 6.80254 13.3463 6.65507 13.1324 6.5538C12.9184 6.45254 12.6847 6.4 12.448 6.39998H9.60001V3.19998C9.60001 2.77563 9.43144 2.36866 9.13138 2.0686C8.83132 1.76855 8.42435 1.59998 8.00001 1.59998C7.78783 1.59998 7.58435 1.68426 7.43432 1.83429C7.28429 1.98432 7.20001 2.1878 7.20001 2.39998V2.93358C7.20001 3.62596 6.97544 4.29967 6.56001 4.85358L5.44001 6.34638C5.02458 6.90028 4.80001 7.57399 4.80001 8.26638Z"
                                fill="#26AC34" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"
                            @click="likeReview(review)">
                            <path
                                d="M1.60001 8.39998C1.60001 8.24239 1.63105 8.08635 1.69135 7.94075C1.75166 7.79516 1.84005 7.66288 1.95148 7.55145C2.06291 7.44002 2.1952 7.35163 2.34079 7.29132C2.48638 7.23101 2.64242 7.19998 2.80001 7.19998C2.95759 7.19998 3.11364 7.23101 3.25923 7.29132C3.40482 7.35163 3.5371 7.44002 3.64853 7.55145C3.75996 7.66288 3.84836 7.79516 3.90866 7.94075C3.96897 8.08635 4.00001 8.24239 4.00001 8.39998V13.2C4.00001 13.5182 3.87358 13.8235 3.64853 14.0485C3.42349 14.2735 3.11827 14.4 2.80001 14.4C2.48175 14.4 2.17652 14.2735 1.95148 14.0485C1.72643 13.8235 1.60001 13.5182 1.60001 13.2V8.39998ZM4.80001 8.26638V12.6104C4.79987 12.9077 4.88258 13.1992 5.03887 13.4521C5.19516 13.7051 5.41883 13.9095 5.68481 14.0424L5.72481 14.0624C6.16872 14.2842 6.65814 14.3998 7.15441 14.4H11.4872C11.8572 14.4001 12.2159 14.272 12.5021 14.0375C12.7882 13.8029 12.9843 13.4764 13.0568 13.1136L14.0168 8.31358C14.0632 8.08147 14.0575 7.84197 14.0002 7.61233C13.9428 7.38269 13.8352 7.16863 13.6852 6.98558C13.5351 6.80254 13.3463 6.65507 13.1324 6.5538C12.9184 6.45254 12.6847 6.4 12.448 6.39998H9.60001V3.19998C9.60001 2.77563 9.43144 2.36866 9.13138 2.0686C8.83132 1.76855 8.42435 1.59998 8.00001 1.59998C7.78783 1.59998 7.58435 1.68426 7.43432 1.83429C7.28429 1.98432 7.20001 2.1878 7.20001 2.39998V2.93358C7.20001 3.62596 6.97544 4.29967 6.56001 4.85358L5.44001 6.34638C5.02458 6.90028 4.80001 7.57399 4.80001 8.26638Z"
                                fill="#BDBDBD" />
                        </svg>
                        {{ review.like }}
                    </h6>
                </div>
            </div>
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
    /* padding: min(1.389dvw, 20px); */
    gap: min(0.833dvw, 12px);
    /* background-color: #fff;
    border-radius: min(0.556dvw, 8px); */
}

.container_header {
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
    align-items: center;
}

.container_rating {
    display: flex;
    width: fit-content;
    height: inherit;
    justify-content: center;
    gap: min(0.833dvw, 12px);
    align-items: center;
}

.container_rating h5 {
    /* display: flex; */
    font-size: min(1.389dvw, 20px);
    font-weight: 500;
    line-height: 160%;
    color: #212121;
    white-space: nowrap;
}

.rating_score {
    display: flex;
    width: fit-content;
    height: inherit;
    gap: min(0.278dvw, 4px);
    justify-content: center;
    align-items: center;
}

.rating_score h5 {
    font-size: min(0.972dvw, 14px);
    font-weight: 400;
}

.rating_score h5>span {
    font-size: min(1.111dvw, 16px);
    font-weight: 700;
}

.wrapper_rating_list {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: min(0.278dvw, 4px);
}

.wrapper_sort_filter {
    display: flex;
    width: fit-content;
    height: inherit;
    gap: min(0.278dvw, 4px);
}

.filter {
    display: flex;
    width: fit-content;
    height: min(2.778dvw, 40px);
    padding: min(0.556dvw, 8px) min(0.833dvw, 12px);
    justify-content: center;
    align-items: center;
    gap: min(0.278dvw, 4px);
    border: min(0.069dvw, 1px) solid;
    background-color: #fafafa;
    border-color: #E0E0E0;
    border-radius: min(0.556dvw, 8px);
}

.filter svg {
    width: min(1.389dvw, 20px);
    height: min(1.389dvw, 20px);
    margin: auto;
}

.filter_title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: min(0.278dvw, 4px);
}

.filter_title h5 {
    font-size: min(1.111dvw, 16px);
    font-weight: 500;
    color: #212121;
}

.filter_title h6 {
    font-size: min(1.111dvw, 16px);
    font-weight: 500;
    color: #9E9E9E;

}

.filter_title div {
    display: flex;
    width: min(1.389dvw, 20px);
    height: min(1.389dvw, 20px);
    justify-content: center;
    align-items: center;
}

/* .selected option h5 {
    font-weight: 500;
    font-size: min(1.111dvw,16px);
    line-height: 150%;
    letter-spacing: min(0.014dvw,0.2px);
    color: #212121;
    background-color: aqua;
} */

/*style the items (options), including the selected item:*/
.select-items div,
.select-selected {
    color: #ffffff;
    padding: min(0.556dvw, 8px) min(1.111dvw, 16px);
    border: min(0.069dvw, 1px) solid transparent;
    border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
    cursor: pointer;
    user-select: none;
}

/*style items (options):*/
.select-items {
    position: absolute;
    background-color: DodgerBlue;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 99;
}

/*hide the items when the select box is closed:*/
.select-hide {
    display: none;
}


.review_list {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    justify-content: center;
    align-items: center;
}

.review_list h5 {
    margin: min(0.833dvw, 12px);
    font-size: min(1.111dvw, 16px);
    font-weight: 500;
}

.no_review {
    display: flex;
    width: 100%;
    height: min(8.333dvw, 120px);
    overflow: hidden;
    justify-content: center;
    align-items: center;
}

.no_review img {
    width: auto;
    height: 100%;
    object-fit: cover;
}

.review_item {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    padding: min(0.833dvw, 12px) 0px;
    gap: min(0.556dvw, 8px);
    border-top: min(0.069dvw, 1px) solid #E0E0E0;
}

.review_info {
    display: flex;
    width: inherit;
    height: min(3.333dvw, 48px);
    gap: min(0.556dvw, 8px);
    align-items: center
}

.user_img {
    display: flex;
    width: min(3.333dvw, 48px);
    height: min(3.333dvw, 48px);
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fff;
}

.user_img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user_info {
    display: flex;
    width: fit-content;
    height: inherit;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
}

.user_info h6 {
    width: fit-content;
    max-width: 100%;
    height: min(1.111dvw, 16px);
    font-size: min(0.833dvw, 12px);
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}

.user_info div {
    display: flex;
    width: fit-content;
    height: min(1.389dvw, 20px);
    justify-content: center;
    align-items: center;

}

.review_des {
    display: flex;
    width: inherit;
    height: fit-content;
}

.review_des p {
    width: 100%;
    height: fit-content;
    font-size: min(0.972dvw, 14px);
    font-weight: 400;
    color: #212121;
}

/* .style_list{
    display: flex;
    width: fit-content;
    height: min(5.556dvw,80px);
    gap: min(1.075dvw, 8px);
    overflow: hidden;
}
.style_list div{
    display: flex;
    width: min(5.556dvw,80px);
    height: min(5.556dvw,80px);
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: min(0.278dvw, 4px);
    overflow: hidden;
    background-color: #212121;
}
.style_list img{
    width: 100%;
    height: auto;
} */
.style_type {
    display: flex;
    width: fit-content;
    height: min(1.111dvw, 16px);
    align-items: center;
    justify-content: start;
}

.style_type h6 {
    width: 100%;
    height: fit-content;
    font-size: min(0.833dvw, 12px);
    font-weight: 400;
    color: #9E9E9E;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* .wrapper_like {
    display: flex;
    width: fit-content;
    height: fit-content;
    justify-content: start;
    align-items: center;
    gap: min(0.278dvw, 4px);
}

.wrapper_like button {
    display: flex;
    width: min(1.111dvw, 16px);
    height: min(1.111dvw, 16px);
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    cursor: pointer;
}

.wrapper_like h6 {
    font-size: min(0.833dvw, 12px);
    font-weight: 400;
    color: #9E9E9E;
} */

/* mobile */
@media (width<=432px) {
    .wrapper_Review {
        gap: 8px;
    }

    /* .container_header {
    } */
    .container_rating {
        gap: 8px;
    }

    .container_rating h5 {
        font-size: 16px;
        font-weight: 500;
    }

    .rating_score {
        gap: 4px;
    }

    .rating_score h5 {
        font-size: 10px;
    }

    .rating_score h5>span {
        font-size: 10px;
    }

    .wrapper_rating_list {
        gap: 4px;
    }

    .wrapper_sort_filter {
        gap: 4px;
    }

    .filter {
        display: none;
    }

    /* review */
    /* .review_list{} */
    .review_list h5 {
        margin: 12px;
        font-size: 16px;
        font-weight: 500;
    }

    .no_review {
        height: 80px;
    }

    .review_item {
        padding: 8px 0px;
        gap: 8px;
        border-top: 1px solid #E0E0E0;
    }

    .review_info {
        height: 28px;
        gap: 8px;

    }

    .user_img {
        width: 28px;
        height: 28px;

    }

    .user_info {
        gap: 4px;
    }

    .user_info h6 {
        height: 12px;
        font-size: 10px;
    }

    .user_info div {
        height: 12px;
    }

    /* .review_des {
    } */
    .review_des p {
        font-size: 10px;
        font-weight: 400;
    }

    .style_type {
        height: 12px;
    }

    .style_type h6 {
        font-size: 10px;
        font-weight: 400;
    }

}


/* @media (width <=744px) {
    .wrapper_Review {
        gap: min(1.613dvw, 12px);
    }

    .container_rating {
        gap: min(1.613dvw, 12px);
    }

    .container_rating h5 {
        font-size: min(2.419dvw, 18px);
    }

    .rating_score {
        gap: min(0.583dvw, 4px);
    }

    .rating_score h5 {
        font-size: min(1.613dvw, 12px);
        font-weight: 400;
    }

    .rating_score h5>span {
        font-size: min(1.882dvw, 14px);
        font-weight: 700;
    }

    .wrapper_rating_list {
        gap: min(0.583dvw, 4px);
    }

    .wrapper_sort_filter {
        gap: min(0.583dvw, 4px);
    }

    .filter {
        height: min(3.763dvw, 28px);
        padding: min(0.583dvw, 4px) min(1.075dvw, 8px);
        gap: min(0.583dvw, 4px);
        border: min(0.134dvw, 1px) solid;
        border-radius: min(0.583dvw, 4px);
    }

    .filter svg {
        width: min(2.151dvw, 16px);
        height: min(2.151dvw, 16px);
    }

    .filter_title {
        gap: min(0.583dvw, 4px);
    }

    .filter_title h5 {
        font-size: min(1.882dvw, 14px);
        font-weight: 500;
        color: #212121;
    }

    .filter_title h6 {
        font-size: min(1.882dvw, 14px);
        font-weight: 500;
        color: #9E9E9E;
    }

    .filter_title div {
        width: min(2.151dvw, 16px);
        height: min(2.151dvw, 16px);
    }

    .filter_title div svg {
        width: min(1.075dvw, 8px);
        height: min(0.583dvw, 4px);
    }

    .review_list h5 {
        margin: min(1.613dvw, 12px);
        font-size: min(1.882dvw, 14px);
    }

    .no_review {
        height: min(13.441dvw, 100px);
    }

    .review_item {
        padding: min(1.613dvw, 12px) 0px;
        gap: min(1.075dvw, 8px);
        border-top: min(0.134dvw, 1px) solid;
    }

    .review_info {
        height: min(4.839dvw, 36px);
        gap: min(1.075dvw, 8px);
    }

    .user_img {
        display: flex;
        width: min(4.839dvw, 36px);
        height: min(4.839dvw, 36px);
    }


    .user_info h6 {
        height: min(1.613dvw, 12px);
        font-size: min(1.344dvw, 10px);
    }

    .user_info div {
        height: min(2.688dvw, 20px);
    }

    .review_des p {
        font-size: min(1.613dvw, 12px);
    }

    .style_type {
        height: min(1.613dvw, 12px);
    }

    .style_type h6 {
        font-size: min(1.344dvw, 10px);
    }

    .wrapper_like {
        gap: min(0.538dvw, 4px);
    }

    .wrapper_like button {
        width: min(2.151dvw, 16px);
        height: min(2.151dvw, 16px);
    }

    .wrapper_like h6 {
        font-size: min(1.344dvw, 10px);

    }
} */

/* @media (width<=376px) { */
/* .wrapper_Review {
        gap: min(1.613dvw, 12px);
    }
    .container_rating{
        gap: min(1.613dvw, 12px);
    }
    .container_rating h5{
        font-size: min(12.419dvw, 18px);
        font-weight: 500;
    }
    .rating_score{
        gap: min(0.583dvw, 4px);
    }
    .rating_score h5{
        font-size: min(1.613dvw, 12px);
        font-weight: 400;
    }
    .rating_score h5 >span{
        font-size: min(1.882dvw, 14px);
        font-weight: 700;
    }
    .wrapper_rating_list {
        gap: min(0.583dvw, 4px);
    }
    .wrapper_sort_filter{
        gap: min(0.583dvw, 4px);
    }
    .filter{
        height: min(3.763dvw, 28px);
        padding: min(0.583dvw, 4px) min(1.075dvw, 8px);
        gap: min(0.583dvw, 4px);
        border: min(0.134dvw,1px) solid;
        border-radius: min(0.583dvw, 4px);
    }
    .filter svg{
        width: min(2.151dvw, 16px);
        height: min(2.151dvw, 16px);
    }
    .filter_title{
        gap: min(0.583dvw, 4px);
    }
    .filter_title h5{
        font-size: min(1.882dvw, 14px);
        font-weight: 500;
        color: #212121;
    }
    .filter_title h6{
        font-size: min(1.882dvw, 14px);
        font-weight: 500;
        color: #9E9E9E;
    }
    .filter_title div{
        width: min(2.151dvw, 16px);
        height: min(2.151dvw, 16px);
    }
    .filter_title div svg{
        width:  min(1.075dvw, 8px);
        height: min(0.583dvw, 4px);
    }
    
    .review_list h5{
        margin: min(1.613dvw, 12px);
        font-size: min(1.882dvw, 14px);
    }
    .no_review{
        height: min(13.441dvw,100px);
    }

    .review_item{
        padding: min(1.613dvw, 12px) 0px;
        gap: min(1.075dvw, 8px);
        border-top: min(0.134dvw,1px) solid;
    }
    .review_info{
        height: min(4.839dvw,36px);
        gap: min(1.075dvw, 8px);
    }
    .user_img{
        display: flex;
        width: min(4.839dvw,36px);
        height: min(4.839dvw,36px);
    }


    .user_info h6{
        height: min(1.613dvw, 12px);
        font-size: min(1.344dvw, 10px);
    }
    .user_info div{
        height: min(2.688dvw, 20px);
    }

    .review_des p{
        font-size: min(1.613dvw,12px);
    }

    .style_type{
        height: min(1.613dvw,12px);
    }
    .style_type h6{
        font-size: min(1.344dvw, 10px);
    }
    .wrapper_like{
        gap: min(0.538dvw, 4px);
    }
    .wrapper_like button{
        width: min(2.151dvw, 16px);
        height: min(2.151dvw, 16px);
    }
    .wrapper_like h6{
        font-size: min(1.344dvw, 10px);

    }  */
/* } */
</style>
