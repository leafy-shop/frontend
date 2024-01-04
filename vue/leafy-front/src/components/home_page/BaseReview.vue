<script setup>
import{ref,computed, onBeforeMount} from 'vue'
import js from '../../JS/validation'
import fetch from '../../JS/api';
import { DateTime } from 'luxon';

const starAverage=ref(0)
const rating=ref(0)
const reviewAmount=ref(0)
//1001
const amountMove=848

const reviewArr=ref([])

const getAllReviews = async () => {
    let {status, data} = await fetch.getAllReview()
    // console.log(data.list)
    reviewArr.value = data.list
    starAverage.value = data.avg_rating
    rating.value = Math.floor(starAverage.value)
    reviewAmount.value = data.allItems
}

const calculateReview = computed(()=>{
    // console.log(reviewAmount.value)
    const value=reviewAmount.value.toString()
    let returnData=undefined
    if(value.length>4){
        returnData=value.substring(0,value.length-3)+'K'
        
    } else return value
    
    return returnData
    // reviewAmount.value>1000?reviewAmount.substring()
})

// const calculateDayLeft = () => {
//     const inputDate = '12/22/2023, 15:36:47';
//     const timeZone = 'Asia/Bangkok'; // Replace this with the IANA timezone you desire

//     const dateTime = DateTime.fromFormat(inputDate, 'MM/dd/yyyy, HH:mm:ss', { zone: timeZone });
//     const unixTimestamp = dateTime.toMillis();

//     console.log(unixTimestamp);
// }

onBeforeMount(()=>{
    getAllReviews()
})

// const reviewArr=ref([
//     {name:"Zeed Paap",rating:3,comment:"Good website",time:''},
//     {name:"Ramato A",rating:5,comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt maiores perferendis, debitis sequi recusandae nisi enim expedita rerum voluptatem quis dignissimos, harum maxime? Sint cupiditate dolore eos est quas quae.",time:''},
//     {name:"Ramato B",rating:5,comment:"I like this!!",time:''},
//     {name:"Ramato C",rating:5,comment:"I like this!!",time:''},
//     {name:"Ramatosdf asfd",rating:5,comment:"I like this!!",time:''},
//     {name:"Ramato D",rating:5,comment:"I like this!!",time:''},
//     {name:"Ramato E",rating:5,comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt maiores perferendis, debitis sequi recusandae nisi enim expedita rerum voluptatem quis dignissimos, harum maxime? Sint cupiditate dolore eos est quas quae.",time:''},
//     {name:"Ramatosdf asfd",rating:5,comment:"I like this!!",time:''},
//     {name:"Ramato F",rating:5,comment:"I like this!!",time:''},
//     {name:"Ramato G",rating:5,comment:"I like this!!",time:''},
//     {name:"Ramatosdf G",rating:5,comment:"I like this!!",time:''},
//     {name:"Ramato H",rating:5,comment:"I like this!!",time:''}
// ])

</script>
<template>
    <div class="wrapper">
        <div class="container_review">
            <div class="overall_review">
                <h3>
                    EXCELLENT
                </h3>
                <div class="star_review">
                    <img v-for="(star,index) of rating>5?5:rating" :key="index" src="../../assets/icon/star.svg" alt="star_icon">
                </div>
                <h4>
                    {{ starAverage }} average
                </h4>
                <h4>
                    {{ calculateReview }} reviews
                </h4>
            </div>

            <div @click="js.scroll('previous','.wrapper_review',amountMove)" class="review_slide">
                <img src="../../assets/home_p/icon/left.png" alt="previous">
            </div>
            <div class="wrapper_review">
                <div class="review_list">
                    <div v-for="(data,indexArr) of reviewArr" :key="indexArr" class="review">
                        <div class="personal_info">
                            <h4>
                            {{ data.name }}                            
                            </h4>
                            <div>
                                <img v-for="(star,index) of data.rating>5?5:data.rating" :key="index" src="../../assets/icon/star.svg" alt="star_icon">
                            </div>
                        </div>

                        <div class="comment">
                            <p>
                                {{ data.comment }}
                            </p>
                        </div>
                        <div class="date">
                            {{ Math.floor(data.time) }} {{ data.time > 2 ? "days": "day"}} ago
                        </div>
                    </div>
                </div>
            </div>
            <div @click="js.scroll('next','.wrapper_review',amountMove)" class="review_slide">
                <img src="../../assets/home_p/icon/right.png" alt="next">
            </div>
            
        </div>

        
    </div>
</template>
<style scoped>
.wrapper{
    
    width: auto;
    height: 348px;
    padding: 60px 160px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}
.container_review{
    display: flex;
    width: 100%;
    height: 100%;
    gap: 8px;
}
.overall_review{
    display: flex;
    width: 200px;
    height:228px;
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    text-align: center;
    box-sizing: border-box;
    background-color: #EEEEEE;
}
.overall_review h3{
    
    font-size: 18px;
    text-transform: uppercase;
}
.overall_review h4{
    margin-top: 8px;
    font-size: 14px;
}
.star_review{
    margin-top: 8px;
}
.star_review img{
    width: 20px;
    height: 20px;
}

.wrapper_review{

    width:840px; 
    height:244px;
    overflow: auto;
    
}
.wrapper_review::-webkit-scrollbar{
    display: none;
}
.review_list{
    display: flex;
    height: fit-content;
    width: fit-content;
    justify-content: center;
    gap: 8px;
}

.review{
    display: flex;
    width: 204px;
    height: 228px;
    flex-direction: column;
    /* margin: 0px 20px; */
    padding: 20px;
    box-sizing: border-box;
    background-color: #EEEEEE;
    border-radius: 8px;
}

.personal_info{
    display: flex;
    width: 100%;
    height: 20px;
    
    
}
.personal_info h4{
    /* display: flex; */
    /* flex-grow: 4; */
    height: 20px;
    width: 82px;
    margin-right: 8px;


    overflow: hidden;
    text-overflow: ellipsis;
    /* text-overflow: clip; */
    white-space: nowrap;
}
.personal_info div{
    /* flex-grow: 1; */
    width: 60px;
    height: 12px;
    /* margin:0px 10px; */
}
.personal_info div img{
    width: 12px;
    height: 12px;
}
.comment{

    display: block;
    width: auto;
    height: 120px;
    margin-top: 8px;
}
.comment p{
   width: inherit;
   height: inherit;
   font-size: 14px;
   overflow: hidden;
   text-overflow: ellipsis; 
   white-space: pre-wrap;
   /* overflow-wrap: break-word; */
    word-break: break-word;
}

.date{
    height: 12px;
    width: 100%;
    margin-top: 28px;
    font-size: 10px;
    text-align: right;
}

.review_slide{
    display: flex;
   
    justify-content: center;
    align-items: center;
    
}
.review_slide img{
    width: 28px;
    height: 28px;

}
.review_slide img:hover{
    cursor: pointer;
}
</style>