<script setup>
import {ref,onMounted,onUpdated,computed} from 'vue'
import validation from '../JS/validation'
const emit = defineEmits(["changePage","moveLeft","moveRight"])
const props=defineProps({
    totalPage:{
        type:Number,
        required:true,
        default:1
    },
    currentPage:{
        type:Number,
        required:true,
        default:1
    }
})
const currentPage=ref(1)
const totalPage=ref(1)

const eachSide=3

const pageHidden=(currentP,total)=>{
    
    for(let i=1;i<=eachSide;i++){
        // previous number
        // for taggle to show hidden number before
        if(currentP-(eachSide+(i-1)*(-1))<=0){
            document.getElementById(`preNumber_${i}`).setAttribute('style','display:none;')
        }else{
            document.getElementById(`preNumber_${i}`).setAttribute('style','display:flex;')
        }

        // next number
        if((currentP+i)>total){
            // console.log('cu 1')

            document.getElementById(`nextNumber_${i}`).setAttribute('style','display:none;')
        }else{
            // console.log('cu 2')
            document.getElementById(`nextNumber_${i}`).setAttribute('style','display:flex;')
        }
    }
    
}

const changePage=(number)=>{
    console.log("Testing number "+number)
    // console.log(typeof(number))
    // let {currentPage} = number
    // console.error(currentPage.value)
    let status = validation.number(number,true)
    currentPage.value = status==true?number:Math.abs(parseInt(number))
    return emit("changePage",currentPage.value)

}

const moveLeft = (current) => {
    console.log("Testing left"+current)
    currentPage.value = current > 1 ? current - 1 : 1
    return emit("moveLeft",currentPage.value)
    // await getProduct(currentPage.value)
    // validation.navigationTo(top)
}

const moveRight = (current) => {
    console.log("Testing  right"+current)
    currentPage.value = current < props.totalPage ? current + 1 : props.totalPage
    return emit("moveRight",currentPage.value)
    // await getProduct(currentPage.value)
    // validation.navigationTo(top)
}




onMounted(()=>{
    currentPage.value=props.currentPage
    pageHidden(props.currentPage,props.totalPage)

})
onUpdated(()=>{
    currentPage.value=props.currentPage
    pageHidden(props.currentPage,props.totalPage)

})
</script>
<template>
    <div v-show="props.totalPage!=0" class="link_page_container">
        <ul>
            <li @click="moveLeft(props.currentPage) " class="move_page">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.207 5.29303C13.3945 5.48056 13.4998 5.73487 13.4998 6.00003C13.4998 6.26519 13.3945 6.5195 13.207 6.70703L9.91403 10L13.207 13.293C13.3892 13.4816 13.49 13.7342 13.4877 13.9964C13.4854 14.2586 13.3803 14.5094 13.1948 14.6948C13.0094 14.8803 12.7586 14.9854 12.4964 14.9877C12.2342 14.99 11.9816 14.8892 11.793 14.707L7.79303 10.707C7.60556 10.5195 7.50024 10.2652 7.50024 10C7.50024 9.73487 7.60556 9.48056 7.79303 9.29303L11.793 5.29303C11.9806 5.10556 12.2349 5.00024 12.5 5.00024C12.7652 5.00024 13.0195 5.10556 13.207 5.29303Z" fill="#424242"/>
                </svg>
            </li>
            <!-- prevoius -->
            <li   v-for="(link,index) of eachSide"  :key="index" :id="`preNumber_${link}`">
                <button  @click="changePage(props.currentPage-(eachSide+(link-1)*(-1)))">
                        {{ props.currentPage-(eachSide+(link-1)*(-1)) }}
                </button>
            </li>
            <!-- current -->
            <li  class="current_page">
                <button >
                    {{ props.currentPage }} 
                </button>
            </li>
            <!-- next -->
            <li   v-for="(link,index) of eachSide" :key="index" :id="`nextNumber_${link}`">
                <button @click="changePage(props.currentPage+link)">
                    {{ props.currentPage+link }} 
                </button>
            </li>
            <!-- next -->
            <li @click="moveRight(props.currentPage)" class="move_page">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.79303 14.707C7.60556 14.5195 7.50024 14.2652 7.50024 14C7.50024 13.7349 7.60556 13.4806 7.79303 13.293L11.086 10L7.79303 6.70704C7.61087 6.51844 7.51008 6.26584 7.51236 6.00364C7.51463 5.74144 7.6198 5.49063 7.80521 5.30522C7.99062 5.11981 8.24143 5.01465 8.50363 5.01237C8.76583 5.01009 9.01843 5.11088 9.20703 5.29304L13.207 9.29304C13.3945 9.48057 13.4998 9.73488 13.4998 10C13.4998 10.2652 13.3945 10.5195 13.207 10.707L9.20703 14.707C9.0195 14.8945 8.76519 14.9998 8.50003 14.9998C8.23487 14.9998 7.98056 14.8945 7.79303 14.707Z" fill="#424242"/>
                </svg>
            </li>
        </ul>
    </div>
</template>
<style scoped>


