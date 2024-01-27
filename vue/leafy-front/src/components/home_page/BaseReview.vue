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
    console.log(data.list)
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
    display: flex;
    width: auto;
    height: min(24.167dvw,348px);
    padding: min(4.167dvw,60px) min(11.111dvw,160px);
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}
.container_review{
    display: flex;
    width: auto;
    height: 100%;
    gap: min(0.556dvw,8px);
    justify-content: center;
    align-items: center;
}
.overall_review{
    display: flex;
    width: min(13.889dvw,200px);
    height:min(15.833dvw,228px);
    padding: min(1.389dvw,20px);
    flex-direction: column;
    justify-content: center;
    border-radius: min(0.556dvw,8px);
    text-align: center;
    box-sizing: border-box;
    background-color: #EEEEEE;
    gap: min(0.556dvw,8px);
}
.overall_review h3{
    font-size: min(1.25dvw,18px);
    text-transform: uppercase;
}
.overall_review h4{
    /* margin-top: 8px; */
    font-size: min(0.972dvw,14px);
}
/* .star_review{
    margin-top: 8px;
} */
.star_review img{
    width: min(1.389dvw,20px);
    height: min(1.389dvw,20px);
}

.wrapper_review{

    width:min(58.333dvw,840px); 
    height:min(15.833dvw,228px);
    overflow-x: auto;
    
}
.wrapper_review::-webkit-scrollbar{
    display: none;
}
.review_list{
    display: flex;
    height: fit-content;
    width: fit-content;
    justify-content: center;
    gap: min(0.556dvw,8px);
}

.review{
    display: flex;
    width: min(14.167dvw,204px);
    height: min(15.833dvw,228px);
    flex-direction: column;
    /* margin: 0px 20px; */
    padding: min(1.389dvw,20px);
    box-sizing: border-box;
    background-color: #EEEEEE;
    border-radius: min(0.556dvw,8px);
}

.personal_info{
    display: flex;
    width: 100%;
    height: min(1.389dvw,20px);
    
    
}
.personal_info h4{

    height: min(1.389dvw,20px);
    width: min(5.694dvw,82px);
    margin-right: min(0.556dvw,8px);
    font-size: min(1.111dvw,16px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.personal_info div{
    display: flex;
    width: min(4.167dvw,60px);
    height: min(0.833dvw,12px);
    align-items: center;
}
.personal_info div img{
    width: min(0.833dvw,12px);
    height: min(0.833dvw,12px);
}
.comment{
    width: auto;
    height: min(8.333dvw,120px);
    margin-top: min(0.556dvw,8px);
    /* overflow: hidden; */
}
.comment p{
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
   width: inherit;
   height: fit-content;
   font-size: min(0.972dvw,14px);
   overflow: hidden;

}

.date{
    height: min(0.833dvw,12px);
    width: auto;
    margin-top: min(1.944dvw,28px);
    font-size: min(0.694dvw,10px);
    text-align: right;
    font-style: normal;
    font-weight: 100;
    line-height: 120%; /* 12px */
    letter-spacing: 0.2px;
}

.review_slide{
    display: flex;
   
    justify-content: center;
    align-items: center;
    
}
.review_slide img{
    width: min(1.944dvw,28px);
    height: min(1.944dvw,28px);

}
.review_slide img:hover{
    cursor: pointer;
}
@media (width<=744px){
    .wrapper{
        height: min(34.409dvw,256px);
        padding: min(5.376dvw,40px) min(5.914dvw,44px);
    }
    .container_review{
        gap: min(0.538dvw,4px);
    }
    .overall_review{
        width: min(18.817dvw,140px);
        height: min(23.656dvw,176px);
        padding: min(2.151dvw,16px);
    }
    .overall_review h3{
        font-size: min(2.151dvw,16px);
    }
    .overall_review h4{
        font-size: min(1.613dvw,12px);
    }
    .star_review img{
        width: min(1.613dvw,12px);
        height: min(1.613dvw,12px);
    }
    .wrapper_review{
        width: min(62.903dvw,468px);
        height: min(23.656dvw,176px);
    }
    .review_list{
        gap: min(0.538dvw,4px);
    }
    .review{
        width: min(20.43dvw,152px);
        height: min(23.656dvw,176px);
        padding: min(2.151dvw,16px);
    }
    .personal_info h4{
        height: min(2.151dvw,16px);
        width: min(7.796dvw,58px);
        font-size: min(1.613dvw,12px);
        margin-right: 0px;
    }
    .personal_info div{
        width: auto;
        height: min(2.151dvw,16px);
    }
    .personal_info div img{
        width: min(1.075dvw,8px);
        height: min(1.075dvw,8px);
    }
    .comment{
        height: min(11.828dvw,88px);
        margin-top: min(1.075dvw,8px);
    }
    .comment p{
        -webkit-line-clamp: 5;
        font-size: min(1.613dvw,12px);
        
    }
    .date{
        font-size: min(1.344dvw,10px);
        margin-top: min(2.688dvw,20px);
    }
    .review_slide img{
        width: min(2.688dvw,20px);
        height: min(2.688dvw,20px);
    }

}

@media (width <=376px){
    .wrapper{
        height: min(40.426dvw,152px);
        padding: min(7.447dvw,28px) min(4.255dvw,16px);
    }
    .container_review{
        gap: 0px;
    }
    .overall_review{
        display: none;
    }
    .wrapper_review{
        width: min(91.489dvw,344px);
        height: min(25.532dvw,96px);
    }
    .review_list{
        gap: min(1.064dvw,4px);
    }
    .review{
        width: min(24.468dvw,92px);
        height: min(25.532dvw,96px);
        padding: min(2.128dvw,8px);
    }
    .personal_info{
        height: 24px;
        display: flex;
        flex-direction: column;
        gap: min(1.064dvw,4px);
    }
    .personal_info h4{
        width: auto;
        height: fit-content;
        font-size: min(2.66dvw,10px);
    }
    .personal_info div{
        width: auto;
        height: fit-content;
    }
    .personal_info div img{
        width: min(2.128dvw,8px);
        height: min(2.128dvw,8px);
    }
    .comment{
        height: min(7.447dvw,28px);
    }
    .comment p{
        -webkit-line-clamp: 2;
        font-size: min(2.66dvw,10px);
    }
    .date{
        font-size: min(2.128dvw,8px);
        margin-top: min(3.191dvw,12px);
    }
    .review_slide{
        display: none;
    }
   
}
</style>