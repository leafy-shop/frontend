<script setup>
import { useRouter } from 'vue-router';
import validation from '../../JS/validation'
const myRouter=useRouter()
let props = defineProps({
    owner: {
        type: Object,
        default: {},
        required: true
    }
})
const goProfile =(email)=>myRouter.push({name:"Profile",params:{id:validation.encrypt(email)}})
</script>
<template>
    <div class="wrapper_store">
        <!-- for show img -->
        <div class="store_img">
            <img src="../../assets/shop_p/avatar_userProfile.png" alt="supplier_img">
        </div>
        <!-- click to chat or view shop profile -->
        <div class="store">
            <h5>
                {{owner.username}}
            </h5>
            <div class="wrapper_chat_shop">
                <button @click="chatNow">
                    Chat Now 
                </button>
                <button @click="goProfile(owner.username)">
                    View Shop
                </button>
            </div>
        </div>
        <!-- for show more information about this supplier -->
        <div class="about_me">
            <!-- rating and Product -->
            <div class="detail_list">
                <!-- rating -->
                <div class="detail_item">
                    <p>
                        Rating
                    </p>
                    <p>
                        {{owner.rating}}
                    </p>
                </div>
                <!-- products -->
                <div class="detail_item">
                    <p>
                        Products
                    </p>
                    <p>
                        {{ owner.products }}
                    </p>
                </div>
            </div>
            <!-- Response Rate and Response Time -->
            <div class="detail_list">
                <!-- rate -->
                <div class="detail_item">
                    <p>
                        Response Rate
                    </p>
                    <p>
                        100%
                    </p>
                </div>
                <!-- time -->
                <div class="detail_item">
                    <p>
                        Response Time
                    </p>
                    <p>
                        within hours
                    </p>
                </div>
            </div>
            <!-- follow and joined -->
            <div class="detail_list">
                <!-- follow -->
                <div class="detail_item">
                    <p>
                        Follower
                    </p>
                    <p>
                        1
                    </p>
                </div>
                <!-- joined -->
                <div class="detail_item">
                    <p>
                        Joined
                    </p>
                    <p>
                        {{owner.time}}
                    </p>
                </div>
            </div> 
        </div>
    </div>
</template>
<style scoped>
*{
    box-sizing: border-box;
}
.wrapper_store{
    display: flex;
    width: auto;
    height: min(8.333dvw, 120px);
    padding: min(1.389dvw, 20px);
    gap: min(1.389dvw, 20px);
    background-color: #fff;
    border-radius: min(0.556dvw, 8px);
    align-items: center;
}
.store_img {
    width: min(5dvw,72px);
    height: min(5dvw,72px);
    background-color: #FAFAFA;
    border-radius: 50%;
}
.store_img img {
    width: min(5dvw,72px);
    height: min(5dvw,72px);
}
.store {
    display: flex;
    flex-direction: column;
    width: min(19.444dvw, 280px);
    height: min(5.556dvw, 80px);
    gap: min(0.556dvw, 8px);
    padding-right: min(1.389dvw, 20px);
    border-right: min(0.069dvw, 1px) solid;
    border-color: #E0E0E0;
}
.store h5 {
    font-size: min(1.389dvw, 20px);
    color: #212121;
    line-height: 160%;
    font-weight: 500;
}
.wrapper_chat_shop {
    display: flex;
    width: min(18.056dvw, 260px);
    height: fit-content;
    /* flex-direction: column; */
    gap: min(0.833dvw, 12px);
}

.wrapper_chat_shop button:nth-child(1) {
    background: #fff;
    color: #26AC34;
    border: min(0.069dvw, 1px) solid;
    border-color: #26AC34;
    border-radius: min(0.278dvw, 4px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}
.wrapper_chat_shop button:nth-child(1):hover {
    background: #26AC34;
    color: #fff;
}
.wrapper_chat_shop button:nth-child(1):active {
    border-color: #58d264;
    background: #58d264;
    color: #fff;
}
.wrapper_chat_shop button {
    /* width: min(15dvw, 216px); */
    width: 100%;
    height: min(2.778dvw, 40px);
    margin: auto;
    background-color: #fff;
    color: #212121;
    border: min(0.069dvw, 1px) solid;
    border-color: #E0E0E0;
    border-radius: min(0.278dvw, 4px);
    cursor: pointer;
    font-size: min(1.111dvw, 16px);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.wrapper_chat_shop button:hover {
    color: #26AC34;
    background: #fff;
    border-color: #26AC34;
}
.wrapper_chat_shop button:active {
    border-color: #58d264;
    background: #58d264;
    color: #fff;
}
.about_me{
    display: flex;
    flex-direction: row;
    /* width: min(19.444dvw, 280px); */
    width: 100%;
    /* width: min(47.778dvw, 688px); */
    height: min(5.556dvw, 80px);
    color: #9E9E9E;
    font-size: min(0.972dvw, 14px);
    align-items: center;
    gap: min(4.167dvw, 60px);
}
.detail_list {
    display: flex;
    flex-direction: column;
    gap: min(0.833dvw, 12px);
    width: 100%;
}
.detail_item {
    display: flex;
    justify-content: space-between;
}
.detail_item p:nth-child(2) {
    font-weight: 500;
    color: #26AC34;
}
</style>