.link_page_container{
    display: flex;
    width: 100%;
    height: min(2.5dvw,36px);
    justify-content: center;
    align-items: center;
}
.link_page_container ul{
    display: flex;
    /* width: 317px; */
    width: fit-content;
    height: fit-content;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: min(1.389dvw,20px);
    flex-direction: row;
}
.link_page_container ul li{
    display: flex;
    width: min(2.778dvw,40px);
    height: min(2.5dvw,36px);
    list-style: none;
    justify-content: center;
    align-items: center;
}
.link_page_container ul li button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: min(0.278dvw,4px);
    padding: min(0.556dvw,8px) min(1.111dvw,16px);
    cursor: pointer;
    box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);
    font-size: min(0.972dvw,14px);
    letter-spacing: min(0.014dvw,0.2px); 
}
.link_page_container ul li button:hover {
    background-color: #fff;
    color: #26AC34;
}
.current_page button{
    background-color: #26AC34;
    color: #fff;
    font-size: min(0.972dvw,14px);
    letter-spacing: min(0.014dvw,0.2px); 
    padding: min(0.556dvw,8px) min(0.833dvw,12px);
}
.move_page{
    width: min(3.056dvw, 44px);
    height: min(2.5dvw,36px);
    /* padding: min(0.556dvw,8px) min(0.833dvw,12px); */
    cursor: pointer;
    background-color: #fff;
    border-radius: min(0.278dvw,4px);
}
.move_page:hover {
    background-color: #26AC34;
}
.move_page svg{
    padding: 0px;
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
}
.move_page svg path {
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
}
.move_page:hover svg path {
    fill:#fff;
}



@media(width<=744px){
    .link_page_container{
        height: min(3.226dvw,24px);
    }
    .link_page_container ul{
        gap: min(2.151dvw,16px);
    }
    .link_page_container ul li{
        width: min(4.301dvw,32px);
        height: min(3.226dvw,24px);
    }
    .link_page_container ul li button{
        border-radius: min(0.538dvw,4px);
        padding: min(0.538dvw,4px) min(1.613dvw,12px);
        box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);
        font-size: min(1.613dvw,12px);
        letter-spacing: min(0.027dvw,0.2px); 
    }
    .link_page_container ul li button:hover {
        background-color: #fff;
        color: #26AC34;
    }
    .current_page button{
        background-color: #26AC34;
        color: #fff;
        font-size: min(1.613dvw,12px);
        letter-spacing: min(0.027dvw,0.2px); 
    }
    .move_page{
        width: min(4.301dvw,32px);
        height: min(3.226dvw,24px);
        /* padding: min(0.538dvw,4px) min(1.075dvw,12px); */
        background-color: #fff;
        border-radius: min(0.538dvw,4px);
    }
    .move_page:hover {
        background-color: #26AC34;
    }
    .move_page svg{
        width: min(2.151dvw,16px);
        height: min(2.151dvw,16px);
    }
    .move_page svg path {
        width: min(2.151dvw,16px);
        height: min(2.151dvw,16px);
    }
    .move_page:hover svg path {
        fill:#fff;
    }
}

@media (width<=432px){
    .link_page_container{
        height: min(5.556dvw,24px);
    }
    .link_page_container ul{
        gap: min(2.778dvw,12px);
    }
    .link_page_container ul li{
        width: min(5.556dvw,24px);
        height: min(5.556dvw,24px);
    }
    .link_page_container ul li button{
        border-radius: min(0.926dvw,4px);
        padding: min(0.926dvw,4px) min(0.926dvw,4px);
        box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);
        font-size: min(2.778dvw,12px);
        letter-spacing: min(0.012dvw,0.053px); 
    }
    .link_page_container ul li button:hover {
        background-color: #fff;
        color: #26AC34;
    }
    .current_page button{
        background-color: #26AC34;
        color: #fff;
        font-size: min(2.778dvw,12px);
        letter-spacing: min(0.012dvw,0.053px); 
    }
    .move_page{
        width: min(5.556dvw,24px);
        height: min(5.556dvw,24px);
        background-color: #fff;
        border-radius: min(0.926dvw,4px);
    }
    .move_page:hover {
        background-color: #26AC34;
    }
    .move_page svg{
        width: min(3.704dvw,16px);
        height: min(3.704dvw,16px);
    }
    .move_page svg path {
        width: min(3.704dvw,16px);
        height: min(3.704dvw,16px);
    }
    .move_page:hover svg path {
        fill:#fff;
    }
}

/* @media (width<=376px){
    .link_page_container{
        height: min(6.383dvw,24px);
    }
    .link_page_container ul{
        gap: min(3.191dvw,12px);
    }
    .link_page_container ul li{
        width: min(6.383dvw,24px);
        height: min(6.383dvw,24px);
    }
    .link_page_container ul li button{
        border-radius: min(1.064dvw,4px);
        padding: min(1.064dvw,4px) min(1.064dvw,4px);
        box-shadow: 0px 4px 40px 0px rgba(4, 6, 15, 0.08);
        font-size: min(3.191dvw,12px);
        letter-spacing: min(0.027dvw,0.053px); 
    }
    .link_page_container ul li button:hover {
        background-color: #fff;
        color: #26AC34;
    }
    .current_page button{
        background-color: #26AC34;
        color: #fff;
        font-size: min(3.191dvw,12px);
        letter-spacing: min(0.027dvw,0.053px); 
    }
    .move_page{
        width: min(6.383dvw,24px);
        height: min(6.383dvw,24px);
        background-color: #fff;
        border-radius: min(1.064dvw,4px);
    }
    .move_page:hover {
        background-color: #26AC34;
    }
    .move_page svg{
        width: min(4.255dvw,16px);
        height: min(4.255dvw,16px);
    }
    .move_page svg path {
        width: min(4.255dvw,16px);
        height: min(4.255dvw,16px);
    }
    .move_page:hover svg path {
        fill:#fff;
    }
} */
</style>